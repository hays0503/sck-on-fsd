import { Metadata } from "next";
import { ApiUrl, UrlApi } from "@/shared/api/url";
import { Category } from "@/shared/types/category";


export const metadata: Metadata = {
  title: "sck.kz",
  description: "Сайт в разработке sck.kz",
};

export async function generateStaticParams() {
  const ApiPort = `:${process.env.API_PORT}`
  const url = `${ApiUrl}${ApiPort}${UrlApi.getCategory}`
  const fetchSlugs = await(await fetch(url,{
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })).json();
  return fetchSlugs.map((Category:Category) => ({ slug: Category.slug }))
}


export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}