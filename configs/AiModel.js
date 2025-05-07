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

const jsonResultConfig = {
    ...config,
    responseMimeType: "application/json"
}

const htmlResultConfig = {
    ...config,
    responseMimeType: "text/html"
}

export const courseOutlineAIModel = model.startChat({
    jsonResultConfig,
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
    htmlResultConfig,
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

export const generateFlashcardAIModel = model.startChat({
    jsonResultConfig,
    history: [
        {
            role: "user",
            parts: [{ text: `Generate the flashcard on topic : Flutter Fundamentals, User Interface (UI) Development, Basic App Navigation in JSON format with front back content, Maximum 15.` }],
        },
        {
            role: "model",
            parts: [{ text: `\`\`\`json[{"front": "What is a Widget in Flutter?","back": "A Widget is the fundamental building block of Flutter UI.  Everything you see on the screen is a Widget, including layouts, text, images, and even the app itself."},{"front": "What are the two main types of Widgets?","back": "StatelessWidget and StatefulWidget. StatelessWidgets don't change their state, while StatefulWidgets can update their UI based on changes."},{"front": "Explain the difference between StatelessWidget and StatefulWidget.","back": "StatelessWidget is immutable; its UI is built only once. StatefulWidget is mutable; its UI can be updated based on internal state changes."},{"front": "What is the purpose of a BuildContext?","back": "BuildContext provides information about a Widget's position within the widget tree, allowing access to services and parent widgets."},{"front": "Name three common layout widgets.","back": "Row, Column, and Stack are commonly used to arrange widgets horizontally, vertically, and overlapping, respectively."},{"front": "How do you create a simple Text widget?","back": " \`Text('Hello, Flutter!')\`"},{"front": "What widget is commonly used for displaying images?","back": "Image.asset() or Image.network()"},{"front": "What is the purpose of a MaterialApp widget?","back": "MaterialApp provides a Material Design theme and structure to your Flutter app. It's typically the root widget."},{"front": "How do you navigate to a new screen using Navigator?","back": "Use \`Navigator.push(context, MaterialPageRoute(builder: (context) => NewScreen()));\`"},{"front": "How do you return data from a new screen after navigation?","back": "Use \`Navigator.pop(context, returnedData);\` to pop the current route and pass data back."},{"front": "What is a Route in Flutter?","back": "A route represents a screen in your app's navigation stack.  It's managed by the Navigator."},{"front": "What is the purpose of \`Scaffold\`?","back": "Scaffold provides a basic visual layout structure for your app, including AppBar, body, and bottomNavigationBar."},{"front": "How to handle user interactions like button clicks?","back": "Use \`onPressed\` property within a button widget to define a function to execute on click."},{"front": "What is a key and when do you need it?","back": "Keys help Flutter identify widgets across rebuilds, preventing unnecessary re-renders, especially useful in dynamic lists or animations."},{"front": "What is the difference between \`setState()\` and \`rebuild()\`?","back": "\`setState()\` triggers a rebuild of the StatefulWidget. \`rebuild()\` is called internally by Flutter when state changes."}]\`\`\`` }],
        },
    ],
})

export const generateQuizAIModel = model.startChat({
    jsonResultConfig,
    history: [
        {
            role: "user",
            parts: [{ text: `Generate Quiz on topic : Flutter Fundamentals, User Interface (UI) Development, Basic App Navigation with Question and Options along with correct answer in JSON format (Max 10).` }],
        },
        {
            role: "model",
            parts: [{ text: `\`\`\`json{"quizTitle": "Flutter Fundamentals & UI Navigation Quiz","questions": [{"question": "What is the fundamental building block of a Flutter UI?","options": ["Widget", "Layout", "View", "Activity"],"correctAnswer": "Widget"},{"question": "Which widget is used to arrange children in a column?","options": ["Row", "Column", "Stack", "Container"],"correctAnswer": "Column"},{"question": "What is the purpose of the \`Scaffold\` widget?","options": ["Provides basic material design layout structure", "Handles state management", "Performs network requests", "Manages app navigation"],"correctAnswer": "Provides basic material design layout structure"},{"question": "Which widget is best suited for displaying a list of items that can be scrolled?","options": ["ListView", "GridView", "Column", "Row"],"correctAnswer": "ListView"},{"question": "How do you navigate to a new route in Flutter?","options": ["\`Navigator.push(context, MaterialPageRoute(...))\`", "\`startActivity(...)\`", "\`gotoRoute(...)\`", "\`changeRoute(...)\`"],"correctAnswer": "\`Navigator.push(context, MaterialPageRoute(...))\`"},{"question": "What is the purpose of a \`BuildContext\`?","options": ["To manage application state", "To provide information about the location of a widget in the widget tree", "To handle user input", "To store application data"],"correctAnswer": "To provide information about the location of a widget in the widget tree"},{"question": "Which widget is used to create a simple button in Flutter?","options": ["IconButton", "TextButton", "ElevatedButton", "All of the above"],"correctAnswer": "All of the above"},{"question": "What does \`setState()\` do?","options": ["Changes the app theme", "Triggers a rebuild of the widget tree", "Handles navigation", "Manages app lifecycle"],"correctAnswer": "Triggers a rebuild of the widget tree"},{"question": "Which widget is used for creating a text field for user input?","options": ["TextField", "Text", "Container", "Input"],"correctAnswer": "TextField"},{"question": "What is the difference between \`StatelessWidget\` and \`StatefulWidget\`?","options": ["\`StatelessWidget\` doesn't change its state, while \`StatefulWidget\` does.", "\`StatelessWidget\` handles user input, \`StatefulWidget\` does not.", "\`StatefulWidget\` is faster than \`StatelessWidget\`.", "There is no difference."],"correctAnswer": "\`StatelessWidget\` doesn't change its state, while \`StatefulWidget\` does."}]}\`\`\`` }],
        },
    ],
})
