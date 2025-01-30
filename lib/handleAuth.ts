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
  export async function createUser(email: string, password: string, name?: string, phone?: string, profileUrl?: string) {
    try {
      // Step 1: Create the user account in Appwrite Auth
      const newAccount = await account.create(
        ID.unique(), // Unique user ID
        email,
        password
      );
  
      if (!newAccount) throw new Error("Account creation failed");
  
      // Step 2: Prepare user data for the 'users' collection
      const userData: User = {
        userId: newAccount.$id, // Use the account ID as the userId
        email: newAccount.email,
        name: name || "", // Optional fields
        phone: phone || "",
        profileUrl: profileUrl || "",
        createdAt: new Date().toISOString(), // Current timestamp
        updatedAt: new Date().toISOString(), // Current timestamp
      };
  
      // Step 3: Store user data in the 'users' collection
      await databases.createDocument(
        appwriteConfig.databaseId, // Database ID
        appwriteConfig.userCollectionId, // Collection ID for users
        ID.unique(), // Unique document ID
        userData // User data
      );
  
      // Step 4: Sign in the user after account creation
      await signIn(email, password);
  
      return newAccount;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }


  export async function signIn(email:string, password:string) {
    try {
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
  
  
  
  
  