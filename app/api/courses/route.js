import { db } from "@/configs/db"
import { studyMaterialTable } from "@/configs/schema"
import { desc, eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function POST(req) {

    try {
        const { createdBy } = await req.json()

        const db_select = await db.select().from(studyMaterialTable)
            .where(eq(studyMaterialTable.createdBy, createdBy))
            .orderBy(desc(studyMaterialTable.id))

        if (db_select?.length > 0) {
            return NextResponse.json({ 'success': db_select })
        } else {
            return NextResponse.json({ 'error': 'No Records Found' })
        }
    }
    catch (e) {
        return NextResponse.json({ 'error': e.message })
    }
}