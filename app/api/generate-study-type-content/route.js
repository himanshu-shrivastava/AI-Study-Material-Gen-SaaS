import { db } from "@/configs/db"
import { studyTypeContentTable } from "@/configs/schema"
import { inngest } from "@/inngest/client"
import { INNGEST_EVENT_NAMES } from "@/inngest/functions"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const { chapters, studyType, courseId } = await req.json()

        const PROMPT = `Generate the flashcard on topic : ${chapters} in JSON format with front back content, Maximum 15.`

        // Insert Record to DB
        const db_insert = await db.insert(studyTypeContentTable).values({
            courseId: courseId,
            type: studyType,
        }).returning({ recordId: studyTypeContentTable.id })

        // Trigger Inngest Function
        inngest.send({
            name: INNGEST_EVENT_NAMES.STUDY_TYPE_CONTENT,
            data: {
                prompt: PROMPT,
                studyType: studyType,
                courseId: courseId,
                recordId: db_insert[0].recordId
            }
        })

        return NextResponse.json({ 'success': db_insert[0] })
    }
    catch (e) {
        return NextResponse.json("error:", e.message)
    }
}