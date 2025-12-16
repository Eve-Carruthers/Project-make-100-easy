#NeuroMap to make 100% easy
NeuroMap is an advanced, privacy-first learning platform that uses AI to transform any topic into interactive mind maps, adaptive flashcards, and personalized curriculums.
This repository contains the complete "Omni-Tool" edition, featuring all research-backed learning accelerators and premium tools.
## Key Features
### Core Learning Engine
• Interactive Mind Maps: Recursive, force-directed-style visualization of complex topics.
• Timeline Views: Automatically converts curriculum data into week-by-week Gantt charts.
• SM-2 Spaced Repetition: Scientifically optimized revision scheduling (Anki-style algorithm).
## Advanced Tools (All Included)
1. AI Quiz Builder: Generates multiple-choice assessments on-demand.
2. Voice Notes: Record audio feedback directly onto flashcards.
3. Teacher Radar: Real-time metrics to flag struggling students (simulated).
4. Streak Shields: Gamified protection against broken study streaks.
5. Parent Digest: Generates HTML progress reports for stakeholders.
6. Offline Resilience: Generates cloze-deletion cards when internet is unavailable.
## Installation
### Prerequisites
• Node.js (v16+)
• npm or yarn
• Google Gemini API Key
### Setup
1) Clone the repo
```
git clone [https://github.com/yourusername/neuromap.git](https://github.com/yourusername/neuromap.git)
cd neuromap
```
2) Install dependencies 
```
npm install
```
3) Config API Key
Open src/App.tsx and replace the apiKey variable with your Google Gemini API key.
(For production, move this to .env)
4) Run dev server 
```
npm run dev
```
## Tech stack
• Frontend Framework: React 18 + TypeScript + Vite
• Styling: Tailwind CSS + Lucide React Icons
• State Management: React Context + LocalStorage Persistence
• AI Provider: Google Gemini Pro (v1beta)
• Audio Engine: Native Web Audio API (MediaRecorder)
