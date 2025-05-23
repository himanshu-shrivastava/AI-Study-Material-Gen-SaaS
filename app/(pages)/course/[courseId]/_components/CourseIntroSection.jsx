import { Progress } from '@/components/ui/progress'
import Image from 'next/image'
import React from 'react'

function CourseIntroSection({ course }) {
    return (
        <div className='flex gap-5 items-center p-10 border shadow-md rounded-lg'>
            <Image src={ '/content.png' } alt='Course Detail Info Image' width={ 70 } height={ 70 } />
            <div>
                <div className='font-bold text-2xl'>{ course?.courseLayout?.courseTopic }</div>
                <p>{ course?.courseLayout?.courseSummary }</p>
                <Progress className='mt-5' />
                <div className='mt-3 text-lg text-primary'>Total Chapters : { course?.courseLayout?.chapters?.length }</div>
            </div>
        </div>
    )
}

export default CourseIntroSection