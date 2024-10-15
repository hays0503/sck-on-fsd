"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

const AuthPage = () => {
  const searchParams = useSearchParams();
  const [,setAccessToken] = useLocalStorage("accessToken", { token: "" });
  const [,setRefreshToken] = useLocalStorage("refreshToken", { token: "" });
  useEffect(() => {
    const accessTokenData = searchParams?.get("accessTokenData");
    const refreshTokenData = searchParams?.get("refreshTokenData");
    if (accessTokenData && refreshTokenData) {
      setAccessToken({ token: accessTokenData });
      setRefreshToken({ token: refreshTokenData });
      window.location.href = process.env.HOST_URL ?? "http://localhost:3000/ru";
    }
  });
  return <>Save Token</>;
};

const AuthPageWrapper = () => {
  return (
    <>
      <Suspense>
        <AuthPage />
      </Suspense>
    </>
  );
};

export default AuthPageWrapper;
