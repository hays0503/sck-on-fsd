import { Flex, Typography } from "antd"
import { ProductsDetail } from "@/shared/types/productsDetail"
import { selectDataByLangProducts } from "@/shared/tools/selectDataByLang"
import { useLocale } from "next-intl"
import { useGetCityParams } from "@/shared/hooks/useGetCityParams"
import { Link } from "@/i18n/routing"
import Image from "next/image"


const {Title} = Typography

interface IProductDetailConfiguration {
    readonly fetchProduct: ProductsDetail
}

const ProductDetailConfiguration: React.FC<IProductDetailConfiguration> = (props) => {
    const {fetchProduct } = props

    const localeActive = useLocale();
    const currentCity = useGetCityParams();

    return <Flex vertical={true} gap={10} style={{ width: "100%",padding:"10px" }}>
        <Title level={5}>{selectDataByLangProducts(fetchProduct, localeActive)}</Title>
          <Flex gap={10}>
            {fetchProduct.configuration.map((item) => {
              return (
                <Link
                  prefetch={true}
                  key={item.id}
                  href={`/${currentCity}/product/${item.slug}`}
                >
                  <Flex
                    style={{
                      padding: "10px",
                      backgroundColor: "#fff",
                      border: "1px solid #d7d7d7",
                    }}
                  >
                    <Image
                      src={item.list_url_to_image[0]}
                      alt={item.name_product}
                      width={30}
                      height={30}
                    />
                  </Flex>
                </Link>
              );
            })}
          </Flex>
    </Flex>
}

export default ProductDetailConfiguration