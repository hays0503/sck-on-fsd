import { Input } from "antd";
import { useTranslations } from "next-intl";


const { Search } = Input;
export default function SearchProduct() {
  const t = useTranslations();

  return <Search
        placeholder={t("placeholder-search")}
        size="large"
        role="search"
        disabled={true}
      />
}
