import { ProvidersServer } from "@/shared/providers/providersServer";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";
import { UrlApiWithDomain, UrlRevalidate } from "@/shared/api/url";

export const metadata: Metadata = {
  title: "sck.kz",
  description: "Сайт в разработке sck.kz",
};

export async function generateStaticParams() {
  try {
    const response = await fetch(UrlApiWithDomain.getCity, {
      ...UrlRevalidate.getCity,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch cities: ${response.statusText}`);
    }

    const data = await response.json();

    return data.map((i: { additional_data: { EN: string } }) => ({
      city: i.additional_data.EN,
    }));
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
}

const inter = Inter({
  subsets: ["cyrillic", "latin"],
});

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string; city: string };
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
