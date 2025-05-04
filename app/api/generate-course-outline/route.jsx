import { chatSession } from "@/configs/AiModel"
import { db } from "@/configs/db"
import { studyMaterialTable } from "@/configs/schema"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const { courseId, topic, courseType, difficultyLavel, createdBy } = await req.json()

        const PROMPT = `Generate a study material for topic ${topic}: for ${courseType}: and level of difficulty will be ${difficultyLavel} with summary of course, Topic and Difficulty Level, List of Chapters along with summary for each chapter, Topic list in each chapter, All results in JSON format.`

        const ai_response = await chatSession.sendMessage(PROMPT)
        const ai_result = ai_response.response.text().split('```json').pop().split('```')[0]
        // console.log('ai_result', ai_result)

        /* Save data to database */
        const db_insert = await db.insert(studyMaterialTable).values({
            courseId: courseId,
            courseType: courseType,
            topic: topic,
            difficultyLevel: difficultyLavel,
            courseLayout: ai_result,
            createdBy: createdBy
        }).returning({ id: studyMaterialTable?.id })

        // console.log('db_insert', db_insert)
        return NextResponse.json({ 'result': db_insert[0] })
    }
    catch (e) {
        return NextResponse.json("Error Message:", e.message)
    }
}