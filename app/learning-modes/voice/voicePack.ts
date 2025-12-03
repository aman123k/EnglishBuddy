/**
 * @module voicePack
 * @description This module defines browser-specific voice preferences for speech synthesis
 * and provides a utility function to detect the user's browser.
 */

declare global {
  interface Navigator {
    brave?: {
      isBrave: () => Promise<boolean>;
    };
  }
}

/**
 * @constant voicePack
 * @description An object containing arrays of preferred female English voice names,
 * categorized by browser. This allows for tailored voice selection based on the
 * browser environment, prioritizing high-quality or native voices.
 * 'default' contains a fallback list of common voices.
 */
export const voicePack = {
  // Voices preferred for Microsoft Edge browser
  edge: [
    "Microsoft Aria Online (Natural) - English (United States)",
    "Microsoft Aria Desktop - English (United States)",
    "Microsoft Zira Desktop - English (United States)",
    "Microsoft Sonia Online (Natural) - English (United Kingdom)",
    "Microsoft Hazel Desktop - English (United Kingdom)",
  ],
  // Voices preferred for Google Chrome browser
  chrome: ["Google UK English Female", "Google US English"],
  // Voices preferred for Brave browser (prioritizes Chrome voices due to Chromium base)
  brave: [
    // Use Chrome voices first (Brave is Chromium-based)
    "Google UK English Female",
    "Google US English",
    // Mac voices (if Brave runs on macOS and has access to system voices)
    "Samantha",
    "Victoria",
    "Karen",
    "Moira",
    "Tessa",
    "Serena",
    // Windows voices (if Brave runs on Windows and has access to system voices)
    "Microsoft Aria Online (Natural) - English (United States)",
    "Microsoft Aria Desktop - English (United States)",
    "Microsoft Zira Desktop - English (United States)",
    "Microsoft Sonia Online (Natural) - English (United Kingdom)",
    "Microsoft Hazel Desktop - English (United Kingdom)",
  ],
  // Voices preferred for Apple Safari browser
  safari: ["Samantha", "Victoria", "Karen", "Moira", "Tessa", "Serena"],
  // Voices preferred for Mozilla Firefox browser
  firefox: ["Google UK English Female", "Google US English", "Samantha"],
  // Default fallback voices if no browser-specific preferences are matched
  default: ["Anna", "Alice", "Laura", "Nicole", "Alloy"],
};

/**
 * @function getBrowser
 * @description Detects the current browser based on the user agent string and
 * specific browser properties (e.g., `navigator.brave`).
 * @returns {string} The name of the detected browser (e.g., "chrome", "firefox", "brave", "edge", "safari", "unknown").
 */
export function getBrowser() {
  // Return "unknown" if not in a browser environment
  if (typeof window === "undefined") return "unknown";
  const ua = window.navigator.userAgent;

  // Detect Brave browser using its specific API
  if (navigator.brave && typeof navigator.brave.isBrave === "function")
    return "brave";
  // Detect Edge browser
  if (/Edg/.test(ua)) return "edge";
  // Detect Chrome browser (and exclude Edge, which also contains "Chrome")
  if (/Chrome/.test(ua) && !/Edg/.test(ua)) return "chrome";
  // Detect Safari browser (and exclude Chrome)
  if (/Safari/.test(ua) && !/Chrome/.test(ua)) return "safari";
  // Detect Firefox browser
  if (/Firefox/.test(ua)) return "firefox";
  // Fallback for unknown browsers
  return "unknown";
}
