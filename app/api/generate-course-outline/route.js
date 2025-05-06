import { courseOutlineAIModel } from "@/configs/AiModel"
import { db } from "@/configs/db"
import { studyMaterialTable } from "@/configs/schema"
import { inngest } from "@/inngest/client"
import { INNGEST_EVENT_NAMES } from "@/inngest/functions"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const { courseId, topic, courseType, difficultyLavel, createdBy } = await req.json()

        const PROMPT = `Generate a study material for topic ${topic}: for ${courseType}: and level of difficulty will be ${difficultyLavel} with summary of course, Topic and Difficulty Level, List of Chapters (Max 3) along with Summary and Emoji icon for each chapter, Topic list in each chapter, All results in JSON format.`

        const ai_result = await courseOutlineAIModel.sendMessage(PROMPT)
        const ai_response = ai_result.response.text().split('```json').pop().split('```')[0]

        /* Save data to database */
        const db_insert = await db.insert(studyMaterialTable).values({
            courseId: courseId,
            courseType: courseType,
            topic: topic,
            difficultyLevel: difficultyLavel,
            courseLayout: ai_response,
            createdBy: createdBy
        }).returning(studyMaterialTable)

        // Trigger Inngest Function to Generate Chapter Notes
        const inngest_result = await inngest.send({
            name: INNGEST_EVENT_NAMES.GENERATE_NOTES,
            data: {
                course: db_insert[0]
            }
        })
        console.log('inngest_result', inngest_result)

        return NextResponse.json({ 'success': db_insert[0] })
    }
    catch (e) {
        return NextResponse.json("Error Message:", e.message)
    }
}