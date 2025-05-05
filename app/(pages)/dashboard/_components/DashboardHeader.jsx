import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

function DashboardHeader() {
    return (
        <div className='p-5 shadow-md flex gap-10 justify-end'>
            <Link href={ '/dashboard' }>
                <Button className='bg-primary'>Dashboard</Button>
            </Link>
            <UserButton />
        </div>
    )
}

export default DashboardHeader