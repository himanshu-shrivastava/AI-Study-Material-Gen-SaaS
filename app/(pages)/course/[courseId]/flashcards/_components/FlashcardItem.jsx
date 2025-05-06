import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import ReactCardFlip from 'react-card-flip'

function FlashcardItem({ flashcard, isFlipped, handleClick }) {

    const router = useRouter()
    return (
        <div>
            { flashcard !== null
                ?
                <div className='flex items-center justify-center'>
                    <ReactCardFlip isFlipped={ isFlipped } flipDirection="vertical">
                        <div
                            className='h-[300px] w-[250px] md:h-[350px] md:w-[300px] p-4 shadow-lg bg-primary text-white flex items-center justify-center rounded-lg cursor-pointer'
                            onClick={ handleClick }
                        >
                            <h2 className='text-center'>{ flashcard?.front }</h2>
                        </div>

                        <div
                            className='h-[250px] w-[200px] md:h-[350px] md:w-[300px] p-4 shadow-lg bg-white text-primary flex items-center justify-center rounded-lg cursor-pointer'
                            onClick={ handleClick }
                        >
                            <h2 className='text-center'>{ flashcard?.back }</h2>
                        </div>
                    </ReactCardFlip>
                </div>
                :
                <div className='flex items-center justify-center'>
                    <div className='h-[250px] w-[200px] md:h-[350px] md:w-[300px] p-4 shadow-lg bg-yellow-100 flex flex-col gap-5 items-center justify-center rounded-lg'>
                        <div className='text-green-500 text-xl'>Flashcards Completed!</div>
                        <Button onClick={ () => router.back() }>Go back to Course Page</Button>
                    </div>
                </div>
            }
        </div>
    )
}

export default FlashcardItem