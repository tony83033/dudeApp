











import { appwriteConfig } from "./appwrite";
import { ID, Query } from "react-native-appwrite";
import { databases } from "./appwrite";

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  imageUrl: string;
  name: string;
}

export const addToCart = async (
  userId: string, 
  productId: string, 
  quantity: number, 
  price: number,
  imageUrl: string,
  name: string
) => {
  try {
    if (!userId) throw new Error('User ID is required');

    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.cartsCollectionId,
      [Query.equal('userId', userId)]
    );

    const newItem = JSON.stringify({ productId, quantity, price, imageUrl, name });

    if (response.documents.length > 0) {
      const cart = response.documents[0];
      let items = cart.items || [];

      if (items.length >= 100) {
        throw new Error('Cart is full. Please remove some items before adding more.');
      }

      const existingItemIndex = items.findIndex((item: string) => {
        const parsedItem: CartItem = JSON.parse(item);
        return parsedItem.productId === productId;
      });

      if (existingItemIndex !== -1) {
        const existingItem: CartItem = JSON.parse(items[existingItemIndex]);
        existingItem.quantity += quantity;
        items[existingItemIndex] = JSON.stringify(existingItem);
      } else {
        items.push(newItem);
      }

      return await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.cartsCollectionId,
        cart.$id,
        { 
          items, 
          updatedAt: new Date().toISOString() 
        }
      );
    } else {
      return await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.cartsCollectionId,
        ID.unique(),
        {
          userId,
          items: [newItem],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      );
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const fetchCart = async (userId: string) => {
  try {
    if (!userId) throw new Error('User ID is required');

    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.cartsCollectionId,
      [Query.equal('userId', userId)]
    );

    if (response.documents.length > 0) {
      const cart = response.documents[0];
      const items = cart.items.map((item: string) => {
        try {
          const parsedItem = JSON.parse(item);
          return {
            productId: parsedItem.productId,
            name: parsedItem.name,
            price: parsedItem.price,
            quantity: parsedItem.quantity,
            imageUrl: parsedItem.imageUrl,
          };
        } catch (e) {
          console.error('Error parsing cart item:', e);
          return null;
        }
      }).filter(Boolean); // Remove any null items from parsing errors

      return { items, updatedAt: cart.updatedAt };
    }
    return { items: [], updatedAt: null };
  } catch (error) {
    console.error('Error fetching cart:', error);
    return { items: [], updatedAt: null };
  }
};

export const updateCart = async (
  userId: string, 
  items: CartItem[]
) => {
  try {
    if (!userId) throw new Error('User ID is required');

    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.cartsCollectionId,
      [Query.equal('userId', userId)]
    );

    if (response.documents.length > 0) {
      const cartId = response.documents[0].$id;
      const serializedItems = items.map(item => JSON.stringify(item));
      
      return await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.cartsCollectionId,
        cartId,
        { 
          items: serializedItems, 
          updatedAt: new Date().toISOString() 
        }
      );
    } else {
      // Create new cart if it doesn't exist
      return await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.cartsCollectionId,
        ID.unique(),
        {
          userId,
          items: items.map(item => JSON.stringify(item)),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      );
    }
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};

export const removeFromCart = async (userId: string, productId: string) => {
  try {
    if (!userId || !productId) throw new Error('User ID and Product ID are required');

    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.cartsCollectionId,
      [Query.equal('userId', userId)]
    );

    if (response.documents.length > 0) {
      const cart = response.documents[0];
      
      const updatedItems = cart.items.filter((item: string) => {
        const parsedItem: CartItem = JSON.parse(item);
        return parsedItem.productId !== productId;
      });

      return await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.cartsCollectionId,
        cart.$id,
        { 
          items: updatedItems, 
          updatedAt: new Date().toISOString() 
        }
      );
    }
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

export const clearCart = async (userId: string) => {
  try {
    if (!userId) throw new Error('User ID is required');

    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.cartsCollectionId,
      [Query.equal('userId', userId)]
    );

    if (response.documents.length > 0) {
      const cartId = response.documents[0].$id;
      return await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.cartsCollectionId,
        cartId,
        { 
          items: [], 
          updatedAt: new Date().toISOString() 
        }
      );
    }
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};