import { create } from "zustand";
import { SurveyResponses, User } from "../interface/interface";

interface CreateStoreState {
  surveyRes: SurveyResponses;
  user: User | null;
}

interface Store {
  setSurveyRes: (data: Partial<SurveyResponses>) => void;
  resetSurvey: () => void;
  setUser: (user: User | null) => void;
  clearUser: () => void;
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
};

export const useStore = create<Store & CreateStoreState>((set) => ({
  ...initialState,

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

  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
