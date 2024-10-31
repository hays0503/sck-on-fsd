"use client";

import { SWRConfig } from "swr";
import { CityProvider } from "../hooks/useGetCityParams";


export function ProvidersClient({
  children,
  fallback,
  params,
}: {
  children: React.ReactNode;
  fallback: {    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any;
}) {
  return (
    <SWRConfig value={{ fallback }}>
      <CityProvider City={params?.city}>{children}</CityProvider>
    </SWRConfig>
  );
}
