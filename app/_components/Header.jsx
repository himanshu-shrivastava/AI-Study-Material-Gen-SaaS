"use client"

import React, { useContext } from 'react'
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { CourseContext } from '../_context/CourseContext'

function Header() {

    const { isLoaded, isSignedIn } = useUser()
    const { totalCourse, totalCredits } = useContext(CourseContext)

    return (
        <header className='p-5 px-5 shadow-md flex justify-between items-center relative w-full'>
            <div className='flex gap-2 items-center'>
                <Image src={ '/logo.svg' } alt='Logo' width={ 40 } height={ 40 } />
                <h2 className='font-bold text-2xl'>Easy Study</h2>
            </div>
            <div className='flex gap-8 items-center mr-2'>
                { isLoaded && isSignedIn &&
                    <Link href={ '/upgrade' }>
                        <Button title='Click to create more Credits' className='md:hidden bg-yellow-300 text-red-700 font-bold hover:bg-yellow-400'>
                            Available Credits : { (totalCredits - totalCourse) }
                        </Button>
                    </Link>
                }
                <Link href={ '/dashboard' }>
                    <Button className='bg-primary'>Dashboard</Button>
                </Link>
                <UserButton />
            </div>
        </header>
    )
}

export default Header