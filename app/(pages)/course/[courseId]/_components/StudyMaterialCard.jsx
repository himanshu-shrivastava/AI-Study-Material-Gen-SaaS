import { Button } from '@/components/ui/button'
import axios from 'axios'
import { RefreshCcwDot } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'sonner'

function StudyMaterialCard({ studyMaterial, studyTypeContent, courseId, course, refreshData }) {

    const [loading, setLoading] = useState(false)

    const GenerateContent = async () => {
        setLoading(true)
        toast.info(`Your ${studyMaterial?.name} is Generating...`)
        let chapters = ''
        course?.courseLayout?.chapters.forEach((chapter) => {
            chapters = chapter?.chapterTitle + ',' + chapters
        })

        const generateTypeContent = await axios.post(`/api/generate-study-type-content`, {
            chapters: chapters,
            studyType: studyMaterial?.name,
            courseId: courseId
        })
        if (generateTypeContent?.data?.success) {
            toast.success(`Your ${studyMaterial?.name} is Ready to View`)
        } else {
            toast.error(generateTypeContent?.data?.error)
        }
        setLoading(false)
        refreshData(true)
    }

    return (
        <div className={ `
            border shadow-md rounded-lg p-3 flex flex-col items-center justify-between
            ${studyTypeContent?.[studyMaterial.type] === null && 'grayscale'}
        ` }>
            <div className='flex flex-col items-center'>
                { studyTypeContent?.[studyMaterial.type] === null
                    ? <div className='p-1 px-3 bg-gray-500 text-white rounded-full text-[10px] mb-2'>Not Generated</div>
                    : <div className='p-1 px-3 bg-green-500 text-white rounded-full text-[10px] mb-2'>Ready</div>
                }
                <Image src={ studyMaterial.icon } alt={ studyMaterial.name } width={ 50 } height={ 50 } />
                <div className='font-medium mt-3'>{ studyMaterial.name }</div>
                <p className='text-gray-500 text-sm text-center'>{ studyMaterial.desc }</p>
            </div>
            { studyTypeContent?.[studyMaterial.type] === null
                ?
                <Button className='mt-4 w-full' variant='outline' onClick={ () => GenerateContent() }>
                    { loading ? <RefreshCcwDot className='animate-spin' /> : 'Generate' }
                </Button>
                :
                <Link href={ `/course/${courseId}${studyMaterial.path}` } className='w-full'>
                    <Button className='mt-4 w-full'>View</Button>
                </Link>
            }
        </div>
    )
}

export default StudyMaterialCard