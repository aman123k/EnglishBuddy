export class CookieProvider {
  static async setAuthToken(token: string) {
    await fetch("/api/set-cookie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    console.log("okay");
  }

  static async clearAuthToken() {
    await fetch("/api/set-cookie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: "" }),
    });
  }
}
