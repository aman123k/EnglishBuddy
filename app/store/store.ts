import { create } from "zustand";
import { SurveyResponses, User } from "../interface/interface";
import { Message, UtilitySidebarProps } from "../interface/messageInterface";

interface CreateStoreState {
  surveyRes: SurveyResponses;
  user: User | null;
  userMessage: Message[] | null;
  utilitySidebar: UtilitySidebarProps;
}

interface Store {
  setSurveyRes: (data: Partial<SurveyResponses>) => void;
  resetSurvey: () => void;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  setUserMessage: (message: Message) => void;
  setUtilitySidebar: (props: Partial<UtilitySidebarProps>) => void;
}

// Initial state
const initialState: CreateStoreState = {
  surveyRes: {
    languageLevel: "",
    learningGoal: "",
    learningReason: "",
    learningStyle: "",
    ageGroup: "",
    translationLanguage: "",
    practiceFrequency: "",
  },
  user: null,

  // Chat Messages
  userMessage: [
    {
      id: "1",
      sender: "ai",
      content: "Hello! How can I assist you today?",
      timestamp: new Date(),
    },
    {
      id: "2",
      sender: "user",
      content: "I would like to learn more about your services.",
      timestamp: new Date(),
    },
    {
      id: "3",
      sender: "ai",
      content:
        "Sure! We offer a variety of language learning tools and resources to help you improve your skills.",
      timestamp: new Date(),
    },
    {
      id: "4",
      sender: "user",
      content: "That sounds great! How do I get started?",
      timestamp: new Date(),
    },
    {
      id: "5",
      sender: "ai",
      content:
        "Just sign up for an account, and you can access all our learning materials and start your journey!",
      timestamp: new Date(),
    },
  ],

  // Utility Sidebar
  utilitySidebar: {
    isOpen: true,
    title: "Information",
    description:
      "AI will assess your messages and give you personalized feedback",
  },
};

export const useStore = create<Store & CreateStoreState>((set) => ({
  ...initialState,

  // Actions
  setSurveyRes: (data) =>
    set((state) => ({
      surveyRes: { ...state.surveyRes, ...data },
    })),

  resetSurvey: () =>
    set({
      surveyRes: {
        languageLevel: "",
        learningGoal: "",
        learningReason: "",
        learningStyle: "",
        ageGroup: "",
        translationLanguage: "",
        practiceFrequency: "",
      },
    }),

  // User Auth
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),

  // Chat Messages
  setUserMessage: (message) => {
    set((state) => ({
      userMessage: [...(state.userMessage || []), message],
    }));
  },

  // Utility Sidebar
  setUtilitySidebar: (props) => {
    set((state) => ({
      utilitySidebar: { ...state.utilitySidebar, ...props },
    }));
  },
}));
