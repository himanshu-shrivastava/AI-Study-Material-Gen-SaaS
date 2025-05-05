import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY)

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash"
})

const config = {
    temprature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 12000,
}

const courseOutlineConfig = {
    ...config,
    responseMimeType: "application/json"
}

const generateNotesConfig = {
    ...config,
    responseMimeType: "text/html"
}

export const courseOutlineAIModel = model.startChat({
    courseOutlineConfig,
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

export const generateNotesAIModel = model.startChat({
    generateNotesConfig,
    history: [
        {
            role: "user",
            parts: [{ text: `Generate exam material detail content for each chapter, Make sure to include all topic points in the content, Make sure to give content in HTML format(Do not ADD HTMLKL, Head, Body, Title tag), The chapters : {"chapterTitle": "Introduction to Node.js and JavaScript Fundamentals","chapterSummary": "This chapter covers the basics of Node.js, its environment, and essential JavaScript concepts needed for Node.js development.","topics": ["What is Node.js?","Setting up the Node.js environment"]}` }],
        },
        {
            role: "model",
            parts: [
                { text: `\`\`\`html<h3>Introduction to Node.js and JavaScript Fundamentals</h3><p>This chapter covers the basics of Node.js, its environment, and essential JavaScript concepts needed for Node.js development.</p><h4>What is Node.js?</h4><ul><li>Definition of Node.js and its purpose.</li><li>Explanation of the event-driven, non-blocking I/O model.</li><li>Comparison with other JavaScript runtimes (e.g., browsers).</li><li>Mention of the npm (Node Package Manager).</li><li>Use cases and applications of Node.js.</li></ul><h4>Setting up the Node.js environment</h4><ul><li>Downloading and installing Node.js from the official website.</li><li>Verifying the installation (checking the version).</li><li>Using a code editor (e.g., VS Code, Sublime Text).</li><li>Understanding the Node.js command-line interface (CLI).</li><li>Introduction to package.json (optional for this chapter, but briefly mention it).</li></ul>\`\`\`` }
            ],
        },
    ],
})
