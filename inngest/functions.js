import { db } from "@/configs/db"
import { inngest } from "./client"
import { usersTable } from "@/configs/schema"
import { eq } from "drizzle-orm"

export const INNGEST_EVENT_NAMES = {
    'HELLO_WORLD': 'test/hello.world',
    'CREATE_USER': 'user.create'
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
    },

    // Send Welcome Email Notification

    // Send Email Notification After 3 Days, Once User Comebacks
)