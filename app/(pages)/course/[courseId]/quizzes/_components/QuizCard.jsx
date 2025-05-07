import React, { useState } from 'react'

function QuizCard({ quiz, userSelectedOption }) {

    const [selectedOption, setSelectedoption] = useState()
    return quiz && (
        <div className='mt-3 p-5'>
            <h2 className='font-medium text-2xl text-center'>{ quiz?.question }</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 items-center'>
                { quiz?.options?.map((option, index) => (
                    <h2
                        key={ index }
                        variant='outline'
                        className={ `
                            hover:bg-gray-200 cursor-pointer text-lg w-full text-center border rounded-full px-3 p-2
                            ${selectedOption === option && 'bg-primary text-white hover:bg-primary'}
                        `}
                        onClick={ () => {
                            setSelectedoption(option)
                            userSelectedOption(option)
                        } }
                    >
                        { option }
                    </h2>
                )) }
            </div>
        </div>
    )
}

export default QuizCard