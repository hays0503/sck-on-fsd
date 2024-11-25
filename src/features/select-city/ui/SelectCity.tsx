"use client";
import useFetcherCity from "@/shared/api/fetch/city";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import useSelectCurrentCity from "@/shared/hooks/useSelectCurrentCity";
import searchCity from "@/shared/tools/searchCity";
import { selectDataByLangCity } from "@/shared/tools/selectDataByLang";
import { iCity } from "@/shared/types/city";
import { Button, Col, Input, Modal, Row, Space, Typography } from "antd";
import { useLocale } from "next-intl";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { DownOutlined } from '@ant-design/icons';
import ComponentSelectCityList from "./ComponentSelectCityList";

const { Text } = Typography;
const { Search } = Input;

const SelectCity = () => {
    const locale = useLocale();
    const cityParam = useGetCityParams();
    const cities: iCity[] = useFetcherCity().data ?? [];
    const [isOpen, setIsOpen] = useState(false);
    const [citiesSearch, setCitiesSearch] = useState(cities);
    const city = useSelectCurrentCity("en", cityParam);
    const LangCity = selectDataByLangCity(city, locale);

    const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const filteredCities: iCity[] = searchCity(e.target.value, cities, locale);
        if (filteredCities.length) {
            setCitiesSearch(filteredCities);
        } else {
            setCitiesSearch(cities);
        }
    };


    return (
        <>
            <Button
                type={"text"}
                onClick={() => setIsOpen(true)}
                style={{ padding: 0, border: "1px solid #f4f4f42e" }}
                icon={<Image src={"/place.svg"} width={24} height={24} alt="account" />}
            >
                <Text strong={true} data-testid="select-city">
                    {LangCity}
                </Text>
                <DownOutlined />
            </Button>
            <Modal
                open={isOpen}
                onCancel={() => setIsOpen(false)}
                footer={[]}>
                <Space direction="vertical" size={[16, 16]}>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={24}>
                            <Text>Выбор города</Text>
                        </Col>
                    </Row>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={24}>
                            <Search data-testid="search-city" onChange={onSearch} style={{ width: "320px" }} />
                        </Col>
                    </Row>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={24}>
                            <ComponentSelectCityList cities={citiesSearch} />
                        </Col>
                    </Row>
                </Space>
            </Modal>
        </>
    );
}
export default SelectCity