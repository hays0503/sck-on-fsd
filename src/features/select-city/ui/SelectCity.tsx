"use client";
import useFetcherCity from "@/shared/api/fetch/city";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import useSelectCurrentCity from "@/shared/hooks/useSelectCurrentCity";
import searchCity from "@/shared/tools/searchCity";
import { selectDataByLangCity } from "@/shared/tools/selectDataByLang";
import { iCity } from "@/shared/types/city";
import { Button, Col, Input, Modal, Row, Space, Tour, TourProps, Typography,Popconfirm  } from "antd";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { ChangeEvent, useLayoutEffect, useRef, useState } from "react";
import { DownOutlined } from '@ant-design/icons';
import ComponentSelectCityList from "./ComponentSelectCityList";
import { useLocalStorage } from "usehooks-ts";

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
    const refButton = useRef(null);
    const t = useTranslations();
    const [openToor, setOpenToor] = useState(false);
    const [selectCityLocal, setSelectCityLocal] = useLocalStorage<{locale: string; city: string}|null|undefined>("params", undefined);

    useLayoutEffect(() => {
        if (!selectCityLocal?.city) {
            setOpenToor(true);
        }
    },[selectCityLocal])

    const steps: TourProps["steps"] = [
        {
            target: ()=>refButton.current,
            title: t('vybor-goroda'),
            description: t('vyberite-gorod-v-kotorom-vy-khotite-sovershit-pokupku'),
            placement: "bottom",
            type: "primary",
            nextButtonProps:{
                children: t('pereiti-k-vyboru-goroda'),
                onClick: ()=>{setOpenToor(false); setIsOpen(true)}
            } 
        }
    ];

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
                ref={refButton}
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
            <Tour open={openToor} onClose={() => setOpenToor(false)} steps={steps} />
            <Modal
                open={isOpen}
                // onCancel={() => setIsOpen(false)}
                closeIcon={
                    <Popconfirm
                        title={`${t('vybrannyi-vami-gorod')} ${LangCity}?`}
                        onConfirm={() => {
                            setIsOpen(false)
                            setSelectCityLocal({locale: locale, city: cityParam})
                        }}
                        okText="Да"
                        cancelText="Нет">
                        <a>X</a>
                    </Popconfirm>
                }
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
                            <ComponentSelectCityList cities={citiesSearch} setCityLocale={setSelectCityLocal}/>
                        </Col>
                    </Row>
                </Space>
            </Modal>
        </>
    );
}
export default SelectCity