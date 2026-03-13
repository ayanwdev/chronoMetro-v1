import { account, db } from "@/lib/appwrite/client";
import { AppwriteSkill, AppwriteSkillType } from "@/types/AppwriteSkill";
import { ID, Models, Query } from "react-native-appwrite";

export class AppwriteUser {
  private static cachedUser: Models.User<Models.Preferences> | null = null;
  private static fetched = false;
  private static DB_ID = process.env.EXPO_PUBLIC_APPWRITE_DB_ID!;
  private static SKILL_COLLECTION_ID =
    process.env.EXPO_PUBLIC_APPWRITE_SKILL_COLLECTION!;

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

  static async listSkills(): Promise<AppwriteSkill[]> {
    const user = await this.getUser();
    if (!user) return [];

    const response = await db.listDocuments(
      this.DB_ID,
      this.SKILL_COLLECTION_ID,
      [Query.equal("user", user.$id)],
    );

    return response.documents as unknown as AppwriteSkill[];
  }

  static async getSkill(skillId: string): Promise<AppwriteSkill | null> {
    const user = await this.getUser();
    if (!user) return null;

    try {
      const doc = await db.getDocument(
        this.DB_ID,
        this.SKILL_COLLECTION_ID,
        skillId,
      );

      if (doc.user !== user.$id) {
        return null;
      }

      return doc as unknown as AppwriteSkill;
    } catch {
      console.error("Skill not found");
      return null;
    }
  }

  static async createSkill(
    name: string,
    type: AppwriteSkillType,
    id?: string,
    parentId?: string,
  ): Promise<AppwriteSkill | null> {
    const user = await this.getUser();
    if (!user) return null;

    const doc = await db.createDocument(
      this.DB_ID,
      this.SKILL_COLLECTION_ID,
      id ?? ID.unique(),
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
      this.DB_ID,
      this.SKILL_COLLECTION_ID,
      skillId,
    );
  }
}
