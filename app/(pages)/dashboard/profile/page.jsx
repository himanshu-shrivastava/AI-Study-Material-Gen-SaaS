"use client"

import { CourseContext } from '@/app/_context/CourseContext'
import { convertDatetoISO } from '@/lib/utils'
import React, { useContext } from 'react'

function UserProfile() {
    const { userDetail } = useContext(CourseContext)

    return userDetail && (
        <div>
            <h2 className='text-3xl text-primary font-bold'>Personal Details :</h2>

            <div className='mt-5 border-2 shadow-lg rounded-lg p-5 font-bold text-lg text-blue-500'>
                <div className='flex items-center justify-start'>
                    <h3 className='w-[200px]'>Full Name : </h3>
                    <span className='text-black'>{ userDetail?.name }</span>
                </div>
                <div className='flex items-center justify-start'>
                    <h3 className='w-[200px]'>Email ID : </h3>
                    <span className='text-black'>{ userDetail?.email }</span>
                </div>
                <div className='flex items-center justify-start'>
                    <h3 className='w-[200px]'>Member Since : </h3>
                    <span className='text-black'>{ convertDatetoISO(userDetail?.createdAt) }</span>
                </div>
                <div className='flex items-center justify-start'>
                    <h3 className='w-[200px]'>Premium Member : </h3>
                    <span className='text-black'>{ userDetail?.isMember ? 'Yes' : 'No' }</span>
                </div>
            </div>
        </div>
    )
}

export default UserProfile