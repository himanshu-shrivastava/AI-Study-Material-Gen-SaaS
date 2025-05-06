"use client"

import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect } from 'react'
import Header from './_components/Header'

function Provider({ children }) {

    const { user } = useUser()

    useEffect(() => {
        user && CheckNewUser()
    }, [user])

    const CheckNewUser = async () => {
        const result = await axios.post('/api/create-user', { user: user })
        // console.log('loggedin-user-data', result.data)
    }

    return (
        <div>
            <Header />
            { children }
        </div>
    )
}

export default Provider