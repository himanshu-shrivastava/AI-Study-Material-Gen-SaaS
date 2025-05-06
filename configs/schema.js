import { boolean, integer, json, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core"

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    isMember: boolean().default(false),
    credits: integer().default(5),
    createdAt: timestamp({ mode: 'date', precision: 0 }).defaultNow()
})

export const studyMaterialTable = pgTable("studyMaterials", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    courseId: varchar().notNull(),
    courseType: varchar().notNull(),
    topic: varchar().notNull(),
    difficultyLevel: varchar().default('Easy'),
    courseLayout: json(),
    createdBy: varchar().notNull(),
    status: varchar().default('Generating'),
    createdAt: timestamp({ mode: 'date', precision: 0 }).defaultNow()
})

export const chapterNotestable = pgTable("chapterNotes", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    courseId: varchar().notNull(),
    chapterId: integer().notNull(),
    notes: text()
})

export const studyTypeContentTable = pgTable("studyTypeContents", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    courseId: varchar().notNull(),
    type: varchar().notNull(),
    content: json(),
    status: varchar().default('Generating')
})