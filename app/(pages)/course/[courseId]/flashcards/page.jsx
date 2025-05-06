"use client"

import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import FlashcardItem from './_components/FlashcardItem'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"


function Flashcards() {

    const { courseId } = useParams()
    const [flashcards, setFlashcards] = useState()
    const [stepCount, setStepCount] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)
    const [api, setApi] = useState(null)

    useEffect(() => {
        GetFlashcards()
    }, [])

    useEffect(() => {
        if (api === null) return
        api.on('select', () => {
            setIsFlipped(false)
            setStepCount(api.selectedScrollSnap())
        })
    }, [api])

    const handleClick = () => {
        setIsFlipped(!isFlipped)
    }

    const GetFlashcards = async () => {
        try {
            const getFlashcards = await axios.post(`/api/study-type`, {
                courseId: courseId,
                studyType: 'Flashcard'
            })
            if (getFlashcards?.data?.success) {
                setFlashcards(getFlashcards?.data?.success)
            } else {
                toast.error(getFlashcards?.data?.error)
            }
        } catch (e) {
            console.log('Error:', e.message)
        }
    }

    return flashcards && (
        <div>
            <h2 className='font-bold text-2xl'>Flashcards</h2>
            <p>Flashcards: The Ultimate Tool to Lock in Concepts!</p>

            {/* Flashcard Read Indicator */ }
            <div className='flex gap-2 items-center mt-10'>
                { flashcards?.content?.length && flashcards?.content?.map((item, index) => (
                    <div
                        key={ index }
                        className={ `w-full h-2 rounded-full ${index < stepCount ? 'bg-primary' : 'bg-gray-200'}` }
                    >
                    </div>
                )) }
            </div>

            <div className='mt-15 p-10'>
                <Carousel setApi={ setApi }>
                    <CarouselContent>
                        { flashcards?.content?.length && flashcards?.content?.map((flashcard, index) => (
                            <CarouselItem key={ index }>
                                <FlashcardItem flashcard={ flashcard } isFlipped={ isFlipped } handleClick={ () => handleClick() } />
                            </CarouselItem>
                        )) }

                        {/* Last Card to Display Custom Message */ }
                        { <CarouselItem key={ flashcards?.content?.length }>
                            <FlashcardItem flashcard={ null } isFlipped={ false } handleClick={ () => handleClick() } />
                        </CarouselItem> }
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    )
}

export default Flashcards