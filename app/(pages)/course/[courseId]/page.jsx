"use client"

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import CourseIntroSection from './_components/CourseIntroSection'
import StudyMaterialSection from './_components/StudyMaterialSection'
import CourseChapterList from './_components/CourseChapterList'

function Course() {

    const { courseId } = useParams()
    const [course, setCourse] = useState()

    useEffect(() => {
        GetCourseByID()
    }, [])

    const GetCourseByID = async () => {
        try {
            const getCourse = await axios.get(`/api/courses?courseId=${courseId}`)
            if (getCourse?.data?.success) {
                setCourse(getCourse?.data?.success[0])
                // console.log('getCourse', getCourse?.data?.success[0])
            } else {
                toast.error(getCourse?.data?.error)
            }
        } catch (e) {
            console.log('Error:', e.message)
        }
    }

    return (
        <div>
            <div>
                {/* Course Info */ }
                <CourseIntroSection course={ course } />

                {/* Study Materials Options */ }
                <StudyMaterialSection courseId={ courseId } course={ course } />

                {/* Chapter List */ }
                <CourseChapterList course={ course } />
            </div>
        </div>
    )
}

export default Course