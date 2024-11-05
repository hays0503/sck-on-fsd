import { createGoogleAccount } from "@/features/login-with-google";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // const callbackData = request.nextUrl.search;
  const queryParamsCode = request.nextUrl.searchParams.get("code");
  if (queryParamsCode) {
    const Tokens = await createGoogleAccount(queryParamsCode);
    return Response.redirect(
      process.env.HOST_URL +
        "/auth?accessTokenData=" +
        Tokens.access.token +
        "&refreshTokenData=" +
        Tokens.refresh.token
    );
  }
  return Response.redirect(process.env.HOST_URL??"http://pimenov.kz:3000");
}
