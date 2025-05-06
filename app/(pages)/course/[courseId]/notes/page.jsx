"use client"

import { Button } from '@/components/ui/button'
import axios from 'axios'
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

function ViewNotes() {

    const { courseId } = useParams()
    const [notes, setNotes] = useState()
    const [loading, setLoading] = useState(false)
    const [stepCount, setStepCount] = useState(0)
    const router = useRouter()

    useEffect(() => {
        GetNotes()
    }, [])

    const GetNotes = async () => {
        setLoading(true)
        try {
            const getNotes = await axios.post(`/api/study-type`, {
                courseId: courseId,
                studyType: 'notes'
            })
            if (getNotes?.data?.success) {
                setNotes(getNotes?.data?.success)
                // console.log('getNotes', getNotes?.data?.success)
            } else {
                toast.error(getNotes?.data?.error)
            }
        } catch (e) {
            console.log('Error:', e.message)
        } finally {
            setLoading(false)
        }
    }

    return notes && (
        <div>
            <div className='flex gap-5 items-center'>
                { notes?.map((note, index) => (
                    <div
                        key={ index }
                        className={ `w-full h-2 rounded-full ${index < stepCount ? 'bg-primary' : 'bg-gray-200'}` }
                    >
                    </div>
                )) }
            </div>

            <div className='w-full mt-5 flex gap-5 justify-center'>
                <Button variant='outline' size='sm' disabled={ stepCount < 1 } onClick={ () => setStepCount(stepCount - 1) }><ArrowBigLeft />Previous Chapter</Button>
                <Button variant='outline' size='sm' disabled={ stepCount > notes?.length - 1 } onClick={ () => setStepCount(stepCount + 1) }><ArrowBigRight />Next Chapter</Button>
            </div>

            <div className='mt-10 mb-10 custom'>
                <div dangerouslySetInnerHTML={ { __html: notes[stepCount]?.notes } } />
                { stepCount === notes?.length &&
                    <div className='flex flex-col gap-10 justify-center items-center'>
                        <div className='text-green-500 text-2xl'>Completed all the chapters. Hope you learned something!</div>
                        <Button onClick={ () => router.back() }>Go to Course Page</Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default ViewNotes