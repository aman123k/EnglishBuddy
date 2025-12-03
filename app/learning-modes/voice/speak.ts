import { getTtsStatus } from "../function/toggleTts";
import { getBrowser, voicePack } from "./voicePack";

/**
 * @function speakFemale
 * @description This function synthesizes speech for a given text using a female English voice.
 * It attempts to select the best available female English voice based on the user's browser.
 * If voices are not immediately available (e.g., in Brave/Chrome), it waits for them to load.
 * @param {string} text - The text content to be spoken.
 * @returns {void}
 */
export function speakFemale(text: string) {
  // Ensure the function only runs in a browser environment
  if (typeof window === "undefined") return;
  // Check if TTS is enabled
  if (!getTtsStatus()) return;

  const sanitized = cleanEmoji(text);

  const synth = window.speechSynthesis;

  // Inner function to handle speech synthesis once voices are ready
  const speak = () => {
    const utter = new SpeechSynthesisUtterance(sanitized);

    // Get all available voices
    const voices = synth.getVoices();
    // Detect the current browser to apply browser-specific voice preferences
    const browser = getBrowser();

    // Select preferred voices based on the detected browser, falling back to a default list
    const preferredVoices =
      voicePack[browser as keyof typeof voicePack] || voicePack.default;

    // Attempt to find a female English voice:
    // 1. Prioritize voices from the browser's preferred list
    // 2. Fallback to any English female voice
    // 3. Finally, use the first available voice if no specific female English voice is found
    const femaleVoice =
      voices.find((v) => preferredVoices.includes(v.name)) ||
      voices.find((v) => /english/i.test(v.lang) && /female/i.test(v.name)) ||
      voices[0];

    // Set the selected voice and speech parameters
    utter.voice = femaleVoice;
    utter.pitch = 1;
    utter.rate = 1;
    utter.volume = 1;

    // Stop any ongoing speech before starting new speech
    synth.cancel();
    // Start speaking the text
    synth.speak(utter);
  };

  // Check if speech synthesis voices are already loaded
  if (synth.getVoices().length > 0) {
    // If voices are loaded, speak immediately
    speak();
  } else {
    // If voices are not loaded, wait for the 'onvoiceschanged' event
    // This is particularly important for browsers like Brave and Chrome,
    // where voices might load asynchronously.
    synth.onvoiceschanged = () => {
      speak();
    };
  }
}

export function cleanEmoji(text: string) {
  // Remove all emoji
  return text.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF])/g,
    ""
  );
}
