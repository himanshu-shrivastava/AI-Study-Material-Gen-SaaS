import { courseOutlineAIModel } from "@/configs/AiModel"
import { db } from "@/configs/db"
import { studyMaterialTable } from "@/configs/schema"
import { inngest } from "@/inngest/client"
import { INNGEST_EVENT_NAMES } from "@/inngest/functions"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const { courseId, topic, courseType, difficultyLavel, createdBy } = await req.json()

        const PROMPT = `Generate a study material for topic ${topic}: for ${courseType}: and level of difficulty will be ${difficultyLavel} with summary of course, Topic and Difficulty Level, List of Chapters along with summary for each chapter, Topic list in each chapter, All results in JSON format.`

        const ai_response = await courseOutlineAIModel.sendMessage(PROMPT)
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
        }).returning(studyMaterialTable)

        // Trigger Inngest Function to Generate Chapter Notes
        const inngest_result = await inngest.send({
            name: INNGEST_EVENT_NAMES.GENERATE_NOTES,
            data: {
                course: db_insert[0]
            }
        })
        console.log('inngest_result', inngest_result)

        // console.log('db_insert', db_insert)
        return NextResponse.json({ 'result': db_insert[0] })
    }
    catch (e) {
        return NextResponse.json("Error Message:", e.message)
    }
}