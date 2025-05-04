import React from 'react'
import SideBar from './_components/SideBar'
import DashboardHeader from './_components/Dashboardheader'

function DashboadLayout({ children }) {
    return (
        <div>
            <div className='hidden md:w-64 md:block fixed'>
                <SideBar />
            </div>
            <div className='md:ml-64'>
                <DashboardHeader />
                <div className='p-10'>
                    { children }
                </div>
            </div>
        </div>
    )
}

export default DashboadLayout