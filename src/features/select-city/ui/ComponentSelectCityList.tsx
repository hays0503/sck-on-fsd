"use client";
import { useRouter } from "@/i18n/routing";
import { selectDataByLangCity } from "@/shared/tools/selectDataByLang";
import { iCity } from "@/shared/types/city";
import { Button, Space } from "antd";
import { useLocale } from "next-intl"; 


export default function ComponentSelectCityList({
  cities,
  setCityLocale,
}: {
  cities: iCity[];
  setCityLocale: (city: { city: string; locale: string }) => void;
}) {
  const currentLocale = useLocale();
  const router = useRouter();
  return (
    <>
      <Space size={[8, 16]} wrap>
        {cities?.map((city: iCity) => (
          <Button
            key={city.id}
            data-testid="btn-city"
            onClick={() => {
                setCityLocale({city: city.additional_data.EN, locale: currentLocale});
                router.push(`/city/${city.additional_data.EN}/main`);              
            }}
          >
            {selectDataByLangCity(city, currentLocale)}
          </Button>
        ))}
      </Space>
    </>
  );
}
