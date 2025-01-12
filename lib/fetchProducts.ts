import { databases } from "./appwrite";
import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
  } from "react-native-appwrite";
  import {appwriteConfig} from "./appwrite";
  import { Product } from "../types/productTypes";
  export async function fetchFeaturedProducts(): Promise<Product[]> {
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId, // Database ID
        appwriteConfig.productscollectionId, // Collection ID
        [
          Query.equal('isFeatured', true) // Fetch only featured products
        ]
      );
  
      // Cast the documents to Product[]
      const products = response.documents.map((doc) => ({
        $collectionId: doc.$collectionId,
        $createdAt: doc.$createdAt,
        $databaseId: doc.$databaseId,
        $id: doc.$id,
        $permissions: doc.$permissions,
        $updatedAt: doc.$updatedAt,
        categoryId: doc.categoryId,
        createdAt: doc.createdAt,
        description: doc.description,
        discount: doc.discount,
        imageUrl: doc.imageUrl,
        isFeatured: doc.isFeatured,
        mrp: doc.mrp,
        name: doc.name,
        price: doc.price,
        productId: doc.productId,
        stock: doc.stock,
        updatedAt: doc.updatedAt,
      }));
  
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      return []; // Return an empty array in case of error
    }
  }

  export async function fetchProductsById(id: string): Promise<Product | null> {
    try {
      const response = await databases.getDocument(
        appwriteConfig.databaseId, // Database ID
        appwriteConfig.productscollectionId, // Collection ID
        id // Product ID
      );
  
      // Transform the response into the Product type
      const product: Product = {
        $collectionId: response.$collectionId,
        $createdAt: response.$createdAt,
        $databaseId: response.$databaseId,
        $id: response.$id,
        $permissions: response.$permissions,
        $updatedAt: response.$updatedAt,
        categoryId: response.categoryId,
        createdAt: response.createdAt,
        description: response.description,
        discount: response.discount,
        imageUrl: response.imageUrl,
        isFeatured: response.isFeatured,
        mrp: response.mrp,
        name: response.name,
        price: response.price,
        productId: response.productId,
        stock: response.stock,
        updatedAt: response.updatedAt,
      };
  
      return product;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      return null; // Return null in case of error
    }
  }

  export async function fetchProductsByCategory(categoryId: string): Promise<Product[]> {
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId, // Database ID
        appwriteConfig.productscollectionId, // Collection ID
        [
          Query.equal('categoryId', categoryId) // Fetch products by category
        ]
      );
  
      // Cast the documents to Product[]
      const products = response.documents.map((doc) => ({
        $collectionId: doc.$collectionId,
        $createdAt: doc.$createdAt,
        $databaseId: doc.$databaseId,
        $id: doc.$id,
        $permissions: doc.$permissions,
        $updatedAt: doc.$updatedAt,
        categoryId: doc.categoryId,
        createdAt: doc.createdAt,
        description: doc.description,
        discount: doc.discount,
        imageUrl: doc.imageUrl,
        isFeatured: doc.isFeatured,
        mrp: doc.mrp,
        name: doc.name,
        price: doc.price,
        productId: doc.productId,
        stock: doc.stock,
        updatedAt: doc.updatedAt,
      }));
  
      return products;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return []; // Return an empty array in case of error
  }
}