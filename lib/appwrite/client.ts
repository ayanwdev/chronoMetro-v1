import { Account, Client, Databases } from "react-native-appwrite";

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT!)
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!);

const db = new Databases(client);

export const account = new Account(client);

export { db };
