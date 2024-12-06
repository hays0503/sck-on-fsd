"use client";
import useFetcherBasket from "@/shared/api/fetch/basket";
import { Badge, Flex, Typography } from "antd"
import { useTranslations } from "next-intl";
import { CSSProperties, useEffect, useState } from "react";
import { motion } from "framer-motion";
const { Text } = Typography;

export const Label: React.FC<{ styleActive: CSSProperties, styleActiveBg: string, styleActiveAccent: string }> = ({ styleActive, styleActiveBg, styleActiveAccent }) => {
    const t = useTranslations();
    return <Flex vertical={true} gap={"10px"} align="center">
        <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M6.30847 18.71L4.70847 10.71H20.2685L18.6685 18.71H6.30847ZM5.48847 20.71H19.4885C20.0285 20.71 20.3685 20.42 20.4685 19.91L22.4285 10.11C22.5385 9.58 22.4385 9.24 22.0485 8.85L15.1985 2L13.7785 3.42L18.1085 7.74C18.8285 8.46 19.5085 8.59 20.5285 8.59V8.71H4.45847V8.59C5.47847 8.59 6.15847 8.46 6.87847 7.74L11.1985 3.42L9.77847 2L2.90847 8.82C2.49847 9.23 2.43847 9.57 2.54847 10.11L4.50847 19.91C4.60847 20.42 4.94847 20.71 5.48847 20.71Z"
                fill={styleActiveBg}
            />
            <path
                d="M9.49847 23C10.3289 23 10.9985 22.3284 10.9985 21.5C10.9985 20.6716 10.3289 20 9.49847 20C8.67006 20 7.99847 20.6716 7.99847 21.5C7.99847 22.3284 8.67006 23 9.49847 23Z"
                fill={styleActiveAccent}
            />
            <path
                d="M16.9985 23C17.8289 23 18.4985 22.3284 18.4985 21.5C18.4985 20.6716 17.8289 20 16.9985 20C16.1701 20 15.4985 20.6716 15.4985 21.5C15.4985 22.3284 16.1701 23 16.9985 23Z"
                fill={styleActiveAccent}
            />
        </svg>
        <Text style={styleActive}>{t("korzina")}</Text>
    </Flex>
}

const BasketLabelBadger: React.FC<{ uuid_id: string, styleActive: CSSProperties, styleActiveBg: string, styleActiveAccent: string }> = ({ uuid_id, styleActive, styleActiveBg, styleActiveAccent }) => {
    const { data: dataBasket } = useFetcherBasket({ by_id: uuid_id });
    const countProductInBasket = dataBasket?.basket_items?.reduce((acc, item) => acc + item.count, 0);
    const [animation, setAnimation] = useState(false);
    useEffect(() => {
        setAnimation(true);
        setTimeout(() => setAnimation(false), 200);
    },[countProductInBasket])
    return <Badge count={countProductInBasket ?? 0} size="small" >
            <motion.div animate={{ x: animation ? [0, 10, 0,-10, 0,0, 10, 0,-10, 0,0, 10, 0,-10, 0,0, 10, 0,-10, 0,0, 10, 0,-10, 0,0, 10, 0,-10, 0] : 0 }}>
                <Label styleActive={styleActive} styleActiveBg={styleActiveBg} styleActiveAccent={styleActiveAccent} />
            </motion.div>
        </Badge>

}

export const BasketLabel: React.FC<{ uuid_id: string|undefined|null, styleActive: CSSProperties, styleActiveBg: string, styleActiveAccent: string }> = ({ uuid_id, styleActive, styleActiveBg, styleActiveAccent }) => {
    return <BasketLabelBadger uuid_id={uuid_id} styleActive={styleActive} styleActiveBg={styleActiveBg} styleActiveAccent={styleActiveAccent} />
}