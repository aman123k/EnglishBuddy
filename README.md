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

Create a `.env.local` file in the project root and define the required environment variables.  
At minimum, you’ll need your Google OAuth client ID:

```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
```

If your project requires additional environment variables (API URLs, keys, etc.), define them here as well following the same pattern.

### 3. Run the development server

Start the Next.js dev server:

```bash
npm run dev
# or
yarn dev
```

Then open `http://localhost:3000` in your browser.

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
      - `components/` – Core chat UI (e.g., `ChatScreen.tsx`, `Footer.tsx`, `UtilitySidebar.tsx`).
      - `voice/` – TTS utilities (`speak.ts`, `voicePack.ts`).
      - `hooks/` – Chat-specific hooks (e.g., `usePostMessage.ts`).
      - `data/` – Loading and voice animation JSON (`loading.json`, `voice_wave.json`, etc.).
    - `characters/` – Character-based conversation mode
      - `[character]/` – Dynamic character routes and components.
      - `data/charactersData.ts` – Metadata and configuration for available characters.
    - `debates/` – Debate-style practice mode.
    - `roleplays/` – Role-play conversation scenarios.
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
  - `UIKIT/` – Reusable UI elements and form controls (`AuthBtn.tsx`, `Input.tsx`, `PasswordInput.tsx`, `SelectField.tsx`).

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
