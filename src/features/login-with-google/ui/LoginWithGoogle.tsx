"use client";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import useLoginWithGoogle from "../model/useLoginWithGoogle";

export default function LoginWithGoogle() {
  const url = useLoginWithGoogle();

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
