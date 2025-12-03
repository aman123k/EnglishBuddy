export function toggleTts(enabled: boolean) {
  localStorage.setItem("ttsEnabled", JSON.stringify(enabled));
}

export function getTtsStatus() {
  if (typeof window === "undefined") return true;
  const stored = localStorage.getItem("ttsEnabled");
  return stored !== null ? JSON.parse(stored) : true;
}
