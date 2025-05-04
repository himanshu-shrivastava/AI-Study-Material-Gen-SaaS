import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY)

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash"
})

const config = {
    temprature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8000,
    responseMimeType: "application/json"
}

export const chatSession = model.startChat({
    config,
    history: [
        {
            role: "user",
            parts: [{ text: "Generate a study material for topic Phyton: for Coding Prep: and level of difficulty will be Easy with summary of Course, Topic and Difficulty Level, List of Chapters along with summary for each chapter, Topic list in each chapter, All results in JSON format." }],
        },
        {
            role: "model",
            parts: [
                { text: `\`\`\`json{"courseSummary": "This course provides a gentle introduction to Python programming for beginners preparing for coding interviews.  It focuses on fundamental concepts and data structures crucial for cracking entry-level coding challenges.","courseTopic": "Python for Coding Prep (Easy)","difficultyLevel": "Easy","chapters": [{"chapterTitle": "Introduction to Python","chapterSummary": "This chapter covers the basics of Python: installation, setup, basic syntax, variable types, and printing output.","topics": ["Installing Python","Running Python Code (Interactive Shell & Scripts)","Basic Syntax (Indentation, Comments)","Data Types (Integers, Floats, Strings, Booleans)","Variables and Assignment","Printing Output (print() function)"]},{"chapterTitle": "Basic Input/Output","chapterSummary": "This chapter covers how to take user input and output results in various ways.","topics": ["Taking User Input (input() function)","Formatted Output (f-strings, str.format())","Working with Files (opening, reading, writing – basic level)"]}]}\`\`\`` }
            ],
        },
    ],
})
