# EnglishTutor (Lingo)

Your friendly companion for mastering English, one conversation at a time.

## Description

This is a Next.js application designed to help users improve their English speaking skills through interactive conversations with an AI. It offers features like chat history, real-time translation of AI messages, and personalized feedback to enhance the learning experience.

## Features

- **User Authentication:** Secure login using Google OAuth.
- **Interactive Chat Interface:** Engage in real-time conversations with an AI model.
- **Chat History:** Seamlessly load and view past conversations with pagination.
- **AI Message Translation:** Translate AI messages into your preferred language for better understanding.
- **Voice Playback:** Listen to AI messages with text-to-speech functionality.
- **Responsive Design:** Enjoy a consistent experience across various devices, from desktop to mobile.
- **Global State Management:** Efficient state management using Zustand for user data, chat messages, and UI elements.

## Technologies Used

- [Next.js](https://nextjs.org/): React framework for building full-stack web applications.
- [React](https://react.dev/): JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/): Typed superset of JavaScript that compiles to plain JavaScript.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapid UI development.
- [Zustand](https://zustand-store.netlify.app/): A small, fast, and scalable bear-necessities state-management solution.
- [React Query](https://tanstack.com/query/latest): Powerful asynchronous state management for React.
- [Lottie](https://lottiefiles.com/): For rendering engaging animations.
- Google OAuth: For secure user authentication.

## Setup

Follow these steps to set up and run the project locally.

### 1. Installation

Clone the repository and install the dependencies:

```bash
npm install
# or
yarn install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory of the project and add your Google OAuth client ID:

```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
```

### 3. Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure (Client-side)

Below is an overview of the key directories and files on the client-side:

- `app/`: Contains the main application logic, including pages, reusable components, and custom hooks.
  - `(auth)/`: Houses authentication-related pages and components (e.g., login, forgot password, get started, survey).
  - `components/`: General reusable UI components (e.g., `Sidebar.tsx`).
  - `hooks/`: Custom React hooks for various functionalities, such as authentication (`useAuth.ts`), API requests (`useGetAPIRequest.ts`, `usePostAPIRequest.ts`), and Google authentication (`useGoogleAuth.ts`).
  - `interface/`: Defines TypeScript interfaces for data structures used throughout the application, like `messageInterface.tsx` for chat messages.
  - `learning-modes/`: Contains different learning modes, with `chat/` being a prominent one.
    - `chat/`: Specific components and logic related to the chat learning mode.
      - `components/`: Includes core chat UI components such as `ChatScreen.tsx` (displays messages), `Header.tsx` (chat header), `Footer.tsx` (message input), and `UtilitySidebar.tsx` (for translations or information).
      - `voice/`: Contains functionality for text-to-speech (`speak.ts`).
  - `store/`: Manages global application state using Zustand (`store.ts`), including user information, chat messages, and UI sidebar state.
  - `UIKIT/`: A collection of basic UI components (e.g., `AuthBtn.tsx`, `Input.tsx`, `PasswordInput.tsx`).
- `public/`: Stores static assets such as images (e.g., `Images/` folder).
- `globals.css`: Global CSS styles for the application.
- `tailwind.config.js`: Tailwind CSS configuration.
- `tsconfig.json`: TypeScript configuration.
