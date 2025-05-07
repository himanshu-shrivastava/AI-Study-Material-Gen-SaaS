import React from 'react'
import SideBar from './_components/SideBar'

function DashboadLayout({ children }) {
    return (
        <div>
            <div className='hidden md:w-64 md:block absolute'>
                <SideBar />
            </div>
            <div className='md:ml-64'>
                <div className='md:p-7 px-20 py-7'>
                    { children }
                </div>
            </div>
        </div>
    )
}

export default DashboadLayout