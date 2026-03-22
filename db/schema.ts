import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
});

export const skillTable = sqliteTable("skill", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(),
});
