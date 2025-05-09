import React from 'react'

function CourseViewLayout({ children }) {
    return (
        <div>
            <div className='mx-10 md:mx-24 lg:mx-56 mt-10'>
                { children }
            </div>
        </div>
    )
}

export default CourseViewLayout