import { UrlApiWithDomain, UrlRevalidate } from "@/shared/api/url";
import { Products } from "@/shared/types/products";
import { ProductsDetail } from "@/shared/types/productsDetail";
// import { Products } from "@/shared/types/products";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // const city = request.nextUrl.searchParams.get("city") as string;
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

  // const ProductsByCity = fetchProductsByCategory.filter(
  //   (i: Products) => i?.price && city in i.price
  // );

  const ProductsHavePrice = fetchProductsByCategory.filter(
    (i: Products | ProductsDetail) => i?.price && Object.keys(i?.price).length > 0
  );

  return new Response(JSON.stringify(ProductsHavePrice), {
    status: 200,
  });
}
