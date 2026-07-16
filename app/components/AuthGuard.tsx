"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import useAuthentication from "../hooks/useAuth";
import Loader from "../UIKIT/Loader";
import { getClientCookie, setClientCookie, deleteClientCookie } from "../utils/cookie";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { userData, isLoading } = useAuthentication();
  const [mounted, setMounted] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  const allowedPaths = useMemo(
    () => [
      "/get-started",
      "/survey",
      "/login",
      "/forgot-password",
      "/forgot-password/sent",
      "/callback",
    ],
    []
  );

  // Set mounted state once client-side is ready
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const isPublicPath = allowedPaths.includes(pathname);
    const hasAuthCookieFlag = getClientCookie("lingo_logged_in") === "true";

    // During initial loading
    if (isLoading) {
      if (isPublicPath) {
        // Public pages are accessible immediately
        setAuthorized(true);
      } else if (hasAuthCookieFlag) {
        // Assume logged in (to prevent full-screen loader) and render layout structure.
        // The background fetch will either complete successfully or fail and redirect.
        setAuthorized(true);
      } else {
        // Protected route without cookie flag -> force show loader
        setAuthorized(false);
      }
      return;
    }

    // After loading completes
    if (!userData) {
      // User is logged out (or fetch failed)
      deleteClientCookie("lingo_logged_in");

      if (!isPublicPath) {
        setAuthorized(false);
        router.replace("/login");
      } else {
        setAuthorized(true);
      }
    } else {
      // User is logged in
      setClientCookie("lingo_logged_in", "true", 30);

      const isComplete = userData.isSurveyComplete;

      if (isComplete && isPublicPath) {
        setAuthorized(false);
        router.replace("/");
      } else if (!isComplete && !allowedPaths.includes(pathname)) {
        setAuthorized(false);
        router.replace("/login");
      } else {
        setAuthorized(true);
      }
    }
  }, [userData, isLoading, pathname, router, allowedPaths, mounted]);

  // Prevent SSR/hydration mismatches by returning null/loader on initial mount
  if (!mounted) {
    return (
      <div className="relative min-h-screen min-w-full bg-[#F7F7FE]">
        <Loader />
      </div>
    );
  }

  const isPublicPath = allowedPaths.includes(pathname);
  const hasAuthCookieFlag = getClientCookie("lingo_logged_in") === "true";

  // While loading, if the user doesn't have the logged_in flag and is accessing a protected route, block page and show loader
  if (isLoading && !isPublicPath && !hasAuthCookieFlag) {
    return (
      <div className="relative min-h-screen min-w-full bg-[#F7F7FE]">
        <Loader />
      </div>
    );
  }

  // If not authorized yet (e.g. redirecting), show page loader
  if (!authorized) {
    return (
      <div className="relative min-h-screen min-w-full bg-[#F7F7FE]">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
}
