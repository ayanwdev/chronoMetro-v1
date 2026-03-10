export enum AppwriteSkillType {
  Parent = 1,
  Child = 2,
}

export type AppwriteSkill = {
  $id: string;
  name: string;
  type: AppwriteSkillType;
  parentId: string | null;
  user: string;
  $createdAt: string;
  $updatedAt: string;
};
