import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { convertDatetoISO } from '@/lib/utils'
import { RefreshCcw } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function CourseCard({ course }) {

    return (
        <div className='border rounded-lg shadow-md p-5'>
            <div>
                <div className='flex justify-between items-center'>
                    <Image src={ '/knowledge.png' } alt='Course Card Image' width={ 50 } height={ 50 } />
                    <h2 className='text-[12px] p-1 px-3 rounded-full bg-blue-400 text-white'>{ convertDatetoISO(course?.createdAt) }</h2>
                </div>

                <h2 className='mt-3 font-medium text-lg line-clamp-2 h-[60px]' title={ course?.courseLayout?.courseTopic }>{ course?.courseLayout?.courseTopic }</h2>
                <p className='text-sm line-clamp-2 text-gray-500 mt-2'>{ course?.courseLayout?.courseSummary }</p>

                <div className='mt-3'>
                    <Progress value={ 0 } />
                </div>

                <div className='mt-3 flex justify-center'>
                    { course?.status === 'Generating'
                        ?
                        <h2 className='text-sm flex gap-2 items-center p-1 px-2 rounded-full bg-gray-400 text-white'>
                            <RefreshCcw className='h-4 w-4 animate-spin' />Generating...
                        </h2>
                        :
                        <Link href={ `/course/${course?.courseId}` }>
                            <Button>View</Button>
                        </Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default CourseCard