"use client"

import { LoaderPinwheel } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function PaymentSuccess() {

    const router = useRouter()
    useEffect(() => {
        setTimeout(() => {
            router.replace('/dashboard/upgrade')
        }, 2000)
    })
    return (
        <div>
            <div className='flex flex-col items-center p-5 mt-10 md:px-24 lg:px-64'>
                <h2 className='text-2xl text-green-600'>Your payment is successfully done.</h2>
                <div className='mt-5 flex gap-2 items-center'>
                    <h4 className='animate-spin'><LoaderPinwheel /></h4>
                    <h4 className='animate-pulse'>Redirecting...</h4>
                </div>
            </div>
        </div>
    )
}

export default PaymentSuccess