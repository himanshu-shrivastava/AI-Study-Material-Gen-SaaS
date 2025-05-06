import { db } from "@/configs/db"
import { chapterNotestable, studyTypeContentTable } from "@/configs/schema"
import { and, eq } from "drizzle-orm"
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

            const otherContentList = await db.select().from(studyTypeContentTable)
                .where(eq(studyTypeContentTable?.courseId, courseId))

            if (notes.length > 0) {
                result.notes = notes
            }

            if (otherContentList.length > 0) {
                result.flashcard = otherContentList?.find(item => item.type === 'Flashcard') || null
                result.quiz = otherContentList?.find(item => item.type === 'Quiz') || null
                result.qa = otherContentList?.find(item => item.type === 'QA') || null
            }

            return NextResponse.json({ 'success': result })
        }
        else if (studyType === 'notes') {
            const notes = await db.select().from(chapterNotestable)
                .where(eq(chapterNotestable?.courseId, courseId))
                .orderBy(chapterNotestable.chapterId)

            return NextResponse.json({ 'success': notes })
        } else {
            const otherContentType = await db.select().from(studyTypeContentTable)
                .where(and(
                    eq(studyTypeContentTable?.courseId, courseId),
                    eq(studyTypeContentTable?.type, studyType)
                ))

            return NextResponse.json({ 'success': otherContentType[0] })
        }
    }
    catch (e) {
        return NextResponse.json({ 'error': e.message })
    }
}