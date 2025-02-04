// lib/handleAuth.ts
import {account, appwriteConfig,databases} from "./appwrite";
import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
  } from "react-native-appwrite";
  import { User } from "../types/userTypes";
 

  export async function createUser({
    email,
    password,
    name,
    phone,
    retailCode,
    address,
    shopName,
  }: {
    email: string;
    password: string;
    name: string;
    phone: string;
    retailCode: string;
    address: string;
    shopName: string;
  }) {
    try {
      // Step 1: Validate that the phone number is unique
      const existingUsers = await databases.listDocuments(
        appwriteConfig.databaseId, // Database ID
        appwriteConfig.userCollectionId, // Collection ID for users
        [Query.equal("phone", phone)] // Check if phone number exists
      );
  
      if (existingUsers.documents.length > 0) {
        throw new Error("Phone number already in use. Please provide a unique phone number.");
      }
  
      // Step 2: Create the user account in Appwrite Auth
      const newAccount = await account.create(
        ID.unique(), // Unique user ID
        email,
        password
      );
  
      if (!newAccount) throw new Error("Account creation failed");
  
      // Step 3: Prepare user data for the 'users' collection
      const userData = {
        userId: newAccount.$id, // Use the account ID as the userId
        email: newAccount.email,
        name,
        phone,
        retailCode,
        address,
        shopName,
        password, // Store the password (no uniqueness check required)
        createdAt: new Date().toISOString(), // Current timestamp
        updatedAt: new Date().toISOString(), // Current timestamp
      };
  
      // Step 4: Store user data in the 'users' collection
      await databases.createDocument(
        appwriteConfig.databaseId, // Database ID
        appwriteConfig.userCollectionId, // Collection ID for users
        ID.unique(), // Unique document ID
        userData // User data
      );
  
      // Step 5: Sign in the user after account creation
      await signIn(phone, password);
  
      return newAccount;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }
  


  export async function signIn(phone: string, password: string) {
    try {
      // Step 1: Validate phone number and password from the 'users' collection
      const existingUsers = await databases.listDocuments(
        appwriteConfig.databaseId, // Database ID
        appwriteConfig.userCollectionId, // Collection ID for users
        [
          Query.equal("phone", phone),      // Check if phone exists
          Query.equal("password", password) // Check if password matches
        ]
      );
  
      // Step 2: If no matching user is found, throw an error
      if (existingUsers.documents.length === 0) {
        throw new Error("Invalid phone number or password.");
      }
  
      // Step 3: Fetch user details (only one user should match)
      const user = existingUsers.documents[0];
      const email = user.email; // Retrieve email from user collection
  
      // Step 4: Create an email-password session using retrieved email
      const session = await account.createEmailPasswordSession(email, password);
  
      return session;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }
  


  // Get Account
export async function getAccount() {
    try {
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error));
    }
  }


  export async function getCurrentUser() {
    try {
      const currentAccount = await getAccount();
      if (!currentAccount) throw Error;
   
      return currentAccount;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  export async function signOut() {
    try {
      const session = await account.deleteSession("current");
  
      return session;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error));
    }
  }
  
  
  
  
  