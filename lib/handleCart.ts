import { appwriteConfig } from "./appwrite";
import { ID, Query } from "react-native-appwrite";
import { databases } from "./appwrite";

export const addToCart = async (userId: string, productId: string, quantity: number, price: number,imageUrl:string,name:string) => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.cartsCollectionId,
      [Query.equal('userId', userId)]
    );

    // Serialize the new item as a string
    const newItem = JSON.stringify({ productId, quantity, price,imageUrl ,name});

    if (response.documents.length > 0) {
      const cart = response.documents[0];
      let items = cart.items || []; // Ensure items is an array

      // Check if the cart is full
      if (items.length >= 100) {
        throw new Error('Cart is full. Please remove some items before adding more.');
      }

      // Check if the product already exists in the cart
    interface CartItem {
      productId: string;
      quantity: number;
      price: number;
      imageUrl:string;
      name:string;

    }

    const existingItemIndex: number = items.findIndex((item: string): boolean => {
      const parsedItem: CartItem = JSON.parse(item);
      return parsedItem.productId === productId;
    });

      if (existingItemIndex !== -1) {
        // Update quantity for existing item
        const existingItem = JSON.parse(items[existingItemIndex]);
        existingItem.quantity += quantity;
        items[existingItemIndex] = JSON.stringify(existingItem);
      } else {
        // Add new item to the cart
        items.push(newItem);
      }

      await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.cartsCollectionId,
        cart.$id,
        { items, updatedAt: new Date().toISOString() }
      );
    } else {
      // Create a new cart
      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.cartsCollectionId,
        ID.unique(),
        {
          userId,
          items: [newItem], // Store as an array of strings
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
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.cartsCollectionId,
      [Query.equal('userId', userId)]
    );

    if (response.documents.length > 0) {
      const cart = response.documents[0];
      const items = cart.items.map((item: string) => {
        const parsedItem = JSON.parse(item);
        return {
          productId: parsedItem.productId,
          name: parsedItem.name, // Include name
          price: parsedItem.price,
          quantity: parsedItem.quantity,
          imageUrl: parsedItem.imageUrl, // Include imageUrl
        };
      });
      return { items, updatedAt: cart.updatedAt };
    }
    return { items: [], updatedAt: null };
  } catch (error) {
    console.error('Error fetching cart:', error);
    return { items: [], updatedAt: null };
  }
};



export const updateCart = async (userId: string, items: Array<{ productId: string, quantity: number, price: number }>) => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.cartsCollectionId,
      [Query.equal('userId', userId)]
    );

    if (response.documents.length > 0) {
      const cartId = response.documents[0].$id;
      const serializedItems = items.map(item => JSON.stringify(item)); // Serialize each item
      await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.cartsCollectionId,
        cartId,
        { items: serializedItems, updatedAt: new Date().toISOString() }
      );
    }
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};





export const removeFromCart = async (userId: string, productId: string) => {
  try {
    // Fetch the user's cart
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.cartsCollectionId,
      [Query.equal('userId', userId)]
    );

    if (response.documents.length > 0) {
      const cart = response.documents[0];
      
      // Filter out the item with the specified productId
      interface CartItemRemove {
        productId: string;
        quantity: number;
        price: number;
        imageUrl: string;
        name: string;
      }

      const updatedItems: string[] = cart.items.filter((item: string) => {
        const parsedItem: CartItemRemove = JSON.parse(item); // Parse the JSON string
        return parsedItem.productId !== productId; // Keep items that don't match the productId
      });

      // Update the cart with the remaining items
      await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.cartsCollectionId,
        cart.$id,
        { items: updatedItems, updatedAt: new Date().toISOString() }
      );
    }
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};




export const clearCart = async (userId: string) => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.cartsCollectionId,
      [Query.equal('userId', userId)]
    );

    if (response.documents.length > 0) {
      const cartId = response.documents[0].$id;
      await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.cartsCollectionId,
        cartId,
        { items: [], updatedAt: new Date().toISOString() } // Clear the items array
      );
    }
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};