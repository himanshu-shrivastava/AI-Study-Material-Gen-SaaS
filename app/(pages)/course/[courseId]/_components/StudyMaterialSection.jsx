import { STUDY_MATERIAL_OPTIONS } from '@/app/constants'
import React, { useEffect, useState } from 'react'
import StudyMaterialCard from './StudyMaterialCard'
import axios from 'axios'
import { toast } from 'sonner'

function StudyMaterialSection({ courseId, course }) {

    const [studyTypeContent, setStudyTypeContent] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        GetStudyMaterial()
    }, [])

    const GetStudyMaterial = async () => {
        setLoading(true)
        try {
            const getStudyContent = await axios.post(`/api/study-type`, {
                courseId: courseId,
                studyType: 'ALL'
            })
            if (getStudyContent?.data?.success) {
                setStudyTypeContent(getStudyContent?.data?.success)
            } else {
                toast.error(getStudyContent?.data?.error)
            }
        } catch (e) {
            console.log('Error:', e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='mt-5'>
            <div className='font-medium text-xl'>Study Material</div>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-3'>
                { !loading
                    ? STUDY_MATERIAL_OPTIONS.map((studyMaterial, index) => (
                        <StudyMaterialCard
                            key={ index }
                            studyMaterial={ studyMaterial }
                            studyTypeContent={ studyTypeContent }
                            courseId={ courseId }
                            course={ course }
                            refreshData={ GetStudyMaterial }
                        />
                    ))
                    :
                    [1, 2, 3, 4].map((item, index) => (
                        <div key={ index } className='h-56 w-full bg-slate-200 rounded-lg animate-pulse'></div>
                    ))
                }
            </div>
        </div>
    )
}

export default StudyMaterialSection