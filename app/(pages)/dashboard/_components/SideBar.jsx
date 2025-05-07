"use client"

import { CourseContext } from '@/app/_context/CourseContext'
import { DASHBOARD_SIDEBAR_MENUS } from '@/app/constants'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext } from 'react'
import { toast } from 'sonner'

function SideBar() {

    const currentPath = usePathname()
    const { totalCourse, totalCredits } = useContext(CourseContext)

    return (
        <div className='h-[80vh] shadow-md p-4 flex flex-col justify-between'>
            {/* Top Content */ }
            <div className='mt-2 p-1'>
                { totalCourse >= totalCredits
                    ? <Button className='w-full' disabled={ true }>+ Create New</Button>
                    : <Link href={ '/create' }>
                        <Button className='w-full'>+ Create New</Button>
                    </Link>
                }

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
            <div className='border p-3 bg-slate-100 rounded-lg w-full text-center'>
                <h3 className='text-lg mb-2'>Available Credits : { (totalCredits - totalCourse) }</h3>
                <Progress value={ (totalCourse / totalCredits) * 100 } />
                <div className='text-sm mt-2'>{ `${totalCourse} Out of ${totalCredits} Cretits Used` }</div>

                <Link href={ '/dashboard/upgrade' } className='text-primary text-xs mt-3'>Upgrade to create more</Link>
            </div>

        </div>
    )
}

export default SideBar