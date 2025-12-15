import { create } from "zustand";
import { SurveyResponses, User } from "../interface/interface";
import { Message, UtilitySidebarProps } from "../interface/messageInterface";

interface CreateStoreState {
  surveyRes: SurveyResponses;
  user: User | null;
  userMessage: Message[];
  utilitySidebar: UtilitySidebarProps;
  accountSidebar: UtilitySidebarProps;
}

interface Store {
  setSurveyRes: (data: Partial<SurveyResponses>) => void;
  resetSurvey: () => void;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  setUserMessage: (message: Message) => void;
  setPreviousMessages: (messages: Message[]) => void;
  setUtilitySidebar: (props: Partial<UtilitySidebarProps>) => void;
  setInitialMessages: (messages: Message[]) => void;
  setAccountSidebar: (props: Partial<UtilitySidebarProps>) => void;
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
  userMessage: [],

  // Utility Sidebar
  utilitySidebar: {
    isOpen: true,
    title: "Information",
    description:
      "AI will assess your messages and give you personalized feedback",
  },
  accountSidebar: {
    isOpen: false,
    title: "",
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

  //
  setInitialMessages: (messages: Message[]) => {
    set(() => ({
      userMessage: messages,
    }));
  },

  // Prepend previous messages (for pagination)
  setPreviousMessages: (messages) => {
    set((state) => ({
      userMessage: [...messages, ...(state.userMessage || [])],
    }));
  },
  // Utility Sidebar
  setUtilitySidebar: (props) => {
    set((state) => ({
      utilitySidebar: { ...state.utilitySidebar, ...props },
    }));
  },
  // Profile Sidebar
  setAccountSidebar: (props) => {
    set((state) => ({
      accountSidebar: { ...state.accountSidebar, ...props },
    }));
  },
}));
