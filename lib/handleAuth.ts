import {account} from "./appwrite";
import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
  } from "react-native-appwrite";

export async function createUser(email:string, password:string) {
    try {
      const newAccount = await account.create(
        ID.unique(),
        email,
        password
      );
  
      if (!newAccount) throw Error;
  
      
  
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
  
  
  
  
  