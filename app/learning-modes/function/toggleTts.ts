export function toggleTts(enabled: boolean) {
  localStorage.setItem("ttsEnabled", JSON.stringify(enabled));
  if (!enabled) {
    const synth = window.speechSynthesis;
    // Stop any ongoing speech before starting new speech
    synth.cancel();
  }
}

export function getTtsStatus() {
  if (typeof window === "undefined") return true;
  const stored = localStorage.getItem("ttsEnabled");
  return stored !== null ? JSON.parse(stored) : true;
}
