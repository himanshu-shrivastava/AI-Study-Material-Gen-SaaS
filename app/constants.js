import { LayoutDashboard, Shield, UserCircle } from "lucide-react"

export const DashboardSidebarMenus = [
    {
        name: 'Dashboard',
        icon: <LayoutDashboard />,
        path: '/dashboard'
    },
    {
        name: 'Upgrade',
        icon: <Shield />,
        path: '/dashboard/upgrade'
    },
    {
        name: 'Profile',
        icon: <UserCircle />,
        path: '/dashboard/profile'
    }
]

export const CreateSelectOptions = [
    {
        name: 'Exam',
        icon: '/exam.png'
    },
    {
        name: 'Job Interview',
        icon: '/job.png'
    },
    {
        name: 'Practice',
        icon: '/practice.png'
    },
    {
        name: 'Coding Prep',
        icon: '/code.png'
    },
    {
        name: 'Other',
        icon: '/knowledge.png'
    }
]