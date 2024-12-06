"use client"
import { Button, Flex, message } from "antd"
import { InputOrderData,Animation } from "./SubModule"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { createOrder } from "../model"
import { useLocalStorage } from "usehooks-ts"


const CreateOrder: React.FC<{ basket_id: string }> = ({ basket_id }) => {
    const t = useTranslations();
    const { OrderData, Context } = InputOrderData({ basket_id })
    const [validate, setValidate] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [, , removeUUID] = useLocalStorage("uuid_id", "");
    useEffect(() => {
        if (OrderData.payment_type &&
            OrderData.phone_number &&
            OrderData.user_full_name &&
            OrderData.delivery_address) {
            setValidate(true);
        }
    }, [OrderData])

    const startCreateOrder = () => {
        setLoading(true);
        createOrder(OrderData).then(({ status, detail, statusCode}) => {
            setTimeout(() => {
                if (status) {
                    setLoading(false);
                    messageApi.open({
                        type: 'success',
                        content: t("success"),
                    })
                    setTimeout(() => {
                        removeUUID();
                        // debugger
                        const urlPayString = detail as string;
                        const url = new URL(urlPayString);
                        window.location.replace(url)    
                    },1000)                    
                }else{
                    setLoading(false);
                    messageApi.open({
                        type: 'error',
                        content: `${t("error")} ${detail} ${statusCode}`,
                    })
                }
            }, 1000);
        });
    }

    return <Flex vertical={true}>
        {contextHolder}
        {Context}
        {loading && <Animation />}
        <Button            
            shape="default"
            size="large"
            disabled={!validate}
            onClick={startCreateOrder}
            style={{ width: "100%" }}
            type="primary"
        >
            {t("oformit")}
        </Button>

    </Flex>
}

export default CreateOrder