import { UrlApiWithDomain, UrlRevalidate } from "@/shared/api/url";
import { Products } from "@/shared/types/products";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const city = request.nextUrl.searchParams.get("city") as string;
  const slug = request.nextUrl.searchParams.get("slug") as string;

  const urlBuilderProductsByCategoryWithDomain = `${UrlApiWithDomain.getProducts}filter_by_cat/${slug}`;

  const fetchProductsByCategory = await (
    await fetch(urlBuilderProductsByCategoryWithDomain, {
      ...UrlRevalidate.getProducts,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
  ).json();


  const ProductsByCity = fetchProductsByCategory.filter(
    (i: Products) => i?.price && city in i.price
  );
 

  return new Response(JSON.stringify(ProductsByCity), {
    status: 200,
  });
}
