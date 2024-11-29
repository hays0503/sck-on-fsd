"use client";

import { Button, Collapse, CollapseProps, Flex, message, Typography } from "antd";
import { Delivered, PaymentOptions, Recipient, Total, Animation } from "./SubModule";
import { useTranslations } from "next-intl";
import { CSSProperties, useEffect, useState } from "react";
import useFetcherBasket from "@/shared/api/fetch/basket";
import { iBasket } from "@/shared/types/basket";
import useSelectedCity from "@/shared/hooks/useSelectedCity";
import { getPrice } from "@/entities/ProductCart";
import beautifulCost from "@/shared/tools/beautifulCost";
import { useUser } from "@/entities/User";
import { useLocalStorage } from "usehooks-ts";

const { Title } = Typography

export type OrderData = {
    "access_token": {
        "access_token": string;
    },
    "comment": string,
    "delivery_address": string,
    "delivery_type": string,
    "email": string,
    "payment_type": string,
    "phone_number": string,
    "shipping_city": string,
    "user_full_name": string,
    "uuid_id": string
}



const OrderMobile: React.FC<{ basket_id: string }> = ({ basket_id }) => {

    const { data: dataBasket, isLoading, error } = useFetcherBasket({ by_id: basket_id });
    const [messageApi, contextHolder] = message.useMessage();
    const [, , removeUUID] = useLocalStorage("uuid_id", "");

    const t = useTranslations();

    const selectedCity = useSelectedCity();

    const accessToken = useUser().accessToken.token;

    const [step, setStep] = useState<number>(1);
    const orderManager = useState<OrderData>({
        "uuid_id": basket_id,
        delivery_type: "DELIVERY",
        shipping_city: selectedCity,

    } as OrderData);
    const [validate, setValidate] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
        {
            key: 1,
            label: <Title level={5} onClick={() => setStep(1)}>1.{t('vyberite-sposob-oplaty')}</Title>,
            children: <PaymentOptions setStep={setStep} orderManager={orderManager} />,
            style: panelStyle,
        },
        {
            key: 2,
            label: <Title level={5} onClick={() => setStep(2)}>2.{t('dostavka')}</Title>,
            children: <Delivered setStep={setStep} orderManager={orderManager} />,
            style: panelStyle,
        },
        {
            key: 3,
            label: <Title level={5} onClick={() => setStep(3)}>3.{t('poluchatel')}</Title>,
            children: <Recipient setStep={setStep} orderManager={orderManager} />,
            style: panelStyle,
        }];

    const panelStyle: React.CSSProperties = {
        marginBottom: 24,
        background: "#fff",
        borderRadius: "#AAAA",
        border: 'none',
    };

    useEffect(() => {
        const validate = orderManager[0]
        if (validate.payment_type && validate.phone_number && validate.user_full_name && validate.delivery_address) {
            setValidate(true);
        }
    }, [orderManager[0]]);

    useEffect(() => {
        orderManager[1]({
            ...orderManager[0], "access_token": {
                "access_token": accessToken,
            },
        });
    }, []);

    const LoadingTotal: React.FC<{ dataBasket: iBasket | undefined, isLoading: boolean, error: boolean }> = ({ dataBasket, isLoading, error }) => {

        if (isLoading) {
            return <Flex justify="center" align="center">
                <Title level={5}>{t("loading")}</Title>
            </Flex>
        }
        if (error) {
            return <Flex justify="center" align="center">
                <Title level={5}>{t("error")}</Title>
            </Flex>
        }
        const total = dataBasket?.basket_items?.reduce((acc, item) => acc + item.count, 0);

        const totalPrice = dataBasket?.basket_items?.reduce((acc, item) => {
            const { price } = getPrice(item.prod, selectedCity);
            return acc + (price ?? 0) * item.count;
        }, 0);

        return <Total total={total ?? 0} totalPrice={beautifulCost(totalPrice ?? 0) ?? ""} />
    }


    const crateOrder = async (Order: OrderData) => {
        try {
            setLoading(true)
            await fetch('/basket_api/v1/order/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(Order),
            }).then((response) => {
                if (response.ok) {
                    return setTimeout(() => {
                        return response.json().then((res) => {
                            if (res?.detail !== 'Упсс ... ограничения базы данных.') {
                                removeUUID();
                                window.location.href = res
                            } else {
                                messageApi.open({
                                    type: 'error',
                                    content: JSON.stringify(res),
                                });
                                return
                            }
                        }
                        );
                    }, 5000)
                }
            })
            setTimeout(() => {
                setLoading(false)
                messageApi.open({
                    type: 'success',
                    content: t("success"),
                });
            }, 5000)
        } catch (e) {
            console.log(e)
            setTimeout(() => {
                setLoading(false)
                messageApi.open({
                    type: 'error',
                    content: JSON.stringify(e),
                });
            }, 5000)
        }
    }


    return <Flex justify="center" align="center" >
        {contextHolder}
        <Flex vertical style={{ width: "95%" }}>
            <LoadingTotal dataBasket={dataBasket} isLoading={isLoading} error={error} />
            <Collapse
                items={getItems(panelStyle)}
                defaultActiveKey={1}
                activeKey={step}
                collapsible="header"
                ghost
            />
            {
                validate &&
                <Button
                    onClick={() => crateOrder(orderManager[0])}
                    style={{ width: "100%" }}
                    type="primary"
                >
                    {t("oformit")}
                </Button>
            }
            {loading && <Animation />}
        </Flex>
    </Flex>
};


export default OrderMobile;