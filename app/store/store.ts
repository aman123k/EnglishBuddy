// Central client-side store for survey answers, authenticated user data,
// chat messages and UI sidebars (account + utility).
import { create } from "zustand";
import { SurveyResponses, User } from "../interface/interface";
import { Message, UtilitySidebarProps } from "../interface/messageInterface";
import { cardGridInterface } from "../interface/cardGridInterface";

interface CreateStoreState {
  surveyRes: SurveyResponses;
  user: User | null;
  userMessage: Message[];
  utilitySidebar: UtilitySidebarProps;
  accountSidebar: UtilitySidebarProps;
  allCharacter: cardGridInterface[];
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
  setAllCharacter: (characters: cardGridInterface[]) => void;
  updateMessage: (id: string, updates: Partial<Message>) => void;
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
  allCharacter: [],
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
  setAllCharacter: (characters) => set({ allCharacter: characters }),
  updateMessage: (id, updates) => {
    set((state) => ({
      userMessage: (state.userMessage || []).map((msg) =>
        msg._id === id ? { ...msg, ...updates } : msg
      ),
    }));
  },
}));
