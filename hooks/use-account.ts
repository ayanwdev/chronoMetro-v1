import { userTable } from "@/db/schema";
import { account, tablesDB } from "@/lib/appwrite/client";
import { AppwriteSkill, AppwriteSkillType } from "@/types/AppwriteSkill";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { ID, Query } from "react-native-appwrite";

const DB_ID = process.env.EXPO_PUBLIC_APPWRITE_DB_ID!;
const SKILL_TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_SKILL_COLLECTION!;

export const useAccount = () => {
  const sqlite = useSQLiteContext();
  const localDB = drizzle(sqlite);

  // ── Auth ──────────────────────────────────────────────────

  const signIn = async (email: string, password: string) => {
    await account.createEmailPasswordSession({ email, password });
    const user = await account.get();
    await localDB.delete(userTable);
    await localDB
      .insert(userTable)
      .values({ id: user.$id, name: user.name, email: user.email });
    router.replace("/(tabs)/home");
  };

  const signOut = async () => {
    await account.deleteSession({ sessionId: "current" });
    await localDB.delete(userTable);
    router.replace("/");
  };

  const getUser = async () => {
    const result = await localDB.select().from(userTable).limit(1);
    return result[0] ?? null;
  };

  const isLoggedIn = async () => {
    const user = await getUser();
    return user !== null;
  };

  // ── Skills ────────────────────────────────────────────────

  const listSkills = async (): Promise<AppwriteSkill[]> => {
    const user = await getUser();
    if (!user) return [];
    const response = await tablesDB.listRows({
      databaseId: DB_ID,
      tableId: SKILL_TABLE_ID,
      queries: [Query.equal("user", user.id)],
    });
    return response.rows as unknown as AppwriteSkill[];
  };

  const getSkill = async (skillId: string): Promise<AppwriteSkill | null> => {
    const user = await getUser();
    if (!user) return null;
    try {
      const row = await tablesDB.getRow({
        databaseId: DB_ID,
        tableId: SKILL_TABLE_ID,
        rowId: skillId,
      });
      if (row.user !== user.id) return null;
      return row as unknown as AppwriteSkill;
    } catch {
      return null;
    }
  };

  const createSkill = async (
    name: string,
    type: AppwriteSkillType,
    id?: string,
    parentId?: string,
  ): Promise<AppwriteSkill | null> => {
    const user = await getUser();
    if (!user) return null;
    const row = await tablesDB.createRow({
      databaseId: DB_ID,
      tableId: SKILL_TABLE_ID,
      rowId: id ?? ID.unique(),
      data: { name, type, parentId, user: user.id },
    });
    return row as unknown as AppwriteSkill;
  };

  const deleteSkill = async (skillId: string) => {
    const user = await getUser();
    if (!user) return;
    return await tablesDB.deleteRow({
      databaseId: DB_ID,
      tableId: SKILL_TABLE_ID,
      rowId: skillId,
    });
  };

  return {
    signIn,
    signOut,
    getUser,
    isLoggedIn,
    listSkills,
    getSkill,
    createSkill,
    deleteSkill,
  };
};
