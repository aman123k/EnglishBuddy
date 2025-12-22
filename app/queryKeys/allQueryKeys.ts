// Typed helpers to generate stable React Query keys across the app.
export const GET_USER_INFORMATION = (path: string) => [
  "GET_USER_INFORMATION",
  path,
];

export const GET_USER_MESSAGES = (path: string) => ["GET_USER_MESSAGES", path];

// Generic key builder for list-style resources (e.g. characters).
export const GET_USER_COMMON = (path: string) => ["GET_USER_COMMON", path];
