import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
    return (
        <div className='flex flex-col items-center p-5 mt-20 md:px-24 lg:px-32'>
            <div className="flex justify-center items-start text-center gap-14">
                <Image src={ '/knowledge.png' } alt='Home Knowledge Image' width={ 60 } height={ 60 } />
                <div>
                    <h2 className="text-4xl font-bold">AI-Powered <span className="text-primary">Exam Prep</span> Material Generator</h2>
                    <h3 className="text-gray-400 text-sm mt-5">Your AI Exam Prep Companion: Effortless Study Material at Your Fingertips</h3>
                    <div className="mt-10">
                        <Link href={ '/dashboard' }><Button>Get Started <ArrowRight /></Button></Link>
                    </div>
                    <div className="mt-7 flex justify-center border-2 border-dashed shadow-2xl">
                        <Image src={ '/book.gif' } alt='Home Laptop Image' width={ 350 } height={ 200 } />
                    </div>
                    <div className="mt-5 flex justify-between">
                        <Image src={ '/code.png' } alt='Home Code Image' width={ 60 } height={ 60 } />
                        <Image src={ '/content.png' } alt='Home Content Image' width={ 60 } height={ 60 } />
                    </div>
                </div>
                <Image src={ '/practice.png' } alt='Home Practice Image' width={ 60 } height={ 60 } />
            </div>
        </div>
    )
}
