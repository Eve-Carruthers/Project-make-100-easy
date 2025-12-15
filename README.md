# Project-make-100-easy
NeuroMap: Omni-Tool Edition (v4.0.0)

NeuroMap is a comprehensive, AI-powered cognitive mapping and spaced-repetition learning platform. It transforms raw topics or curriculum data into interactive mind maps, lesson plans, and adaptive flashcards using Google's Gemini API.

This "Omni-Tool" edition consolidates research-backed learning techniques (SM-2 algorithms, active recall, dual coding) into a single, offline-capable React application.

🚀 Key Features

🧠 Knowledge Visualisation

Recursive Mind Maps: Visualises complex hierarchies using a custom SVG+DFS layout engine.

Timeline / Gantt View: Automatically converts curriculum data into week-by-week timeline columns.

AI Auto-Generation: Instantly builds knowledge graphs from simple text prompts using Gemini 2.5 Flash.

⚡ Adaptive Study Engine

SM-2 Spaced Repetition: Implements the Anki algorithm (Ease Factor, Interval) to optimise review schedules.

Voice Notes: Record and attach audio feedback directly to flashcards using the Web Audio API.

Snooze & Streak Protection: Flexible scheduling tools to maintain learner motivation.

Teacher Radar: Real-time metrics that flag struggling students (simulated for client-side demo).

🛠️ Assessment & Tools

AI Quiz Builder: Generates on-demand multiple-choice assessments from specific nodes.

Parent Digest: Generates HTML email summaries of learner progress.

Resilience: Offline fallback mode generates cloze-deletion cards when the internet is unavailable.

🛠️ Technical Stack

Frontend: React 18, TypeScript

Styling: Tailwind CSS

Icons: Lucide React

AI Provider: Google Gemini API (v1beta)

Persistence: LocalStorage (Schema Versioned)

Audio: Native MediaRecorder API

📦 Installation & Setup

Prerequisites

Node.js (v16+)

npm or yarn

A Google Gemini API Key

Steps

Clone the repository:

git clone [https://github.com/yourusername/neuromap.git](https://github.com/yourusername/neuromap.git)
cd neuromap


Install dependencies:

npm install lucide-react tailwindcss clsx tailwind-merge


Configure API Key:
Open App.tsx and locate the apiKey constant at the top of the file:

const apiKey = "YOUR_GEMINI_API_KEY_HERE";


(Note: For production deployment, move this to an environment variable .env file).

Run the application:

npm run dev


🏗️ Architecture Overview

Data Model

The application uses a singular DocumentData interface that supports two distinct view modes based on the content type:

Type

Visualization

Description

mindmap

Recursive Tree

Standard topic/subtopic breakdown using SVG connectors.

curriculum

Timeline View

Gantt-style columns based on targetDate properties.

Component Hierarchy

AppController: Main shell handling routing (Dashboard vs. Editor) and global state.

MindMapCanvas: A memoised component that calculates node positions using Depth-First Search (DFS) to render the tree without external graphing libraries.

RevisionMode: The study engine containing the SM-2 algorithm logic, voice recording, and card flipping mechanics.

QuizPanel: Handles the generation, rendering, and grading of AI assessments.

🤝 Contributing

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License

Distributed under the MIT License. See LICENSE for more information.
