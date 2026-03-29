import { AppwriteSkillType } from "./AppwriteSkill";

export type LocalSkill = {
  $id: string;
  name: string;
  type: AppwriteSkillType;
  parentId: string | null;
  deleted: 0 | 1;
  $createdAt: string;
  $updatedAt: string;
};
