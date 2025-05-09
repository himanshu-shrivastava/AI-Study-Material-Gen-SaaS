import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(req) {

    try {
        const stripe = new Stripe(process.env.STRIPYE_SECRET_KEY)
        const { priceId } = await req.json()

        if (priceId && priceId === 'MONTHLY') {
            const actualPriceId = process.env.STRIPE_PRICE_ID_MONTHLY
            const session = await stripe.checkout.sessions.create({
                mode: 'subscription',
                line_items: [{
                    price: actualPriceId,
                    quantity: 1,
                }],

                // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
                // the actual Session ID is returned in the query parameter when your customer
                // is redirected to the success page.
                success_url: process.env.STRIPE_REDIRECT_URL + '/success?session_id={CHECKOUT_SESSION_ID}',
                cancel_url: process.env.STRIPE_REDIRECT_URL + '/cancel'
            })
            if (session) {
                return NextResponse.json({ 'success': session })
            }
        }
        return NextResponse.json({ 'error': 'Something went wrong' })
    } catch (e) {
        return NextResponse.json({ 'error': e.message })
    }
}