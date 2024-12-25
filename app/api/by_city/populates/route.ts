import { UrlApiWithDomain, UrlRevalidate } from "@/shared/api/url";
import { Populates } from "@/shared/types/populates";
import { Products } from "@/shared/types/products";
import { ProductsDetail } from "@/shared/types/productsDetail";
// import { Products } from "@/shared/types/products";
// import { NextRequest } from "next/server";

export async function GET(
  // request: NextRequest
) {
  // const city = request.nextUrl.searchParams.get("city") as string;

  const fetchPopulates = await (
    await fetch(UrlApiWithDomain.getPopulatesId, {
      ...UrlRevalidate.getPopulatesId,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
  ).json();

  const PopularProductsByIds = `by_ids/${fetchPopulates
    .flatMap((i: Populates) => i.products)
    .join(",")}`;
    
  const UrlApiWithDomainPopularProductsByIds =
    UrlApiWithDomain.getProducts + PopularProductsByIds;
    
  const fetchPopularProductsByIds = await (
    await fetch(UrlApiWithDomainPopularProductsByIds, {
      ...UrlRevalidate.getProducts,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
  ).json();


  // const popularProductsByCity = fetchPopularProductsByIds.filter(
  //   (i: Products) => i?.price && city in i.price
  // );

  const ProductsHavePrice = fetchPopularProductsByIds.filter(
    (i: Products | ProductsDetail) => i?.price && Object.keys(i?.price).length > 0
  );

  

  return new Response(JSON.stringify(ProductsHavePrice), {
    status: 200,
  });
}
