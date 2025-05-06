import React from 'react'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

function Header() {
    return (
        <div className='p-5 px-5 shadow-md flex justify-between items-center relative w-full'>
            <div className='flex gap-2 items-center'>
                <Image src={ '/logo.svg' } alt='Logo' width={ 40 } height={ 40 } />
                <h2 className='font-bold text-2xl'>Easy Study</h2>
            </div>
            <div className='flex gap-10 items-center'>
                <Link href={ '/dashboard' }>
                    <Button className='bg-primary'>Dashboard</Button>
                </Link>
                <UserButton />
            </div>
        </div>
    )
}

export default Header