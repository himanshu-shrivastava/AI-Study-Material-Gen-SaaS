import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(req) {
    try {
        const stripe = new Stripe(process.env.STRIPYE_SECRET_KEY)

        const returnUrl = process.env.STRIPE_REDIRECT_URL + '/cancel'
        const { customerId } = await req.json()

        const portalSession = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: returnUrl,
        })

        return NextResponse.json({ 'success': portalSession })
    } catch (e) {
        return NextResponse.json({ 'error': e.message })
    }
}