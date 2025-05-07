"use client"

import axios from 'axios'
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import QuizCard from './_components/QuizCard'
import { Button } from '@/components/ui/button'

function Quizzes() {

    const { courseId } = useParams()
    const [stepCount, setStepCount] = useState(0)
    const [quizData, setQuizData] = useState()
    const [quizzes, setQuizzes] = useState([])
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(null)

    useEffect(() => {
        courseId && GetQuizzes()
    }, [courseId])

    useEffect(() => {
        setIsCorrectAnswer(null)
    }, [stepCount])

    const GetQuizzes = async () => {
        try {
            const getQuizzes = await axios.post(`/api/study-type`, {
                courseId: courseId,
                studyType: 'Quiz'
            })
            if (getQuizzes?.data?.success) {
                setQuizData(getQuizzes?.data?.success)
                setQuizzes(getQuizzes?.data?.success?.content?.questions)
            } else {
                toast.error(getQuizzes?.data?.error)
            }
        } catch (e) {
            console.log('Error:', e.message)
        }
    }

    // Check if user selected answer is correct or not
    const checkSelectedAnswer = (userAnswer, currentQuiz) => {
        if (userAnswer === currentQuiz?.correctAnswer)
            return setIsCorrectAnswer(true)
        else
            return setIsCorrectAnswer(false)
    }

    return quizData && quizzes && (
        <div>
            <h2 className='font-bold text-2xl text-center mb-6'>Quiz</h2>

            <div className='flex gap-5 items-center'>
                { quizzes?.map((quiz, index) => (
                    <div key={ index } className={ `w-full h-2 rounded-full ${index < stepCount ? 'bg-primary' : 'bg-gray-200'}` }></div>
                )) }
            </div>

            <div className='w-full mt-5 flex gap-5 justify-center'>
                <Button variant='outline' size='sm' disabled={ stepCount < 1 } onClick={ () => setStepCount(stepCount - 1) }><ArrowBigLeft />Previous Quiz</Button>
                <Button variant='outline' size='sm' disabled={ stepCount > quizzes?.length - 1 } onClick={ () => setStepCount(stepCount + 1) }><ArrowBigRight />Next Quiz</Button>
            </div>

            <h3 className='font-bold text-xl text-center mt-7 border p-2 bg-primary text-white rounded-sm'>Topic : { quizData?.content?.quizTitle }</h3>

            <QuizCard quiz={ quizzes[stepCount] } userSelectedOption={ (value) => checkSelectedAnswer(value, quizzes[stepCount]) } />

            { isCorrectAnswer !== null ?
                isCorrectAnswer === true
                    ? <div className='mt-3 mb-5'>
                        <div className='border p-3 border-green-700 bg-green-200 rounded-lg text-green-600'>
                            <h2 className='font-bold text-lg'>Correct</h2>
                            <p>Your Answer is Correct</p>
                        </div>
                    </div>
                    : <div className='mt-3 mb-5'>
                        <div className='border p-3 border-red-700 bg-red-200 rounded-lg text-red-600'>
                            <h2 className='font-bold text-lg'>Incorrect</h2>
                            <p>Correct Answer is : <span className='font-bold'>{ quizzes[stepCount]?.correctAnswer }</span></p>
                        </div>
                    </div>
                : ''
            }
        </div>
    )
}

export default Quizzes