import { boolean, integer, pgTable, varchar } from "drizzle-orm/pg-core"

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    isMember: boolean().default(false)
})
