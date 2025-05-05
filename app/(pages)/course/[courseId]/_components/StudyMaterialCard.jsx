import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

function StudyMaterialCard({ studyMaterial, studyTypeContent }) {
    return (
        <div className={ `
            border shadow-md rounded-lg p-3 flex flex-col items-center justify-between
            ${studyTypeContent?.[studyMaterial.type] === null && 'grayscale'}
        ` }>
            <div className='flex flex-col items-center'>
                { studyTypeContent?.[studyMaterial.type] === null
                    ? <div className='p-1 px-3 bg-gray-500 text-white rounded-full text-[10px] mb-2'>Generate</div>
                    : <div className='p-1 px-3 bg-green-500 text-white rounded-full text-[10px] mb-2'>Ready</div>
                }
                <Image src={ studyMaterial.icon } alt={ studyMaterial.name } width={ 50 } height={ 50 } />
                <div className='font-medium mt-3'>{ studyMaterial.name }</div>
                <p className='text-gray-500 text-sm text-center'>{ studyMaterial.desc }</p>
            </div>
            { studyTypeContent?.[studyMaterial.type] === null
                ? <Button className='mt-3 w-full' variant='outline'>Generate</Button>
                : <Button className='mt-3 w-full'>View</Button>
            }
        </div>
    )
}

export default StudyMaterialCard