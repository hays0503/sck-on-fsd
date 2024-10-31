"use client";
import { useRouter } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { Flex, Tabs, TabsProps, Typography } from "antd";
import {  useTranslations } from "next-intl";
import Image from "next/image";
import { CSSProperties, useState } from "react";

const { Text } = Typography;

export default function FooterMobile({defaultKey}: {defaultKey?: string}) {
  const t = useTranslations();
  const currentCity = useGetCityParams();
  const [current, setCurrent] = useState<string>(defaultKey??"1");
  const router = useRouter();

  const items: TabsProps["items"] = [
    {
      label: (
        <Flex vertical={true} gap={"10px"} align="center">
          <Image src="/logo.svg" alt="logo" height={24} width={43} />
          <Text style={returnStyleActive("1", current)}>{t("glavnaya")}</Text>
        </Flex>
      ),
      key: "1",
    },
    {
      label: (
        <Flex vertical={true} gap={"10px"} align="center">
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.75 13V13.12C3.68 13.12 4.25 13.61 4.25 14.66V15H6.25V13H2.75ZM10.25 9H18.25V7H10.25V9ZM22.25 5H10.25V3H22.25V5ZM2.25 12C2.25 11.45 2.7 11 3.25 11H7.25C7.8 11 8.25 11.45 8.25 12V16C8.25 16.55 7.8 17 7.25 17H3.25C2.7 17 2.25 16.55 2.25 16V12ZM2.75 5V5.12C3.68 5.12 4.25 5.61 4.25 6.66V7H6.25V5H2.75ZM2.25 4C2.25 3.45 2.7 3 3.25 3H7.25C7.8 3 8.25 3.45 8.25 4V8C8.25 8.55 7.8 9 7.25 9H3.25C2.7 9 2.25 8.55 2.25 8V4Z"
              fill={returnStyleActiveBg("2", current)}
            />
            <path
              d="M12.9901 17.8502L12.4001 13.1502L17.1001 13.7402L16.5401 14.2902C16.1501 14.6802 16.1501 15.3202 16.5401 15.7102L18.8401 18.0002L17.2501 19.5902L14.9601 17.2902C14.5701 16.9002 13.9401 16.9002 13.5401 17.2902L12.9901 17.8502ZM11.3801 11.0102C10.6701 10.9202 10.1801 11.4702 10.2601 12.1202L11.2601 20.1202C11.3701 20.9902 12.3701 21.3002 12.9601 20.7102L14.2501 19.4102L16.5401 21.7102C16.9401 22.1002 17.5701 22.1002 17.9601 21.7102L20.9601 18.7102C21.3501 18.3202 21.3501 17.6802 20.9601 17.2902L18.6701 15.0002L19.9601 13.7102C20.5701 13.1002 20.2201 12.1102 19.3801 12.0102L11.3801 11.0102Z"
              fill={returnStyleActiveAccent("2", current)}
            />
          </svg>
          <Text style={returnStyleActive("2", current)}>{t("katalog")}</Text>
        </Flex>
      ),
      key: "2",
    },
    {
      label: (
        <Flex vertical={true} gap={"10px"} align="center">
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.30847 18.71L4.70847 10.71H20.2685L18.6685 18.71H6.30847ZM5.48847 20.71H19.4885C20.0285 20.71 20.3685 20.42 20.4685 19.91L22.4285 10.11C22.5385 9.58 22.4385 9.24 22.0485 8.85L15.1985 2L13.7785 3.42L18.1085 7.74C18.8285 8.46 19.5085 8.59 20.5285 8.59V8.71H4.45847V8.59C5.47847 8.59 6.15847 8.46 6.87847 7.74L11.1985 3.42L9.77847 2L2.90847 8.82C2.49847 9.23 2.43847 9.57 2.54847 10.11L4.50847 19.91C4.60847 20.42 4.94847 20.71 5.48847 20.71Z"
              fill={returnStyleActiveBg("3", current)}
            />
            <path
              d="M9.49847 23C10.3289 23 10.9985 22.3284 10.9985 21.5C10.9985 20.6716 10.3289 20 9.49847 20C8.67006 20 7.99847 20.6716 7.99847 21.5C7.99847 22.3284 8.67006 23 9.49847 23Z"
              fill={returnStyleActiveAccent("3", current)}
            />
            <path
              d="M16.9985 23C17.8289 23 18.4985 22.3284 18.4985 21.5C18.4985 20.6716 17.8289 20 16.9985 20C16.1701 20 15.4985 20.6716 15.4985 21.5C15.4985 22.3284 16.1701 23 16.9985 23Z"
              fill={returnStyleActiveAccent("3", current)}
            />
          </svg>
          <Text style={returnStyleActive("3", current)}>{t("korzina")}</Text>
        </Flex>
      ),
      key: "3",
    },
    {
      label: (
        <Flex vertical={true} gap={"10px"} align="center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.4 12.78V10.57C10.71 10.3 9.98 10.12 9.22 10.04V9.93C11.59 9.54 13.4 7.48 13.4 5C13.4 2.24 11.16 0 8.4 0C5.64 0 3.4 2.24 3.4 5C3.4 7.48 5.21 9.54 7.58 9.93V10.04C4.39 10.36 1.7 12.52 0.67 15.5C0.28 16.63 0.18 17.85 0.08 19.05L0 20H2.01L2.08 19.05C2.17 17.85 2.26 16.71 2.75 15.66C3.81 13.39 5.97 12 8.4 12C9.47 12 10.49 12.27 11.4 12.78ZM5.4 5C5.4 3.34 6.74 2 8.4 2C10.06 2 11.4 3.34 11.4 5C11.4 6.66 10.06 8 8.4 8C6.74 8 5.4 6.66 5.4 5Z"
              fill={returnStyleActiveBg("4", current)}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.8199 18C16.9245 18 17.8199 17.1046 17.8199 16C17.8199 14.8954 16.9245 14 15.8199 14C14.7154 14 13.8199 14.8954 13.8199 16C13.8199 17.1046 14.7154 18 15.8199 18ZM15.8199 20C18.0291 20 19.8199 18.2091 19.8199 16C19.8199 13.7909 18.0291 12 15.8199 12C13.6108 12 11.8199 13.7909 11.8199 16C11.8199 18.2091 13.6108 20 15.8199 20Z"
              fill={returnStyleActiveAccent("4", current)}
            />
          </svg>

          <Text style={returnStyleActive("4", current)}>{t("profil")}</Text>
        </Flex>
      ),
      key: "4",
    },
  ];

  const TabsProperties: TabsProps = {
    defaultActiveKey:current,
    style: { "--ant-tabs-horizontal-item-gutter": "3.5dvw" } as CSSProperties,
    accessKey: current,
    onTabClick: (key) => setCurrent(key),
    size: "small",
    centered: true,
    tabPosition: "bottom",
    items: items,
  };

  return (
    <Flex
      style={{ width: "100%", height: "100%" }}
      justify="center"
      align="center"
    >
      <Tabs
        {...TabsProperties}
        onTabClick={(key: string) => {
          // Если выбран профиль
          if(key==="1"){
            router.push(`/${currentCity}/main`)
          }
          if(key==="4"){
            router.push(`/${currentCity}/profile`)
          }
        }}
      />
    </Flex>
  );
}

const returnStyleActive = (key: string, current: string): CSSProperties => {
  return {
    color: key === current ? "#3F54CF" : "#8E8E8E",
  };
};

const returnStyleActiveAccent = (key: string, current: string): string => {
  return key === current ? "#3F54CF" : "#8E8E8E";
};

const returnStyleActiveBg = (key: string, current: string): string => {
  return key === current ? "#A53594" : "#8E8E8E";
};
