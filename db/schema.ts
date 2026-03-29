import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
  $id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  emailVerification: integer("emailVerification", { mode: "boolean" })
    .notNull()
    .default(false),
  phoneVerification: integer("phoneVerification", { mode: "boolean" })
    .notNull()
    .default(false),
  mfa: integer("mfa", { mode: "boolean" }).notNull().default(false),
  phone: text("phone").notNull().default(""),
  status: integer("status", { mode: "boolean" }).notNull().default(true),
  registration: text("registration").notNull(),
  passwordUpdate: text("passwordUpdate").notNull(),
  accessedAt: text("accessedAt").notNull(),
  $createdAt: text("createdAt").notNull(),
  $updatedAt: text("updatedAt").notNull(),
});

export const skillTable = sqliteTable("skill", {
  $id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  parentId: text("parentId"),
  deleted: integer("deleted"),
  $createdAt: text("createdAt").notNull(),
  $updatedAt: text("updatedAt").notNull(),
});
