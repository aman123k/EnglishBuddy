# EnglishTutor (Lingo)

Your friendly companion for mastering English, one conversation at a time.

## Overview

EnglishTutor (Lingo) is a Next.js application that helps users improve their English speaking and communication skills through interactive, AI-powered practice.  
It combines real-time chat, character-based roleplays, debates, and guided scenarios to create an engaging, adaptive learning experience.

## Core Features

- **Authentication & Onboarding**
  - Secure login via **Google OAuth**.
  - Guided onboarding and survey flow to understand the learner’s goals and level.
- **Interactive Chat Practice**
  - Real-time conversation with an AI tutor.
  - Support for multiple learning modes (free chat, roleplays, debates, and character conversations).
  - Chat history loading so users can revisit previous conversations.
- **Voice & Accessibility**
  - **Text-to-Speech (TTS)** playback for AI messages.
  - Visual loading and voice wave animations for a smooth UX.
- **Personalization**
  - Survey-driven personalized learning plans.
  - Character-based conversations (e.g., historical figures, fictional characters) for varied contexts.
- **Modern UI & State Management**
  - Fully responsive UI built with Tailwind CSS.
  - Global state managed with **Zustand**.
  - Data fetching and caching handled via **React Query (TanStack Query)**.

## Tech Stack

- [Next.js](https://nextjs.org/) – App Router–based React framework.
- [React](https://react.dev/) – UI library.
- [TypeScript](https://www.typescriptlang.org/) – Static typing for safer code.
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first styling.
- [Zustand](https://zustand-store.netlify.app/) – Lightweight global state management.
- [React Query](https://tanstack.com/query/latest) – Server state management and caching.
- [Lottie](https://lottiefiles.com/) – Animations and visual feedback.
- **Google OAuth** – User authentication.

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Install dependencies

From the project root:

```bash
npm install
# or
yarn install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root and define the required environment variables:

```bash
# Google OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID

# API Configuration
NEXT_PUBLIC_API_URL=YOUR_API_BASE_URL
```

**Required variables:**

- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` – Your Google OAuth client ID for authentication.
- `NEXT_PUBLIC_API_URL` – Base URL for your backend API (used by all API hooks for fetching data and sending messages).

### 3. Run the development server

Start the Next.js dev server:

```bash
npm run dev
# or
yarn dev
```

Then open `http://localhost:3000` in your browser.

## Learning Modes Architecture

All learning modes (Chat, Characters, Debates, Roleplays) follow a consistent pattern:

1. **Listing Pages** (`page.tsx`) – Display a grid of available options (characters, debate topics, roleplay scenarios) fetched from the API.
2. **Detail Pages** (`[id]/page.tsx`) – Load a specific item and render the `MainContentSection` component with chat functionality.
3. **Shared Components** – All modes use the same reusable components:
   - `MainContentSection` – Wraps the chat interface
   - `ChatScreen` – Displays messages with pagination
   - `Footer` – Handles user input (text/voice)
   - `Header` – Shows tutor info and controls
   - `CardGrid` – Renders clickable cards for navigation

This architecture ensures consistency across all learning experiences while allowing each mode to have its own API endpoints and data structure.

## Project Structure (Client)

High-level overview of the main client-side structure, with a focus on the `app/` directory (Next.js App Router):

- `app/` – Main application entry and route tree.

  - `page.tsx` – Root landing page.
  - `layout.tsx` – Root layout (providers, global shells, etc.).
  - `providers.tsx` – Global providers (React Query, Zustand wrappers, etc.).
  - `globals.css` – Global styles and Tailwind layers.
  - `(auth)/` – Authentication and onboarding flows:
    - `login/`, `forgot-password/`, `get-started/`, `survey/`, `callback/` – Auth pages and survey / onboarding journey.
  - `learning-modes/` – All learning experiences:
    - `chat/` – Real-time chat practice
      - `page.tsx` – Chat mode entry page that wires up the shared layout.
    - `characters/` – Character-based conversation mode
      - `page.tsx` – Character grid listing all available characters (fetches from `/api/allCharacter`).
      - `[character]/page.tsx` – Dynamic character route that loads a specific character and opens the chat experience scoped to that character.
    - `debates/` – Debate-style practice mode
      - `page.tsx` – Debate topics grid listing all available debates (fetches from `/api/allDebates`).
      - `[debates]/page.tsx` – Dynamic debate route that loads a specific debate topic and opens the chat experience for that debate.
    - `roleplays/` – Role-play conversation scenarios
      - `page.tsx` – Roleplay scenarios grid listing all available roleplays (fetches from `/api/allRoleplays`).
      - `[roleplays]/page.tsx` – Dynamic roleplay route that loads a specific scenario and opens the chat experience for that roleplay.
    - `components/` – Shared learning-mode UI components:
      - `MainContentSection.tsx` – Main chat layout wrapper (header + chat history + footer). Automatically closes utility sidebar on unmount.
      - `ChatScreen.tsx` – Scrollable chat history view with message rendering, replay, and translation features.
      - `Footer.tsx` – Chat input form with text input, voice recognition (mic), and send functionality.
      - `Header.tsx` – Shared header component with navigation, tutor avatar, and TTS toggle controls.
      - `CardGrid.tsx` – Generic grid component for displaying clickable learning cards (characters, debates, roleplays).
      - `CommonSidebar.tsx` – Static informational sidebar for learning mode descriptions.
      - `CommonSidebarLayout.tsx` – Dynamic utility sidebar for translations and information, controlled by global store.
    - `hooks/` – Learning-mode specific hooks:
      - `useChatHistory.ts` – Manages chat history fetching, pagination, auto-scroll, and translation functionality.
      - `usePostMessage.ts` – Handles sending messages to the API with React Query mutations.
    - `voice/` – Text-to-Speech utilities:
      - `speak.ts` – TTS functions for AI message playback.
      - `voicePack.ts` – Voice configuration and settings.
    - `function/` – Utility functions:
      - `toggleTts.ts` – Toggle text-to-speech on/off and persist to localStorage.
    - `data/` – Static data and animations:
      - `loading.json`, `chatsLoading.json` – Lottie loading animations.
      - `voice_wave.json` – Voice wave animation for active speech recognition.
  - `account/` – User account area:
    - `page.tsx` – Account dashboard / entry point.
    - `components/` – Profile and account UI (e.g., `ProfileSidebar.tsx`, `Header.tsx`, `Container.tsx`).
  - `components/` – Shared, app-level components such as `Sidebar.tsx` and common headers/sidebars.
  - `hooks/` – Cross-cutting hooks:
    - `useAuth.ts` – Authentication state and utilities.
    - `useGetAPIRequest.ts`, `usePostAPIRequest.ts`, `useDeleteAPIRequest.ts` – Generic API hooks.
    - `useGoogleAuth.ts` – Google OAuth integration helper.
  - `interface/` – Shared TypeScript interfaces and types (messages, cards, UI models, etc.).
  - `constants/` – Reusable constants such as chat system messages.
  - `queryKeys/` – Centralized React Query key definitions.
  - `store/` – Zustand store configuration (`store.ts`) for user, chat, and UI state.
  - `UIKIT/` – Reusable UI elements and form controls:
    - `AuthBtn.tsx`, `Input.tsx`, `PasswordInput.tsx`, `SelectField.tsx` – Common form components.
    - `GeneralAvatar.tsx` – Generated avatar (initials + deterministic color) for tutors/users.
    - `Loader.tsx` – Centered Lottie loader used across chat and characters.

- `public/` – Static assets (images, illustrations, character avatars, logos).
- `tailwind.config.js` – Tailwind CSS configuration.
- `tsconfig.json` – TypeScript compiler configuration.

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Commit your changes with clear, descriptive messages.
4. Open a pull request describing the change and how to test it.

## License

This project is currently intended for internal / personal use.  
If you plan to use it in production or redistribute it, please add an explicit license file that matches your requirements.
