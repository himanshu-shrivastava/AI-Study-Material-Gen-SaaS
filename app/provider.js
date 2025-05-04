"use client"

import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect } from 'react'

function Provider({ children }) {

    const { user } = useUser()

    useEffect(() => {
        user && CheckNewUser()
    }, [user])

    const CheckNewUser = async () => {
        const result = await axios.post('/api/create-user', { user: user })
        console.log('loggedin-user-data', result.data)
    }

    return (
        <div>
            { children }
        </div>
    )
}

export default Provider