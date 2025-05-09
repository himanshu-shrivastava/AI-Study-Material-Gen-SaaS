"use client"

import { CourseContext } from '@/app/_context/CourseContext'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Check } from 'lucide-react'
import React, { useContext } from 'react'

function Upgrade() {

    const { userDetail } = useContext(CourseContext)

    const OnCheckoutClick = async () => {
        const result = await axios.post('/api/payment/checkout', {
            priceId: 'MONTHLY'
        })
        if (result?.data?.success) {
            window.open(result?.data?.success?.url) // Checkout Page Redirection
        } else {
            console.log('OnCheckoutClick', result?.data?.error)
        }
    }

    const OnManagePayment = async () => {
        const result = await axios.post('/api/payment/manage-payment', {
            customerId: userDetail?.customerId
        })
        if (result?.data?.success) {
            window.open(result?.data?.success?.url) // Stripe Manage Payment Redirection
        } else {
            console.log('OnCheckoutClick', result?.data?.error)
        }
    }

    return (
        <div>
            <h2 className='font-medium text-3xl'>Plans</h2>
            <p>Update your plan to generate unlimited courses for your study </p>

            <div className='mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12'>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center'>

                    <div className='rounded-2xl border border-gray-200 p-6 shadow-lg'>
                        <div className='text-center'>
                            <h3 className='text-lg font-medium text-gray-900'>Free</h3>
                            <p className='mt-2 sm:mt-4'>
                                <span className='text-3xl font-bold text-gray-900 sm:text-4xl'>0$</span>
                                <span className='text-sm font-medium text-gray-700'>/month</span>
                            </p>
                            <ul className='mt-6 space-y-2 flex flex-col items-center justify-center'>
                                <li className='flex items-center justify-start w-[200px]'><Check /> 5 PDF Upload</li>
                                <li className='flex items-center justify-start w-[200px]'><Check />Unlimited Notes Taking</li>
                                <li className='flex items-center justify-start w-[200px]'><Check />Email support</li>
                                <li className='flex items-center justify-start w-[200px]'><Check />Help center access</li>
                            </ul>
                            <Button variant='ghost' className='w-full mt-5 text-primary hover:bg-white hover:text-primary cursor-text'>Current Plan</Button>
                        </div>
                    </div>
                    <div className='rounded-2xl border border-gray-200 p-6 shadow-lg'>
                        <div className='text-center'>
                            <h3 className='text-lg font-medium text-gray-900'>
                                Monthly <span className='sr-only'>Plan</span>
                            </h3>
                            <p className='mt-2 sm:mt-4'>
                                <span className='text-3xl font-bold text-gray-900 sm:text-4xl'>9.99$</span>
                                <span className='text-sm font-medium text-gray-700'>/monthly</span>
                            </p>
                            <ul className='mt-6 space-y-2 flex flex-col items-center justify-center'>
                                <li className='flex items-center justify-start w-[200px]'><Check />Unlimited PDF Upload</li>
                                <li className='flex items-center justify-start w-[200px]'><Check />Unlimited Notes Taking</li>
                                <li className='flex items-center justify-start w-[200px]'><Check />Email Support</li>
                                <li className='flex items-center justify-start w-[200px]'><Check />Help Center Access</li>
                            </ul>
                            { userDetail?.isMember === true
                                ? <Button className='w-full mt-5' onClick={ OnManagePayment }>
                                    Manage Payment
                                </Button>
                                : <Button className='w-full mt-5' onClick={ OnCheckoutClick }>
                                    Get Started
                                </Button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Upgrade