import { account, db } from "@/lib/appwrite/client";
import { AppwriteSkill, AppwriteSkillType } from "@/types/AppwriteSkill";
import { ID, Models, Query } from "react-native-appwrite";

export class AppwriteUser {
  private static cachedUser: Models.User<Models.Preferences> | null = null;
  private static fetched = false;

  static async getUser(): Promise<Models.User<Models.Preferences> | null> {
    if (this.fetched) return this.cachedUser;
    try {
      const user = await account.get();
      this.cachedUser = user;
      this.fetched = true;
      return user;
    } catch {
      this.cachedUser = null;
      this.fetched = true;
      return null;
    }
  }

  static async getSkills(): Promise<AppwriteSkill[]> {
    const user = await this.getUser();
    if (!user) return [];

    const response = await db.listDocuments(
      process.env.EXPO_PUBLIC_APPWRITE_DB_ID!,
      process.env.EXPO_PUBLIC_APPWRITE_SKILL_COLLECTION!,
      [Query.equal("user", user.$id)],
    );

    return response.documents as unknown as AppwriteSkill[];
  }

  static async createSkill(
    name: string,
    type: AppwriteSkillType,
    parentId?: string,
  ): Promise<AppwriteSkill | null> {
    const user = await this.getUser();
    if (!user) return null;

    const doc = await db.createDocument(
      process.env.EXPO_PUBLIC_APPWRITE_DB_ID!,
      process.env.EXPO_PUBLIC_APPWRITE_SKILL_COLLECTION!,
      ID.unique(),
      {
        name,
        type,
        parentId,
        user: user.$id,
      },
    );

    return doc as unknown as AppwriteSkill;
  }

  static async deleteSkill(skillId: string) {
    const user = await this.getUser();
    if (!user) return;

    return await db.deleteDocument(
      process.env.EXPO_PUBLIC_APPWRITE_DB_ID!,
      process.env.EXPO_PUBLIC_APPWRITE_SKILL_COLLECTION!,
      skillId,
    );
  }
}
