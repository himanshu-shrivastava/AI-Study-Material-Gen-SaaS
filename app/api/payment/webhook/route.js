import { db } from "@/configs/db"
import { usersTable } from "@/configs/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(req) {

    try {
        const stripe = new Stripe(process.env.STRIPYE_SECRET_KEY)

        let data
        let eventType
        // Check if webhook signing is configured.
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

        if (webhookSecret) {
            // Retrieve the event by verifying the signature using the raw body and secret.
            let event
            let signature = req.headers["stripe-signature"]

            try {
                event = stripe.webhooks.constructEvent(
                    req.body,
                    signature,
                    webhookSecret
                )
            } catch (err) {
                console.log(`⚠️  Webhook signature verification failed.`)
                return res.sendStatus(400)
            }
            // Extract the object from the event.
            data = event.data
            eventType = event.type
        } else {
            // Webhook signing is recommended, but if the secret is not configured in `config.js`,
            // retrieve the event data directly from the request body.
            data = req.body.data
            eventType = req.body.type
        }

        switch (eventType) {
            case 'checkout.session.completed':
                const result = await db.update(usersTable).set({
                    isMember: true
                }).where(eq(usersTable.email, data?.customer_details?.email))
                break
            case 'invoice.paid':
                // Record Payment Record Table
                break
            case 'invoice.payment_failed':
                await db.update(usersTable).set({
                    isMember: false
                }).where(eq(usersTable.email, data?.customer_details?.email))
                break
            default:
            // Unhandled event type
        }

        return NextResponse.json({ 'success': 'success' })
        // return NextResponse.json({ 'error': 'Something went wrong' })
    } catch (e) {
        return NextResponse.json({ 'error': e.message })
    }
}