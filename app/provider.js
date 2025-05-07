"use client"

import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from './_components/Header'
import { CourseContext } from './_context/CourseContext'

function Provider({ children }) {

    const { user } = useUser()
    const [totalCourse, setTotalCourse] = useState(0)
    const [totalCredits, setTotalCredits] = useState(0)
    const values = {
        totalCourse,
        setTotalCourse,
        totalCredits,
        setTotalCredits
    }

    useEffect(() => {
        user && CheckNewUser()
    }, [user])

    const CheckNewUser = async () => {
        const result = await axios.post('/api/create-user', { user: user })
        // console.log('loggedin-user-data', result.data)

        //Get Courses
        if (result?.data?.success && result?.data?.success?.credits) {
            const getCourses = await axios.post(`/api/courses`, { createdBy: user?.primaryEmailAddress.emailAddress })
            if (getCourses?.data?.success) {
                setTotalCourse(getCourses?.data?.success?.length)
                setTotalCredits(result?.data?.success?.credits)
            }
        }
    }

    return (
        <CourseContext.Provider value={ values }>
            <div>
                <Header />
                { children }
            </div>
        </CourseContext.Provider>
    )
}

export default Provider