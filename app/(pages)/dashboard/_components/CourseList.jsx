"use client"

import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CourseCard from './CourseCard'
import { RefreshCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

function CourseList() {

    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)
    const { user } = useUser()

    useEffect(() => {
        user && GetCourseList()
    }, [user])

    const GetCourseList = async () => {
        setLoading(true)
        try {
            const getCourses = await axios.post(`/api/courses`, {
                createdBy: user?.primaryEmailAddress.emailAddress
            })
            if (getCourses?.data?.success) {
                setCourses(getCourses?.data?.success)
            } else {
                console.log(getCourses?.data?.error)
            }
        } catch (e) {
            console.log('Error:', e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='mt-10'>
            <h2 className='font-bold text-2xl flex justify-between items-center'>
                Your Study Material(s)
                <Button
                    variant='outline'
                    className='border-primary text-primary'
                    onClick={ GetCourseList }
                >
                    <RefreshCcw /> Refresh
                </Button>
            </h2>

            <div className='grid grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-3 mt-3 gap-5'>
                { loading
                    ?
                    [1, 2, 3, 4, 5].map((item, index) => (
                        <div key={ index } className='h-56 w-full bg-slate-200 rounded-lg animate-pulse'></div>
                    ))
                    :
                    courses?.map((course, index) => (
                        <CourseCard course={ course } key={ index } />
                    )) }
            </div>
        </div>
    )
}

export default CourseList