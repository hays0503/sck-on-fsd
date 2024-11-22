"use client";

import { getUsersBasket } from "@/entities/Basket";
import { iBasket } from "@/shared/types/basket";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

const AuthPage = () => {
  const searchParams = useSearchParams();
  const [, setAccessToken] = useLocalStorage("accessToken", { token: "" });
  const [, setRefreshToken] = useLocalStorage("refreshToken", { token: "" });
  const [, setUuid] = useLocalStorage('uuid_id', '');
  const [parameters] = useLocalStorage<
    { locale: undefined | string, city: undefined | string }
  >('parameters', { locale: undefined, city: undefined });
  const router = useRouter();
  useEffect(() => {
    // debugger;
    const accessTokenData = searchParams?.get("accessTokenData");
    const refreshTokenData = searchParams?.get("refreshTokenData");
    if (accessTokenData && refreshTokenData) {
      setAccessToken({ token: accessTokenData });
      setRefreshToken({ token: refreshTokenData });
      getUsersBasket(accessTokenData).then(
        (data: iBasket) => {
          if (data?.uuid_id) {
            setUuid(data?.uuid_id);
          }
        }
      )
    }
    const url = `/${parameters.locale}/city/${parameters.city}/main`;
    router.replace(url)
  }, []);
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
