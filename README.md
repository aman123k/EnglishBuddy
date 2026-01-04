# EnglishTutor (Lingo) 🗣️

[![Next.js](https://img.shields.io/badge/Next.js-15.0+-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0+-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

Your friendly companion for mastering English, one conversation at a time.

## 🌟 Overview

EnglishTutor (Lingo) is a cutting-edge Next.js application that revolutionizes English language learning through interactive, AI-powered conversations. Designed with modern web technologies, it creates an immersive learning environment where users can practice speaking, listening, reading, and writing skills through multiple engaging modes.

### 🎯 What Makes It Special

- **AI-Powered Conversations**: Real-time chat with intelligent AI tutors that adapt to your learning level
- **Multi-Modal Learning**: Four distinct learning modes catering to different practice styles
- **Voice Integration**: Built-in text-to-speech and speech recognition for authentic conversation practice
- **Personalized Experience**: Survey-driven onboarding creates customized learning paths
- **Character-Based Learning**: Engage with historical figures and fictional characters for contextual practice

## 🚀 Key Features

### 🔐 Authentication & User Management

- **Google OAuth Integration**: Secure, seamless login with Google accounts
- **Personalized Onboarding**: Interactive survey system that assesses user goals and proficiency levels
- **User Profile Management**: Comprehensive account dashboard with progress tracking

### 💬 Interactive Learning Modes

#### **Free Chat Practice**

- Real-time conversations with AI tutor "Jennifer"
- Natural language processing for contextual responses
- Grammar correction and vocabulary suggestions
- Conversation history with pagination support

#### **Character Conversations**

- Engage with 25+ famous historical and fictional characters
- Contextual learning through role-based scenarios
- Characters include: Albert Einstein, Cleopatra, Elon Musk, Wonder Woman, and more
- Dynamic character selection with API-driven content

#### **Debate Arena**

- Argue for or against controversial topics
- Critical thinking and argumentation skills development
- Structured debate formats with clear objectives
- Topic variety covering social, ethical, and contemporary issues

#### **Roleplay Scenarios**

- Real-world conversation practice (job interviews, ordering food, travel situations)
- Scenario-based learning with practical applications
- Cultural context integration for authentic experiences

### 🎤 Voice & Accessibility Features

- **Text-to-Speech Integration**: High-quality voice synthesis for AI responses
- **Speech Recognition**: Voice input capability for hands-free practice
- **Visual Feedback**: Lottie animations and voice wave indicators
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🎯 Personalization & Progress Tracking

- **Adaptive Learning Paths**: AI-driven content recommendations based on user performance
- **Survey-Driven Customization**: Initial assessment creates tailored learning experiences
- **Progress Analytics**: Track improvement across different skills and modes
- **Chat History Management**: Persistent conversation storage with search functionality

### 🛠️ Technical Excellence

- **Modern State Management**: Zustand for global state, React Query for server state
- **Type-Safe Development**: Full TypeScript implementation with comprehensive interfaces
- **Performance Optimized**: Efficient data fetching, caching, and lazy loading
- **Accessibility First**: WCAG compliant design with screen reader support

## 📸 Screenshots

### Landing Page & Learning Modes

_Main dashboard showcasing different learning modes and navigation_

### Interactive Chat Interface

_Real-time conversation with AI tutor featuring voice controls and chat history_

### Character Selection

_Browse and select from 25+ famous characters for contextual learning_

### Voice Features

_Speech recognition and text-to-speech capabilities with visual feedback_

### Mobile Responsive Design

_Optimized experience across all device sizes_

## 🛠️ Tech Stack & Architecture

### Core Framework & Language

- **[Next.js 16](https://nextjs.org/)** – App Router with server components and API routes
- **[React 19](https://react.dev/)** – Latest React with concurrent features
- **[TypeScript 5](https://www.typescriptlang.org/)** – Full type safety and modern ES features

### Styling & UI

- **[Tailwind CSS 4](https://tailwindcss.com/)** – Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** – Beautiful, consistent icon library
- **[Lottie React](https://lottiefiles.com/)** – High-quality animations and micro-interactions

### State Management & Data Fetching

- **[Zustand](https://zustand-store.netlify.app/)** – Lightweight, scalable state management
- **[React Query (TanStack Query)](https://tanstack.com/query/latest)** – Powerful data synchronization and caching
- **Custom Hooks** – Reusable API integration patterns

### Authentication & Voice

- **[Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)** – Secure social authentication
- **[React Speech Recognition](https://www.npmjs.com/package/react-speech-recognition)** – Voice input capabilities
- **Web Speech API** – Browser-native text-to-speech synthesis

### Development Tools

- **ESLint** – Code quality and consistency
- **PostCSS** – CSS processing and optimization
- **TypeScript Compiler** – Advanced type checking

### Architecture Highlights

- **Component-Driven Architecture** – Reusable, modular components
- **Custom Hook Pattern** – Encapsulated business logic
- **Route-Based Code Splitting** – Optimized bundle sizes
- **Responsive Design System** – Mobile-first approach

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **Google OAuth** credentials (for authentication)

### Installation & Setup

#### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd client

# Install dependencies
npm install
```

#### 2. Environment Configuration

Create a `.env.local` file in the project root:

```bash
# Google OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here

# API Configuration
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

**Environment Variables:**

- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` – Google OAuth client ID for user authentication
- `NEXT_PUBLIC_API_URL` – Backend API base URL for all data operations

#### 3. Development Server

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to see the application running.

### 🔧 Development Commands

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit

# Build optimization check
npm run build
```

## 🔌 API Integration

The application integrates with a backend API through custom React hooks:

- **Authentication**: Google OAuth flow with token management
- **Learning Data**: Character profiles, debate topics, roleplay scenarios
- **Chat History**: Persistent conversation storage and retrieval
- **User Progress**: Personalized learning analytics and recommendations

All API calls use React Query for caching, error handling, and optimistic updates.

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

## 🤝 Contributing

We welcome contributions! Here's how you can help improve EnglishTutor:

### Development Process

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/your-username/client.git`
3. **Create** a feature branch: `git checkout -b feature/amazing-feature`
4. **Install** dependencies: `npm install`
5. **Make** your changes with proper TypeScript types and tests
6. **Commit** with conventional format: `git commit -m "feat: add amazing feature"`
7. **Push** to your branch: `git push origin feature/amazing-feature`
8. **Open** a Pull Request

### Code Standards

- **TypeScript**: Strict type checking enabled
- **ESLint**: Follow the configured linting rules
- **Component Structure**: Use functional components with custom hooks
- **State Management**: Prefer Zustand for global state, React Query for server state
- **Styling**: Tailwind CSS with responsive design principles

### Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit

# Build verification
npm run build
```

### Areas for Contribution

- 🐛 **Bug Fixes**: Help improve stability and user experience
- ✨ **New Features**: Add learning modes, characters, or voice features
- 🎨 **UI/UX**: Enhance design and accessibility
- 📱 **Mobile Optimization**: Improve responsive design
- 🔧 **Performance**: Optimize loading times and bundle size
- 🌐 **Internationalization**: Add support for multiple languages

## 📄 License

This project is currently intended for internal/personal use. For production deployment or redistribution:

- **Educational Use**: Free for non-commercial educational purposes
- **Commercial Use**: Contact for licensing arrangements
- **Open Source**: Consider MIT License for community contributions

---

## 🙏 Acknowledgments

- **Character Images**: Historical and fictional character illustrations
- **Lottie Animations**: Loading states and micro-interactions
- **Open Source Community**: React, Next.js, and all contributing libraries

## 📞 Support

For questions, issues, or feature requests:

- Create an [issue](https://github.com/your-repo/issues) on GitHub
- Join our community discussions
- Check the documentation for common solutions

---

_Built with ❤️ for language learners worldwide_
