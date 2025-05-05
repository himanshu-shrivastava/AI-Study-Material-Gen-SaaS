"use client"

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import DashboardHeader from '../../dashboard/_components/DashboardHeader'
import { toast } from 'sonner'
import axios from 'axios'
import CourseIntroSection from './_components/CourseIntroSection'
import StudyMaterialSection from './_components/StudyMaterialSection'
import CourseChapterList from './_components/CourseChapterList'

function Course() {

    const { courseId } = useParams()
    const [course, setCourse] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        GetCourseByID()
    }, [])

    const GetCourseByID = async () => {
        setLoading(true)
        try {
            const getCourse = await axios.get(`/api/courses?courseId=${courseId}`)
            if (getCourse?.data?.success) {
                setCourse(getCourse?.data?.success[0])
                console.log('getCourse', getCourse?.data?.success[0])
            } else {
                toast.error(getCourse?.data?.error)
            }
        } catch (e) {
            console.log('Error:', e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <DashboardHeader />

            <div className='mx-10 md:mx-32 lg:mx-56 mt-10'>
                {/* Course Info */ }
                <CourseIntroSection course={ course } />

                {/* Study Materials Options */ }
                <StudyMaterialSection courseId={ courseId } />

                {/* Chapter List */ }
                <CourseChapterList course={ course } />
            </div>
        </div>
    )
}

export default Course