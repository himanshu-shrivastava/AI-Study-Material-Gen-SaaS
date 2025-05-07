import { CREATE_SELECT_OPTIONS } from '@/app/constants'
import Image from 'next/image'
import React, { useState } from 'react'

function SelectOption({ selectedCourseType }) {

    const [selectedOption, setSelectedOption] = useState()
    return (
        <div>
            <h3 className='text-center mb-2 text-lg'>For which you want to create your personal study material?</h3>

            <div className='mt-5 grid grid-cols-2 md:grid-cols-3 gap-5'>
                { CREATE_SELECT_OPTIONS.map((option, index) => (
                    <div
                        key={ index }
                        onClick={ () => {
                            setSelectedOption(option.name)
                            selectedCourseType(option.name)
                        } }
                        className={ `
                            p-4 flex flex-col items-center justify-center border rounded-xl cursor-pointer hover:border-primary
                            ${option.name === selectedOption && 'border-primary'}
                        `}
                    >
                        <Image src={ option.icon } alt={ option.name } width={ 70 } height={ 70 } />
                        <h2 className='text-sm'>{ option.name }</h2>
                    </div>
                )) }
            </div>

        </div >
    )
}

export default SelectOption