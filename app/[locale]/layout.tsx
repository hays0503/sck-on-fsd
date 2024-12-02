import { ProvidersServer } from "@/shared/providers/providersServer";
import { Metadata } from "next";
import {setRequestLocale} from 'next-intl/server';
import { Inter } from "next/font/google";
import { locales } from "@/i18n/routing";


export const metadata: Metadata = {
  title: "dev.SCK-1.kz",
  description: "Сайт в разработке dev.SCK-1.kz",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
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
