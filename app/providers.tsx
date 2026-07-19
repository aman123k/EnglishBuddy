"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import AuthGuard from "./components/AuthGuard";
import SubscriptionModal from "./components/SubscriptionModal";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <AuthGuard>
          {children}
          <SubscriptionModal />
        </AuthGuard>
        <Toaster />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
