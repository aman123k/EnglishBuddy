# Lingo — AI-Powered English Learning Platform

**Lingo** is a web application that helps you improve your English through real conversations with AI. Instead of doing grammar drills or watching videos, you actually *talk* — you chat, debate, roleplay real situations, and speak with famous personalities, all in English, with an AI that listens, responds, and helps you get better.

---

## 📋 Table of Contents

- [What is Lingo?](#what-is-lingo)
- [How It Works](#how-it-works)
- [Pages & Screens](#pages--screens)
- [Learning Modes](#learning-modes)
- [Progress Tracking](#progress-tracking)
- [Account & Settings](#account--settings)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [Tech Stack](#tech-stack)

---

## 🌟 What is Lingo?

Lingo is built around one idea: **the best way to learn a language is to use it**. Every feature on the platform is designed to get you speaking and writing in English as much as possible, with AI that gives you instant feedback, corrections, and encouragement.

When you sign up, Lingo asks you a short survey about your level, your goals, and how you like to learn. From that point on, everything is personalized — the AI tutor knows who you are, what you're working on, and adjusts its responses to match your level.

---

## 🔄 How It Works

1. **Sign up** with your email or Google account
2. **Complete the onboarding survey** — tell Lingo your English level, why you're learning, and how often you want to practice
3. **Pick a learning mode** from the dashboard — chat, debate, character dialogue, or roleplay
4. **Start a conversation** — type or speak your message, and get an AI response in seconds
5. **Get feedback** — the grammar feedback sidebar shows corrections and explanations for your mistakes in real time
6. **Track your progress** — check your XP, streak, accuracy score, and grammar notebook on the Progress page

---

## 🖥 Pages & Screens

### 🏠 Dashboard (Home)

The main screen you see after logging in. It shows:

- **Your stats** — current streak (how many days in a row you've practiced), your language level, and your total XP
- **A hero section** — highlighted content or a motivational banner
- **Four learning mode cards** — Natural Chats, Intellectual Debates, Character Dialogues, and Immersive Roleplays — each linking directly to that mode

The layout has a persistent **sidebar** on the left (or bottom on mobile) with navigation links to all sections of the app.

---

### 💬 Natural Chats (`/learning-modes/chat`)

This is your main conversation space with **Jennifer**, Lingo's AI English tutor. Jennifer knows your name, your level, your goals, and your learning style from the onboarding survey. She adapts her vocabulary, tone, and complexity to match where you are.

You can:
- Type messages and receive streaming AI responses (text appears word by word, like a real chat)
- **Use voice input** — click the microphone and speak instead of type
- **Hear AI responses read aloud** — tap the speaker icon on any message for text-to-speech playback
- **Translate any message** — click the translate icon on a message to see it in your preferred language
- Open the **Grammar Feedback sidebar** — Jennifer quietly reviews your messages and highlights mistakes, explains what went wrong, and shows the corrected version
- **Start a new session** without losing your previous conversations — sessions are saved separately and you can browse through your history
- **Delete old sessions** you no longer need

---

### 🎭 Character Dialogues (`/learning-modes/characters`)

Choose a famous personality or historical figure to talk with. Lingo has characters like **Einstein, Shiva, and many others** — each with their own personality, backstory, and way of speaking.

This mode is great for:
- Practising English in a more narrative, storytelling context
- Getting exposure to different vocabulary and speaking styles
- Making learning fun by immersing yourself in a character's world

When you enter this mode, you first see a **grid of available characters** with images and descriptions. Pick one and a dedicated chat opens, exactly like the Natural Chat but with the chosen character's personality guiding the conversation.

---

### 🗣 Intellectual Debates (`/learning-modes/debates`)

Pick a debate topic and argue your point of view against the AI. The AI takes the opposing side and challenges your reasoning.

This mode helps you:
- Build confidence expressing complex ideas in English
- Learn how to structure arguments and counterarguments
- Use more formal and academic English vocabulary
- Practice thinking on your feet

Topics range from social issues to science and philosophy. Like character mode, you start by browsing a list of debate topics, then enter the debate chat.

---

### 🌍 Immersive Roleplays (`/learning-modes/roleplays`)

Step into real-world scenarios and practice the English you actually need day-to-day. Scenarios include things like:

- Booking a hotel room
- Ordering food at a restaurant
- Going through a job interview
- Asking for directions
- Shopping at a store

The AI plays the other person in the scenario (the hotel receptionist, the interviewer, etc.) and the conversation stays within that context. It's designed to feel as close to a real situation as possible, so the English you practice here is immediately useful in real life.

---

### 🔍 Explore (`/explore`)

A browsable library of everything available on the platform. You can:

- **Search** for a specific character, debate topic, or roleplay scenario by name
- **Filter by category** — Characters, Debates, Daily Scenarios, or view All
- Click directly into any item to start a session

The Explore page is great for discovering new content and deciding what to practice next.

---

### 📊 Progress (`/progress`)

Your personal learning dashboard. Everything here is calculated from your actual activity on the platform.

**What you can see:**

| Section | What it shows |
|---|---|
| **Hero Stats** | Your language level, learning goal, total XP earned, this week's XP, and your progress towards the next fluency level |
| **Stats Overview** | Current streak, longest streak ever, total XP, and total messages sent |
| **Weekly Activity Chart** | A bar chart showing how many messages you sent each day over the past week |
| **Accuracy Gauge** | A circular gauge showing your overall grammar accuracy score |
| **Modes Distribution** | A breakdown (%) of how much time you've spent in each learning mode — chat, character, debate, roleplay |
| **Grammar Notebook** | A log of every grammar mistake you've made across all sessions, with the original sentence, the corrected version, and an explanation |

You can also **set a weekly XP goal** (Casual / Regular / Intensive / Insane) and see how close you are to hitting it this week.

---

### 👤 Account (`/account`)

Manage your profile and account settings:

- **Edit your name** and profile picture (uploaded via Cloudinary)
- **Change your password**
- **Delete your account** permanently
- **Contact support** — submit a support request with a subject and description if you run into any problems

---

## 🔐 Authentication Screens

### Get Started (`/get-started`)
The landing page for new users. Sign up with your email and a password, or use **Continue with Google** for one-click sign-up.

### Login (`/login`)
Sign in with email/password or Google. If you've previously signed in with Google, you'll be automatically redirected.

### Survey (`/survey`)
After creating your account, you complete a short multi-step survey before accessing the app. This is how Lingo personalises everything for you. Questions include:

- What is your current English level? (Beginner → Advanced)
- What is your main learning goal? (e.g. travel, business, exams)
- Why are you learning English?
- How do you prefer to learn? (visual, reading/writing, etc.)
- Your age group
- Which language should translations be shown in?
- How often do you plan to practice?

### Forgot Password (`/forgot-password`)
Enter your email to receive a one-time password (OTP) by email. Enter the OTP on the next screen and you can set a new password.

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- The [Lingo server](../server/README.md) must be running

### Installation

```bash
cd client
npm install
```

### Environment Variables

Create a `.env` file inside the `client/` folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

- `NEXT_PUBLIC_API_URL` — the URL where the Lingo server is running
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` — your Google OAuth client ID (from [Google Cloud Console](https://console.cloud.google.com/))

---

## 🏃 Running the App

```bash
# Development (with hot reload)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
# Production build
npm run build
npm start
```

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Global State | Zustand v5 |
| Data Fetching | TanStack React Query v5 |
| Google OAuth | `@react-oauth/google` |
| Voice Input | React Speech Recognition |
| Text-to-Speech | Web Speech API |
| Icons | Lucide React, React Icons |
| Animations | Lottie React |
| Notifications | React Hot Toast |
| Fonts | Nunito Sans, Roboto, Poppins |

---

## 📄 License

ISC

---

For questions or issues, please open an issue in the repository.
