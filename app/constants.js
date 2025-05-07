import { LayoutDashboard, Shield, UserCircle } from "lucide-react"

export const DASHBOARD_SIDEBAR_MENUS = [
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

export const CREATE_SELECT_OPTIONS = [
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
        name: 'Fitness',
        icon: '/fitness.png'
    },
    {
        name: 'Other',
        icon: '/knowledge.png'
    }
]

export const STUDY_MATERIAL_OPTIONS = [
    {
        name: 'Notes/Chapters',
        desc: 'Read notes to prepare it',
        icon: '/notes.png',
        path: '/notes',
        type: 'notes'
    },
    {
        name: 'Flashcard',
        desc: 'Flashcard help to remember the concepts',
        icon: '/flashcard.png',
        path: '/flashcards',
        type: 'flashcard'
    },
    {
        name: 'Quiz',
        desc: 'Great way to test your knowledge',
        icon: '/quiz.png',
        path: '/quizzes',
        type: 'quiz'
    },
    {
        name: 'QA',
        desc: 'Help to practice your learning',
        icon: '/qa.png',
        path: '/question-answers',
        type: 'qa'
    },
]