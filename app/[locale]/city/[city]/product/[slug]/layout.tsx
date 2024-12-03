import { ProvidersServer } from "@/shared/providers/providersServer";
import { Metadata } from "next";
import {setRequestLocale} from 'next-intl/server';
import { Inter } from "next/font/google";
import { ApiUrl, UrlApi } from "@/shared/api/url";


export const metadata: Metadata = {
  title: "dev.SCK-1.kz",
  description: "Сайт в разработке dev.SCK-1.kz",
};

export async function generateStaticParams() {
  const url = `${ApiUrl}${UrlApi.getProducts}all/slugs/`
  const fetchSlugs = await(await fetch(url,{
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })).json();
  return fetchSlugs.map((slug: string) => ({ slug: slug }))
}

const inter = Inter({
  subsets: ["cyrillic", "latin"],
});

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return (
    <html lang={locale}>
      <body className={inter.className}>
      <ProvidersServer>{children}</ProvidersServer>
      </body>
    </html>
  );
}
