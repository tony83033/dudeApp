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
    productscollectionId: "67841fbe001f1492ed9b",
    addressesCollectionId: "678425cb00065ae8f6e4",
    categoriesCollectionId: "6784211500075796cdb3",
    orderItemsCollectionId: "6784253f003cb6ca9b36",
    ordersCollectionId: "678422cc000435240434",
    reviewsCollectionId: "67842677000e2ff86cd8",
    topCategoriesCollectionId: "6784f04b001d5ad03d85",

  };

  const client = new Client();
  export const databases = new Databases(client);

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

  export const account = new Account(client);
