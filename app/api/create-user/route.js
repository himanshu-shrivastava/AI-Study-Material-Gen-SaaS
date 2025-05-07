import { db } from "@/configs/db"
import { usersTable } from "@/configs/schema"
import { inngest } from "@/inngest/client"
import { INNGEST_EVENT_NAMES } from "@/inngest/functions"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const { user } = await req.json()

        const result = await inngest.send({
            name: INNGEST_EVENT_NAMES.CREATE_USER,
            data: {
                user: user
            }
        })

        if (user && user?.primaryEmailAddress?.emailAddress) {
            const db_select = await db.select().from(usersTable)
                .where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress))
            if (db_select?.length > 0) {
                return NextResponse.json({ 'success': db_select[0] })
            }
        }

        return NextResponse.json({ 'success': result })
    }
    catch (e) {
        return NextResponse.json(e.message)
    }
}