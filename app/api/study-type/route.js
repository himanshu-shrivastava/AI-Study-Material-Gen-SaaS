import { db } from "@/configs/db"
import { chapterNotestable } from "@/configs/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const { courseId, studyType } = await req.json()

        let result = {
            notes: null,
            flashcard: null,
            quiz: null,
            qa: null
        }
        if (studyType === 'ALL') {
            const notes = await db.select().from(chapterNotestable)
                .where(eq(chapterNotestable?.courseId, courseId))
                .orderBy(chapterNotestable.chapterId)

            if (notes.length > 0) {
                result.notes = notes
            }

            return NextResponse.json({ 'success': result })
        }
        else if (studyType === 'notes') {
            const notes = await db.select().from(chapterNotestable)
                .where(eq(chapterNotestable?.courseId, courseId))
                .orderBy(chapterNotestable.chapterId)

            return NextResponse.json({ 'success': notes })
        }
    }
    catch (e) {
        return NextResponse.json({ 'error': e.message })
    }
}