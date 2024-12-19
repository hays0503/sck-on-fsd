import { getPrice } from "@/entities/ProductCart";
import { useRouter } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import useSelectedCity from "@/shared/hooks/useSelectedCity";
import beautifulCost from "@/shared/tools/beautifulCost";
import { selectDataByLangProducts } from "@/shared/tools/selectDataByLang";
import { Products } from "@/shared/types/products";
import { AutoComplete, AutoCompleteProps,  Flex, Input, Typography } from "antd";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

const { Text } = Typography;
const { Search } = Input;
export default function SearchProduct() {
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
  const city = useSelectedCity();
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const cityEn = useGetCityParams();
  const search = useDebounceCallback(async (value: string) => {

    try {
      const response = await fetch(`/search/product/${value.toLocaleLowerCase()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      console.log(response);
      try {
        const productsRawIndex: { id: number }[] = await response.json();
        const productsId = productsRawIndex.map(product => product.id);
        try {
          const responseProducts = await fetch(`/api/v1/products/by_ids/${productsId.join(',')}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
          });

          try {
            const _products: Products[] = await responseProducts.json();
            const products: Products[] = _products.filter(product => product.price &&(city in product.price));
            const options = products.map((product: Products) => ({
              value: product.slug,
              label: <>
                <Flex align="center" justify="space-between">
                  <Flex align="center" justify="start" gap={10} style={{
                      width: "70%"
                    }}>
                    <Image src={product.list_url_to_image[0] ?? '/nofoto.jpg'} alt={selectDataByLangProducts(product, locale) ?? product.name_product} width={50} height={50} />
                    <Text ellipsis >{selectDataByLangProducts(product, locale)}</Text>
                  </Flex>
                  <Text>{beautifulCost(getPrice(product, city).price ?? 0)}</Text>
                </Flex>
              </>
            }))
            setOptions(options);
          } catch (error) {
            console.log("Произошла ошибка при поиске товара - при парсинге продуктов", error);
          }

        } catch (error) {
          console.log("Произошла ошибка при поиске товара - при запросе продуктов по id", error);
        }

      } catch (error) {
        console.log("Произошла ошибка при поиске товара - при парсинге", error);
      }
    } catch (error) {
      console.log("Произошла ошибка при поиске товара - при запросе индекса", error);
    }

  }, 500);


  return <AutoComplete
    size="large"
    options={options}
    style={{ width: "100%" }}
    onSearch={search}
    onSelect={(value) => {
      router.push(`/city/${cityEn}/product/${value}`);
    }}
  >
    <Search
      placeholder={t("placeholder-search")}
      role="search"
      name="search"
    />
  </AutoComplete>
}
