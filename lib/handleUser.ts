// lib/handleUser.ts
import { databases } from './appwrite';
import { ID, Query } from "react-native-appwrite";
import { appwriteConfig } from './appwrite';
import { User } from '../types/userTypes';

export const fetchUserDetails = async (id: string): Promise<User> => {
    // console.log("this is id in fetchUser function:", id);
    
    try {
        const user = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('userId', id)] // Fetch user by userId
        );

        // console.log("Raw user response from Appwrite:", user);

        // Ensure userData exists
        if (!user.documents || user.documents.length === 0) {
            throw new Error("No user found for the given ID");
        }

        const userData = user.documents[0]; 
        // console.log("this is userData:", userData);

     

        return {
            userId: userData.userId,
            email: userData.email,
            name: userData.name ?? '',
            phone: userData.phone ?? '',
            retailCode: userData.retailCode ?? '',
            address: userData.address ?? '',
            shopName: userData.shopName ?? '',
            password: userData.password ?? '',
            pincode: userData.pincode ?? '',
            profileUrl: userData.profileUrl ?? '',
            createdAt: userData.$createdAt,
            updatedAt: userData.$updatedAt,
        };
    } catch (error) {
        console.error("Error in fetchUserDetails:", error);
        throw new Error(error instanceof Error ? error.message : String(error));
    }
};
