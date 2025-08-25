"use client";
import React, { useCallback, useEffect } from "react";
import usePostAPIRequest from "../hooks/usePostAPIRequest";
import { useRouter } from "next/navigation";

function GithubCallBack() {
  const router = useRouter();
  const { mutateAsync } = usePostAPIRequest();

  const githubAuth = useCallback(
    async (code: string) => {
      const surveyRes = JSON.parse(localStorage.getItem("surveyRes") as string);
      const response = await mutateAsync({
        path: `/api/githubAuth`,
        data: { ...surveyRes },
        headers: { Authorization: `Bearer ${code}` },
      });

      if (response?.status) {
        localStorage.removeItem("surveyRes");
        router.push(response?.route);
      }
    },
    [mutateAsync, router]
  );

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code") as string;
    if (!code) return;
    githubAuth(code);
  }, [githubAuth]);

  return <></>;
}

export default GithubCallBack;
