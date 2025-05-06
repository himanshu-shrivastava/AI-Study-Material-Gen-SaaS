import { StarsIcon } from 'lucide-react'
import React from 'react'

function CourseChapterList({ course }) {
    const chapters = course?.courseLayout?.chapters
    return (
        <div className='mt-5'>
            <div className='font-medium text-xl'>Chapter</div>
            <div className='mt-3'>
                { chapters?.map((chapter, index) => (
                    <div key={ index } className='flex gap-5 items-center p-4 border shadow-md mb-2 rounded-lg cursor-pointer'>
                        <div className='text-2xl'>{ chapter?.chapterEmoji ? chapter?.chapterEmoji : <StarsIcon /> }</div>
                        <div>
                            <div className='font-medium'>{ chapter?.chapterTitle }</div>
                            <p className='text-gray-400 text-sm'>{ chapter?.chapterSummary }</p>
                        </div>
                    </div>
                )) }
            </div>
        </div>
    )
}

export default CourseChapterList