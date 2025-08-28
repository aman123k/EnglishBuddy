import { create } from "zustand";
import { SurveyResponses } from "../interface/interface";

interface CreateStoreState {
  surveyRes: SurveyResponses;
}

interface Store {
  setSurveyRes: (data: Partial<CreateStoreState>) => void;
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
}));
