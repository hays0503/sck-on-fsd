import { ProvidersServer } from "@/shared/providers/providersServer";
import { Metadata } from "next";
import {setRequestLocale} from 'next-intl/server';
import { Inter } from "next/font/google";
// import { locales } from "@/i18n/routing";


export const metadata: Metadata = {
  title: "dev.SCK-1.kz",
  description: "Сайт в разработке dev.SCK-1.kz",
  themeColor: '#FFFF',
  manifest: '/manifest.json',
};

// export function generateStaticParams() {
//   return locales.map((locale) => ({ locale }));
// }

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
      <head>
        <meta name="viewport" content="width=device-width"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>      
        <meta name="mobile-wep-app-capable" content="yes"/>
        <meta name="apple-mobile-wep-app-capable" content="yes"/>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/android-chrome-192x192.png" />
        <meta name="theme-color" content="#FFFF" />
      </head>
      <body className={inter.className}>
      <ProvidersServer>{children}</ProvidersServer>
      </body>
    </html>
  );
}
