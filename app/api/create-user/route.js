import { inngest } from "@/inngest/client"
import { INNGEST_EVENT_NAMES } from "@/inngest/functions"
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

        return NextResponse.json({ result: result })
    }
    catch (e) {
        return NextResponse.json(e.message)
    }
}