"use client";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import useLoginWithGoogle from "../model/useLoginWithGoogle";
import { useLocalStorage } from "usehooks-ts";
import { useEffect } from "react";
import { useLocale } from "next-intl";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";


export default function LoginWithGoogle() {

  const url = useLoginWithGoogle() ?? "";
  //  const url = _url.replace("http://pimenov.kz:3000","http://localhost:3000");
  const [, setParameter] = useLocalStorage<
    { locale: undefined | string, city: undefined | string }
  >('parameters', { locale: undefined, city: undefined });
  const locale = useLocale();
  const city = useGetCityParams();
  useEffect(() => {
    setParameter({
      locale,
      city
    })
  }, [])
  return (
    <div>
      {url ? (
        <Link href={url}>
          <Image priority={true} width={32} height={32} src="/google-logo.svg" alt="GoogleAuth" />
        </Link>
      ) : (
        <button disabled>
          <Image priority={true} width={32} height={32} src="/google-logo.svg" alt="GoogleAuth" />
          {/* Add a loading spinner or text if desired */}
        </button>
      )}
    </div>
  );
}
