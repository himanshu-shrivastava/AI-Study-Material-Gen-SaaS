"use client"

import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from './_components/Header'
import { CourseContext } from './_context/CourseContext'

function Provider({ children }) {

    const { user } = useUser()
    const [totalCourses, setTotalCourses] = useState(0)
    const [userDetail, setUserDetail] = useState({})

    const values = {
        totalCourses,
        setTotalCourses,
        userDetail,
        setUserDetail
    }

    useEffect(() => {
        user && CheckNewUser()
    }, [user])

    const CheckNewUser = async () => {
        const userResult = await axios.post('/api/create-user', { user: user })
        // console.log('loggedin-user-data', userResult.data)

        //Get Courses
        if (userResult?.data?.success && userResult?.data?.success?.email) {
            const getCourses = await axios.post(`/api/courses`, { createdBy: user?.primaryEmailAddress.emailAddress })
            if (getCourses?.data?.success) {
                setTotalCourses(getCourses?.data?.success?.length)
                setUserDetail(userResult?.data?.success)
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