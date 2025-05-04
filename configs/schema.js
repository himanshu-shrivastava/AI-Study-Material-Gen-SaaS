import { boolean, integer, json, pgTable, varchar } from "drizzle-orm/pg-core"

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    isMember: boolean().default(false),
    credits: integer().default(5)
})

export const studyMaterialTable = pgTable("studyMaterials", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    courseId: varchar().notNull(),
    courseType: varchar().notNull(),
    topic: varchar().notNull(),
    difficultyLevel: varchar().default('Easy'),
    courseLayout: json(),
    createdBy: varchar().notNull(),
    status: varchar().default('Generating')
})
