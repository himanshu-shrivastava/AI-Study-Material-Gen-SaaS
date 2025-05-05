"use client"

import { DASHBOARD_SIDEBAR_MENUS } from '@/app/constants'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function SideBar() {

    const currentPath = usePathname()
    return (
        <div className='h-screen shadow-md p-5'>

            <div className='flex gap-2 items-center'>
                <Image src={ '/logo.svg' } alt='Logo' width={ 40 } height={ 40 } />
                <h2 className='font-bold text-2xl'>Easy Study</h2>
            </div>

            {/* Top Content */ }
            <div className='mt-10'>
                <Link href={ '/create' }>
                    <Button className='w-full'>+ Create New</Button>
                </Link>

                <div className='mt-5'>
                    { DASHBOARD_SIDEBAR_MENUS.map((menu, index) => (
                        <Link key={ index } href={ menu.path }>
                            <div
                                className={ `
                                    flex gap-5 items-center p-3 rounded-lg cursor-pointer hover:bg-slate-200 mt-3
                                    ${currentPath === menu.path && 'bg-slate-200'}
                                `}
                            >
                                { menu.icon }
                                <h2>{ menu.name }</h2>
                            </div>
                        </Link>
                    )) }
                </div>
            </div>

            {/* Bottom Content */ }
            <div className='border p-3 bg-slate-100 rounded-lg absolute bottom-10 w-[85%]'>
                <h2 className='text-lg mb-2'>Available Credits : 5</h2>
                <Progress value={ 20 } />
                <h2 className='text-sm mt-1'>1 Out of 5 Cretits Used</h2>

                <Link href={ '/dashboard/upgrade' } className='text-primary text-xs mt-3'>Upgrade to create more</Link>
            </div>

        </div>
    )
}

export default SideBar