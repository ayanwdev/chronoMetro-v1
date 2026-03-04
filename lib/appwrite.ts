import { Account, Client, ID } from "react-native-appwrite";

const client = new Client()
  .setEndpoint("https://sgp.cloud.appwrite.io/v1")
  .setProject("69a6b52100165992902e")
  .setPlatform("dev.ayanw.chronometro");

export const account = new Account(client);
export { ID };
