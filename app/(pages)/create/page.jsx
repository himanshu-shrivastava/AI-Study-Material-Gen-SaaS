"use client"

import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { Loader } from 'lucide-react'
import SelectOption from './_components/SelectOption'
import { Button } from '@/components/ui/button'
import TopicInput from './_components/TopicInput'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { CourseContext } from '@/app/_context/CourseContext'

function CreateCourse() {

    const [step, setStep] = useState(0)
    const [formData, setFormData] = useState([])
    const [loading, setLoading] = useState(false)
    const { user } = useUser()
    const router = useRouter()
    const { totalCourses, setTotalCourses, userDetail } = useContext(CourseContext)

    useEffect(() => {
        if (userDetail?.isMember === false && totalCourses >= userDetail?.credits) {
            toast.error('No Credit Available. Please Upgrade')
            router.replace('/dashboard/upgrade')
        }
    }, [totalCourses])

    const handleUserInput = (fieldName, fieldValue) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: fieldValue
        }))
    }

    const GenerateCourseOutline = async () => {
        setLoading(true)
        const courseId = uuidv4()
        await axios.post('/api/generate-course-outline', {
            courseId: courseId,
            ...formData,
            createdBy: user?.primaryEmailAddress?.emailAddress
        }).then(response => {
            setLoading(false)
            toast.info('Your course is generating. Click on refresh button.')
            setTotalCourses(totalCourses + 1)
            router.replace('/dashboard')
        }).catch(error => {
            console.log('GenerateCourseOutline:', error.message)
        })
    }

    return (
        <div>
            <div className='flex flex-col items-center p-5 mt-10 md:px-24 lg:px-36'>
                <h2 className='font-bold text-primary text-3xl'>Start Building Your Personal Study Material</h2>
                <p className='text-gray-500 text-lg'>Fill all the details in order to generate study material for your next project.</p>

                <div className='mt-10'>
                    { step === 0
                        ? <SelectOption selectedCourseType={ (value) => handleUserInput('courseType', value) } />
                        : <TopicInput
                            setTopic={ (value) => handleUserInput('topic', value) }
                            setDifficultyLevel={ (value) => handleUserInput('difficultyLavel', value) }
                        />
                    }
                </div>

                <div className='flex justify-center w-full mt-20 gap-16'>
                    { step !== 0 ? <Button onClick={ () => setStep(step - 1) } disabled={ loading } variant='outline'>Previous</Button> : '' }
                    { step === 0
                        ?
                        <Button onClick={ () => setStep(step + 1) }>Next</Button>
                        :
                        <Button onClick={ GenerateCourseOutline } disabled={ loading }>
                            { loading ? <Loader className='animate-spin' /> : 'Generate' }
                        </Button>
                    }
                </div>
            </div>
        </div>
    )
}

export default CreateCourse