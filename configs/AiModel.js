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
            parts: [{ text: "Generate a study material for topic OOPS in PHP: for Coding Prep: and level of difficulty will be Moderate with summary of course, Topic and Difficulty Level, List of Chapters (Max 3) along with Summary and Chapter Emoji icon for each chapter, Topic list in each chapter, All results in JSON format." }],
        },
        {
            role: "model",
            parts: [{ text: `\`\`\`json{"courseSummary": "This course covers Object-Oriented Programming (OOP) concepts in PHP, focusing on the aspects most relevant to coding interviews at a moderate difficulty level.  It emphasizes practical application and problem-solving.","courseTopic": "OOP in PHP for Coding Prep","difficultyLevel": "Moderate","chapters": [{"chapterTitle": "Core OOP Principles in PHP","chapterSummary": "Understanding the fundamental concepts of OOP: classes, objects, inheritance, polymorphism, and encapsulation.  This chapter lays the groundwork for more advanced topics.","chapterEmoji": "🧱","topics": ["Classes and Objects","Constructors and Destructors","Properties and Methods","Access Modifiers (public, protected, private)","Encapsulation","Inheritance (extends keyword)","Polymorphism (method overriding)"]},{"chapterTitle": "Advanced OOP Concepts","chapterSummary": "This chapter explores more advanced OOP features such as abstract classes, interfaces, and static methods.  It also introduces the concept of namespaces.","chapterEmoji": "💡","topics": ["Abstract Classes","Interfaces","Static Methods and Properties","Namespaces","Magic Methods (__construct, __destruct, __get, __set, etc.)","Traits"]},{"chapterTitle": "OOP and Design Patterns (Introduction)","chapterSummary": "This chapter introduces the concept of design patterns and covers a few commonly used simple design patterns that are frequently seen in coding interview questions.","chapterEmoji": "✨","topics": ["Introduction to Design Patterns","Common Design Patterns (e.g., Singleton, Factory)","Applying OOP principles to solve coding problems","SOLID principles (brief overview)"]}}\`\`\`` }],
        },
    ],
})

export const generateNotesAIModel = model.startChat({
    generateNotesConfig,
    history: [
        {
            role: "user",
            parts: [{ text: `Generate exam material detail content for each chapter, Make sure to include all topic points in the content alaong with Emoji, Make sure to give content in HTML format(Do not ADD HTML, Head, Body, Title tag), The chapters:{"chapterTitle": "Core OOP Principles in PHP","chapterSummary": "Understanding the fundamental concepts of OOP: classes, objects, inheritance, polymorphism, and encapsulation.  This chapter lays the groundwork for more advanced topics.","chapterEmoji": "🧱","topics": ["Classes and Objects","Constructors and Destructors","Properties and Methods","Access Modifiers (public, protected, private)","Encapsulation","Inheritance (extends keyword)","Polymorphism (method overriding)"]}` }],
        },
        {
            role: "model",
            parts: [{ text: `\`\`\`html<h3>🧱 Core OOP Principles in PHP</h3><p>Understanding the fundamental concepts of OOP: classes, objects, inheritance, polymorphism, and encapsulation. This chapter lays the groundwork for more advanced topics.</p><h4>Classes and Objects 👨‍💻</h4><ul><li>Defining classes using the <code>class</code> keyword. 📝</li><li>Creating objects (instances) of a class using the <code>new</code> keyword. 👶</li><li>Understanding the relationship between classes and objects. 🔗</li></ul><h4>Constructors and Destructors 🛠️</h4><ul><li>Defining constructors using the <code>__construct()</code> method.  🏗️</li><li>Initializing object properties within the constructor. ✨</li><li>Defining destructors using the <code>__destruct()</code> method. 💥</li><li>Cleaning up resources in the destructor. 🧹</li></ul><h4>Properties and Methods ⚙️</h4><ul><li>Declaring properties (variables) within a class.</li><li>Defining methods (functions) within a class.</li><li>Accessing properties and methods using the object operator (<code>-></code>). 👉</li></ul><h4>Access Modifiers (public, protected, private) 🔒</h4><ul><li>Understanding the scope and visibility of properties and methods. 👀</li><li>Using <code>public</code>, <code>protected</code>, and <code>private</code> keywords.  🔑</li><li>Encapsulation and data hiding. 🛡️</li></ul><h4>Encapsulation 📦</h4><ul><li>Bundling data (properties) and methods that operate on that data within a class. 🎁</li><li>Protecting data integrity through access modifiers. 💪</li><li>Benefits of encapsulation: code maintainability, reusability, and security. 👍</li></ul><h4>Inheritance (extends keyword) 👪</h4><ul><li>Creating new classes based on existing classes using the <code>extends</code> keyword.</li><li>Understanding parent and child classes.</li><li>Overriding parent class methods in child classes.</li></ul><h4>Polymorphism (method overriding) 🔄</h4><ul><li>The ability of objects of different classes to respond to the same method call in their own specific way.</li><li>Achieving polymorphism through method overriding.</li><li>Illustrative examples of polymorphism.</li></ul>\`\`\`` }],
        },
    ],
})
