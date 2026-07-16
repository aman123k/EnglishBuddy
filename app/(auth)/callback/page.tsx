"use client";
import React, { useCallback, useEffect } from "react";
import usePostAPIRequest from "../../hooks/usePostAPIRequest";
import { useRouter } from "next/navigation";
import { setClientCookie } from "../../utils/cookie";

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
        setClientCookie("lingo_logged_in", "true", 30);
        router.push(response?.route);
      } else {
        localStorage.removeItem("surveyRes");
        router.push("/login");
      }
    },
    [mutateAsync, router]
  );

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code") as string;
    if (!code) router.push("/login");

    githubAuth(code);
  }, [githubAuth, router]);

  return <></>;
}

export default GithubCallBack;
