import { PersonalizePlan, SurveyData } from "@/app/interface/interface";

export const surveyData: SurveyData[] = [
  {
    id: 1,
    title: "What’s your language level?",
    subText: "We will personalize conversations based on your language level.",
    options: [
      { icon: "🐣", label: "Absolute Beginner" },
      { icon: "🌱", label: "Beginner" },
      { icon: "📚", label: "Intermediate" },
      { icon: "🦉", label: "Advanced" },
    ],
  },
  {
    id: 2,
    title: "What are you looking to achieve?",
    subText: "",
    options: [
      { icon: "📘", label: "I want to learn basics" },
      { icon: "🗣️", label: "I want to improve speaking" },
      { icon: "🚀", label: "I want to become fluent" },
      { icon: "🤔", label: "I’m not sure yet" },
    ],
  },
  {
    id: 3,
    title: "Why do you want to learn the language?",
    subText: "",
    options: [
      { icon: "📘", label: "Academy and Research" },
      { icon: "🎓", label: "University and Education" },
      { icon: "🚀", label: "Job and Career" },
      { icon: "✈️", label: "Travel and Tourism" },
      { icon: "🗣️", label: "Better Communication with Friends" },
      { icon: "📜", label: "Language Tests and Certificates" },
      { icon: "✨", label: "Other" },
    ],
  },
  {
    id: 4,
    title: "What's your learning style?",
    subText: "",
    options: [
      { icon: "🗣️", label: "I like speaking and having a conversation" },
      { icon: "📖", label: "I learn better through reading" },
      { icon: "🤷", label: "I don't have a specific style" },
    ],
  },
  {
    id: 5,
    title: "How old are you?",
    subText: "",
    options: [
      { icon: "🧑", label: "18-24" },
      { icon: "👩‍💼", label: "25-34" },
      { icon: "🧑‍🦳", label: "35-44" },
      { icon: "👴", label: "45+" },
    ],
  },
  {
    id: 6,
    title: "Choose translation language",
    subText: "",
    options: [
      { icon: "🇺🇸", label: "English" },
      { icon: "🇪🇸", label: "Spanish" },
      { icon: "🇫🇷", label: "French" },
      { icon: "🇩🇪", label: "German" },
      { icon: "🇮🇹", label: "Italian" },
      { icon: "🇵🇹", label: "Portuguese" },
      { icon: "🇷🇺", label: "Russian" },
      { icon: "🇨🇳", label: "Chinese (Mandarin)" },
      { icon: "🇯🇵", label: "Japanese" },
      { icon: "🇰🇷", label: "Korean" },
      { icon: "🇮🇳", label: "Hindi" },
      { icon: "🇦🇪", label: "Arabic" },
      { icon: "🇹🇷", label: "Turkish" },
      { icon: "🇧🇩", label: "Bengali" },
      { icon: "🇵🇰", label: "Urdu" },
      { icon: "🇮🇩", label: "Indonesian" },
      { icon: "🇳🇱", label: "Dutch" },
      { icon: "🇸🇪", label: "Swedish" },
      { icon: "🇵🇱", label: "Polish" },
      { icon: "🇬🇷", label: "Greek" },
    ],
  },
  {
    id: 7,
    title: "How often do you want to practice?",
    subText:
      "We will remind you that it’s time to practice based on your schedule.",
    options: [
      { icon: "⏱️", label: "A few minutes a day" },
      { icon: "📅", label: "A few times each week" },
      { icon: "🗓️", label: "A few times each month" },
      { icon: "🤔", label: "I do not know right now" },
    ],
  },
  {
    id: 8,
    title: "",
    subText: "",
    options: [{ icon: "", label: "" }],
  },
  {
    id: 9,
    title: "",
    subText: "",
    options: [{ icon: "", label: "" }],
  },
];
export const fieldRecord: Record<number, string> = {
  1: "languageLevel",
  2: "learningGoal",
  3: "learningReason",
  4: "learningStyle",
  5: "ageGroup",
  6: "translationLanguage",
  7: "practiceFrequency",
};
export const personalizePlan: PersonalizePlan[] = [
  {
    id: 1,
    img: "/Images/debates.webp",
    title: "Debates",
    subText: "Practice arguing different viewpoints with AI",
  },
  {
    id: 2,
    img: "/Images/chat.webp",
    title: "Chat",
    subText: "Start speaking with AI teacher",
  },
  {
    id: 3,
    img: "/Images/role-play.webp",
    title: "Roleplays",
    subText: "Practice with real-life scenarios",
  },
  {
    id: 4,
    img: "/Images/characters.webp",
    title: "Characters",
    subText: "Role-play conversations with different personalities",
  },
];
