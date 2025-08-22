export interface SliderType {
  id: number;
  title: string;
  description: string;
  img: string;
}

type Option = {
  icon: string;
  label: string;
};
export interface SurveyData {
  id: number;
  title: string;
  subText: string;
  options: Option[];
}

export interface SurveyResponses {
  languageLevel: string;
  learningGoal: string;
  learningReason: string;
  learningStyle: string;
  ageGroup: string;
  translationLanguage: string;
  practiceFrequency: string;
}

export interface PersonalizePlan {
  id: number;
  img: string;
  title: string;
  subText: string;
}
