import { userTable } from "@/db/schema";
import { LocalUser } from "@/types/LocalUser";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";

export const useUserManager = () => {
  const sqlite = useSQLiteContext();
  const db = drizzle(sqlite);

  const setUserInfo = async (props: LocalUser) => {
    await db.delete(userTable);
    return await db.insert(userTable).values(props);
  };

  const getUserInfo = async () => {
    const result = await db.select().from(userTable).limit(1);
    return result[0] ?? null;
  };

  const deleteUserInfo = async () => {
    return await db.delete(userTable);
  };

  const isUserLoggedIn = async () => {
    const user = await getUserInfo();
    return user !== null;
  };

  return { setUserInfo, getUserInfo, isUserLoggedIn, deleteUserInfo };
};
