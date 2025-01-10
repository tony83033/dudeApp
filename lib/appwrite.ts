import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
  } from "react-native-appwrite";
export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.dude",
    projectId: "6780e3ff00052183da93",
    databaseId: "67811767003984166d8d",
    userCollectionId: "678117b5003d84901e25",
  };

  const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

  export const account = new Account(client);