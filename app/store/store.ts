import { create } from "zustand";
import { SurveyResponses } from "../interface/interface";

interface CreateStoreState {
  surveyRes: SurveyResponses;
  surveyCompleted: boolean;
}

interface Store {
  setSurveyRes: (data: Partial<CreateStoreState>) => void;
  setSurveyCompleted: (data: boolean) => void;
  resetSurvey: () => void;
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
  surveyCompleted: false,
};

export const useStore = create<Store & CreateStoreState>((set) => ({
  ...initialState,

  setSurveyRes: (data) =>
    set((state) => ({
      surveyRes: { ...state.surveyRes, ...data },
    })),

  setSurveyCompleted: (value) => set({ surveyCompleted: value }),

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
}));
