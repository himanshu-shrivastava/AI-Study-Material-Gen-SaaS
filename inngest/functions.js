import { db } from "@/configs/db"
import { inngest } from "./client"
import { chapterNotestable, studyMaterialTable, studyTypeContentTable, usersTable } from "@/configs/schema"
import { eq } from "drizzle-orm"
import { generateNotesAIModel, generateFlashcardAIModel, generateQuizAIModel } from "@/configs/AiModel"

export const INNGEST_EVENT_NAMES = {
    'HELLO_WORLD': 'hello.world',
    'CREATE_USER': 'user.create',
    'GENERATE_NOTES': 'notes.generate',
    'STUDY_TYPE_CONTENT': 'studytype.content'
}

export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: INNGEST_EVENT_NAMES.HELLO_WORLD },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "1s")
        return { message: `Hello ${event.data.email}!` }
    },
)

export const CreateNewUser = inngest.createFunction(
    { id: "create-user" },
    { event: INNGEST_EVENT_NAMES.CREATE_USER },
    async ({ event, step }) => {
        // Get Event Data
        const { user } = event.data

        // Steps
        const result = await step.run(
            'Check Logged In User and Insert into DB if does not Exist',
            async () => {
                // Check if User is lready exist in DB
                const existingUserData = await db.select().from(usersTable)
                    .where(eq(
                        usersTable.email,
                        user?.primaryEmailAddress?.emailAddress
                    ))

                // If Not, Save user Data to DB
                if (existingUserData?.length < 1) {
                    const newUserData = await db.insert(usersTable).values({
                        name: user?.fullName,
                        email: user?.primaryEmailAddress?.emailAddress,
                    }).returning(usersTable)
                    return newUserData
                }
                return existingUserData
            }
        )
        return 'Success'
    }
)

export const GenerateNotes = inngest.createFunction(
    { id: 'generate-course' },
    { event: INNGEST_EVENT_NAMES.GENERATE_NOTES },
    async ({ event, step }) => {
        const { course } = event.data // All Record Info

        // Generate Notes for Each Chapter with AI
        const notesResult = await step.run('Generate Chapter Notes', async () => {
            let index = 0
            const chapters = course?.courseLayout?.chapters
            chapters.forEach(async (chapter) => {
                const PROMPT = `Generate exam material detail content for each chapter, Make sure to include all topic points in the content alaong with Emoji, Make sure to give content in HTML format(Do not ADD HTML, Head, Body, Title tag), The chapters: ${JSON.stringify(chapter)}`
                const ai_response = await generateNotesAIModel.sendMessage(PROMPT)
                const ai_notes_html = ai_response.response.text().split('```html').pop().split('```')[0]

                // Save data to database
                await db.insert(chapterNotestable).values({
                    chapterId: index,
                    courseId: course?.courseId,
                    notes: ai_notes_html
                })
                index++
            })
            return 'Notes Generated'
        })

        //Update Course Status to 'Ready'
        const updateCourseStatus = await step.run('Update Course Status to Ready', async () => {
            await db.update(studyMaterialTable).set({
                status: 'Ready'
            }).where(eq(
                studyMaterialTable.courseId, course?.courseId
            ))
            return 'Course Status Updated'
        })

        return 'Success'
    }
)

// Used to generate Flashcards, Quizzes and Questions-Answers
export const GenerateStudyTypeContent = inngest.createFunction(
    { id: 'generate-study-type-content' },
    { event: INNGEST_EVENT_NAMES.STUDY_TYPE_CONTENT },
    async ({ event, step }) => {
        const { studyType, prompt, courseId, recordId } = event.data

        // Generate Flashcards/Quiz using Prompt
        if (prompt && studyType) {
            const AiResult = await step.run(`Generate ${studyType} Using AI`, async () => {
                let result = ''
                if (studyType === 'Flashcard')
                    result = await generateFlashcardAIModel.sendMessage(prompt)
                else if (studyType === 'Quiz')
                    result = await generateQuizAIModel.sendMessage(prompt)

                return result.response.text().split('```json').pop().split('```')[0]
            })

            // Save Result to DB
            const dbResult = await step.run('Save Result to DB', async () => {
                await db.update(studyTypeContentTable).set({
                    content: AiResult,
                    status: 'Ready'
                }).where(eq(studyTypeContentTable.id, recordId))
                return 'Data Updated'
            })
            return 'Success'
        }
        return 'Invalid Request'
    }
)