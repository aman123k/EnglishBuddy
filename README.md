# 🎓 Lingo — AI-Powered English Learning Platform (Client)

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-v5.0-bear?style=for-the-badge)](https://zustand-demo.pmnd.rs/)

> **Lingo Client** is a modern, responsive web app built with Next.js 16 (App Router), React 19, and TypeScript. It offers an interactive, multi-modal English learning workspace where users converse, debate, roleplay, practice voice fluency, and refine their grammar with AI tutors in real time.

---

## 📋 Table of Contents

- [✨ Core Features](#-core-features)
- [🎯 Learning Modes](#-learning-modes)
- [🖥️ Pages & Application Routes](#️-pages--application-routes)
- [📊 Progress & Analytics](#-progress--analytics)
- [💳 Subscription & Payments](#-subscription--payments)
- [🏗️ Project Structure](#️-project-structure)
- [🛠️ Tech Stack](#️-tech-stack)
- [🔐 Environment Variables](#-environment-variables)
- [🚀 Getting Started](#-getting-started)
- [📄 License](#-license)

---

## ✨ Core Features

- **🤖 AI English Tutor (Jennifer)**: Persona-adaptive English tutor that tailors vocabulary, complexity, and correction strictness based on the user's survey profile.
- **🎙️ Real-time Voice Input & Text-to-Speech**: Hands-free speech recognition (`react-speech-recognition`) and instant audio playback for listening comprehension (`Web Speech API`).
- **📝 Live Grammar Feedback Sidebar**: Real-time identification of grammatical errors, detailed explanations, and instant sentence corrections.
- **🌐 In-Context Translation**: Translate any AI response or user message into your native language with a single click.
- **🗂️ Multi-Session Chat Catalog**: Create, isolate, switch between, and clear individual conversation sessions without losing historical context.
- **🔑 Flexible Authentication**: Secure authentication via Email/Password, Google OAuth (`@react-oauth/google`), and GitHub OAuth.
- **📊 Comprehensive Learning Analytics**: Interactive progress dashboards, XP streak counters, weekly message activity graphs, accuracy meters, and a personal Grammar Notebook.
- **💳 Integrated Razorpay Subscriptions**: Native checkout for unlocking premium learning tiers and unlimited AI practice sessions.

---

## 🎯 Learning Modes

Lingo offers **9 specialized learning modes** designed for different language goals:

| Icon | Learning Mode | Route | Description |
| :--- | :--- | :--- | :--- |
| 💬 | **Natural Chats** | `/learning-modes/chat` | Conversational fluency practice with AI tutor Jennifer. Streaming responses and real-time grammar feedback. |
| 🎭 | **Character Dialogues** | `/learning-modes/characters` | Immersion practice with historical and famous personalities (e.g. Einstein, Shiva) with authentic speaking styles. |
| 🗣️ | **Intellectual Debates** | `/learning-modes/debates` | Argue opposing viewpoints on philosophical, social, and technical topics to build formal vocabulary and reasoning. |
| 🌍 | **Immersive Roleplays** | `/learning-modes/roleplays` | Practice real-world scenarios (booking hotels, job interviews, ordering food, retail shopping). |
| ✈️ | **Travel Scenarios** | `/learning-modes/travels` | Specialized travel English dialogues (airport check-in, customs control, taxi navigation, tourist assistance). |
| 💼 | **Business Coach** | `/learning-modes/business-coach` | Professional workplace communication, interview coaching, corporate pitch rehearsals, and business writing. |
| 📖 | **Co-Write Story** | `/learning-modes/co-write-story` | Collaborative creative storytelling with AI to expand narrative vocabulary and expressive writing skills. |
| ⚔️ | **Vocab Arena** | `/learning-modes/vocab-arena` | Gamified vocabulary challenges, flashcards, context usage quizzes, and speed drills. |
| 🎙️ | **Voice Practice Mode** | `/learning-modes/voice` | Dedicated hands-free spoken conversation mode with audio wave visualizer and immediate vocal feedback. |

---

## 🖥️ Pages & Application Routes

### 🏠 Dashboard (`/`)
- Personalized hero banner with daily motivational quotes and level progress.
- Quick stats widget: Current streak (days), Language level (Beginner → Advanced), Total XP earned.
- Interactive mode selection cards for direct access to all learning modes.
- Responsive persistent sidebar with navigation to Explore, Progress, Account, and Settings.

### 🔍 Explore (`/explore`)
- Content library for searching and filtering characters, debate topics, roleplays, and travel scenarios.
- Filter chips by category and keyword search bar for quick navigation.

### 📊 Progress (`/progress`)
- **Hero Level Banner**: Current English proficiency tier and progress bar to next level.
- **Streak & XP Counters**: Active consecutive days, peak streak record, total XP, total messages sent.
- **Weekly Activity Chart**: Day-by-day bar chart visualization of user participation.
- **Accuracy Gauge**: Visual gauge displaying average grammatical correctness score.
- **Mode Distribution**: Percentage pie breakdown of time spent across Chat, Characters, Debates, and Roleplays.
- **Grammar Notebook**: Searchable, expandable repository of all past grammatical errors, corrections, and rule explanations.

### 👤 Account (`/account`)
- Profile details modification (display name, avatar preview).
- Security settings: Password update, session management, account deletion.
- **Subscription Management**: View plan tier, renew or upgrade subscription via Razorpay.
- **Support Form**: Direct ticketing form for bug reporting and feedback submission.

### 🔐 Auth & Onboarding Routes
- **`/get-started`**: Account creation via email/password or Google OAuth / GitHub OAuth.
- **`/login`**: Secure user authentication page with auto-redirect for valid sessions.
- **`/survey`**: Onboarding wizard capturing native language, target level, learning goals, daily commitment target, and preferred learning style.
- **`/forgot-password`**: Email-based OTP verification and secure password reset flow.

---

## 💳 Subscription & Payments

Lingo integrates with **Razorpay** to offer flexible subscription plans:
- **Order Generation**: Requests Razorpay order ID from `/api/payment/order`.
- **Payment Gateway Modal**: Secure pop-up checkout handling cards, UPI, net banking, and wallets.
- **Payment Verification**: Cryptographic signature validation via `/api/payment/verify` to activate user subscription tier instantly.

---

## 🏗️ Project Structure

```
client/
├── app/
│   ├── (auth)/                # Auth routes (login, get-started, survey, forgot-password)
│   ├── account/               # User profile, security, payments & support
│   ├── explore/               # Searchable catalog of characters, debates, and scenarios
│   ├── learning-modes/        # 9 specialized AI learning mode implementations
│   │   ├── business-coach/
│   │   ├── characters/
│   │   ├── chat/
│   │   ├── co-write-story/
│   │   ├── debates/
│   │   ├── roleplays/
│   │   ├── travels/
│   │   ├── vocab-arena/
│   │   └── voice/
│   ├── progress/              # Analytics dashboard & Grammar Notebook
│   ├── components/            # Shared UI components (Sidebar, Navbar, Modals, Audio controls)
│   ├── hooks/                 # Custom React hooks (voice recognition, chat state)
│   ├── store/                 # Zustand state stores (auth store, chat store, user store)
│   ├── utils/                 # Helper functions and API client fetchers
│   ├── layout.tsx             # Root layout with global providers
│   └── page.tsx               # Main Dashboard page
├── public/                    # Static assets (images, icons, lottie animations)
├── .env                       # Environment variables
├── next.config.ts             # Next.js configuration
├── package.json               # Dependencies & scripts
├── tailwind.config.js         # Tailwind CSS styling configuration
└── tsconfig.json              # TypeScript configuration
```

---

## 🛠️ Tech Stack

- **Core Framework**: Next.js 16 (App Router), React 19, TypeScript 5
- **Styling**: Tailwind CSS v4, PostCSS, Lucide React, React Icons
- **State Management**: Zustand v5
- **Data Fetching & Caching**: TanStack React Query v5
- **OAuth & Auth**: `@react-oauth/google`, GitHub OAuth Client
- **Voice & Audio Processing**: `react-speech-recognition`, Web Speech API (Text-to-Speech)
- **Animations**: `lottie-react`, Framer Motion / CSS keyframes
- **UI Notifications**: `react-hot-toast`

---

## 🔐 Environment Variables

Create a `.env` file in the `client/` root folder:

```env
# Backend API Base URL
NEXT_PUBLIC_API_URL=http://localhost:8080

# OAuth Credentials
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
NEXT_PUBLIC_GITHUB_CLIENT_ID=your-github-client-id

# Client Key Tokens
TOKEN_KEY=your_client_token_key
NEXT_PUBLIC_GOOGLE_API_KEY=your-google-api-key
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18.0.0 or higher
- npm / yarn / pnpm
- Running [Lingo Backend Server](../server/README.md) at `http://localhost:8080`

### Installation

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in `.env`.

4. Start the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

- `npm run dev` — Launches Next.js dev server with hot reload on port 3000.
- `npm run build` — Builds production-ready optimized bundle.
- `npm start` — Runs compiled production build.
- `npm run lint` — Runs ESLint code quality checks.

---

## 📄 License

This project is licensed under the **ISC License**.
