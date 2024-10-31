import beautifulCost from "@/shared/tools/beautifulCost";
import { Flex, Rate, Typography } from "antd";
import { useTranslations } from "next-intl";
import { CSSProperties } from "react";
const { Text } = Typography;

interface ILevel2Props {
  name: string | undefined | null;
  average_rating: number | undefined | null;
  reviews_count: number | undefined | null;
  price: number | undefined | null;
  discountPrice: number | undefined | null;
}

// Второй уровень карты (описание,рейтинг-кол отзывов,цена)
const Level2: React.FC<ILevel2Props> = (props) => {
  const t = useTranslations();
  const { name, average_rating, reviews_count, price, discountPrice } = props;
  return (
    <Flex
      vertical={true}
      gap={"0.1em"}
      justify="flex-start"
      style={{
        width: "100%",
        minHeight: "120px",
      }}
    >
      <div
        style={{
          display: "-webkit-box",
          fontSize: "12px",
          fontWeight: "400",
          lineHeight: "1em",
          letterSpacing: "0.001em",
          color: "#464646",
          textOverflow: "ellipsis",
          overflow: "hidden",
          WebkitLineClamp: 2, // Ограничивает количество строк до двух
          WebkitBoxOrient: "vertical", // Ориентация контейнера для использования ellipsis на нескольких строках
          wordBreak: "break-word", // Перенос длинных слов на новую строку
          overflowWrap: "break-word", // Дополнительная защита от переполнения
          height: "4em", // Высота для двух строк с учётом lineHeight
          width: "100%",
        }}
      >
        {name}
      </div>

      <Flex justify="space-around" align="center" gap={5}>
        <Flex align="center" justify="flex-start" gap={5}>
          <Text
            style={{
              fontSize: "12px",
              lineHeight: "18px",
              fontWeight: "400",
              letterSpacing: "-0.6px",
              color: "#FFA600",
            }}
          >{`${average_rating ?? 0}`}</Text>
          <Rate
            disabled
            allowHalf
            defaultValue={average_rating ?? 0}
            style={
              {
                fontSize: "8px",
                color: "#FFA600",
                "--ant-margin-xs": "1px",
              } as CSSProperties
            }
          />
        </Flex>

        <Flex vertical={true} gap={5}>
          <Text
            style={{
              fontSize: "12px",
              lineHeight: "18px",
              fontWeight: "400",
              letterSpacing: "-0.6px",
            }}
          >{`  - ${reviews_count ?? 0} ${t("otzyvov")} `}</Text>
        </Flex>
      </Flex>

      {!discountPrice ? (
        <Flex vertical={true} justify="flex-start">
          <Text>{beautifulCost(price ?? 0)}</Text>
        </Flex>
      ) : (
        <Flex vertical={true} justify="flex-start">
          <Flex>
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.1 5.27926C15.7019 5.11392 15.3857 4.79723 15.2209 4.39881L15.2211 4.40122L14.6426 3.00461C14.4776 2.60626 14.1611 2.28978 13.7627 2.12477C13.3643 1.95976 12.9168 1.95973 12.5184 2.12468L11.1216 2.70076C10.7234 2.86599 10.2759 2.86633 9.87748 2.70169L8.48233 2.12378C8.08389 1.95874 7.63621 1.95874 7.23778 2.12378C6.83934 2.28883 6.52278 2.6054 6.35774 3.00385L5.77944 4.40005C5.61399 4.79776 5.2975 5.11358 4.89944 5.27817L3.50429 5.85608C3.3069 5.93777 3.12754 6.05756 2.97645 6.2086C2.82537 6.35964 2.70553 6.53897 2.62378 6.73635C2.54203 6.93372 2.49997 7.14527 2.5 7.35891C2.50003 7.57254 2.54216 7.78408 2.62398 7.98143L3.20104 9.37863C3.36627 9.77684 3.3666 10.2244 3.20197 10.6228L2.62408 12.018C2.45938 12.4164 2.45961 12.8639 2.62471 13.2621C2.7898 13.6604 3.10627 13.9767 3.50453 14.1417L4.90068 14.72C5.29884 14.8854 5.61504 15.2021 5.77977 15.6005L6.35825 16.9971C6.5234 17.3951 6.83978 17.7113 7.23789 17.8762C7.63601 18.0411 8.0833 18.0413 8.48151 17.8766L9.87766 17.2991C10.2759 17.1339 10.7234 17.1335 11.1218 17.2982L12.517 17.8761C12.9154 18.0411 13.3631 18.0411 13.7615 17.8761C14.16 17.711 14.4765 17.3945 14.6416 16.996L15.2199 15.5998C15.3852 15.2016 15.7019 14.8854 16.1003 14.7207L17.4954 14.1428C17.6928 14.0611 17.8722 13.9413 18.0233 13.7903C18.1743 13.6392 18.2942 13.4599 18.3759 13.2625C18.4577 13.0651 18.4998 12.8536 18.4997 12.64C18.4997 12.4263 18.4576 12.2148 18.3757 12.0174L17.7989 10.6227C17.633 10.2242 17.6332 9.77607 17.7983 9.37744L18.3762 7.98225C18.5413 7.58379 18.5413 7.1361 18.3762 6.73765C18.2112 6.33919 17.8946 6.02263 17.4962 5.85758L16.1 5.27926Z"
                fill="#FF3E4A"
                stroke="#FF3E4A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.5 7L7.5 13"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.925 7.425H7.9335M8.35 7.425C8.35 7.65972 8.15972 7.85 7.925 7.85C7.69028 7.85 7.5 7.65972 7.5 7.425C7.5 7.19028 7.69028 7 7.925 7C8.15972 7 8.35 7.19028 8.35 7.425Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.0754 12.5734H13.0839M13.5004 12.5734C13.5004 12.8082 13.3101 12.9984 13.0754 12.9984C12.8407 12.9984 12.6504 12.8082 12.6504 12.5734C12.6504 12.3387 12.8407 12.1484 13.0754 12.1484C13.3101 12.1484 13.5004 12.3387 13.5004 12.5734Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <Text strong style={{ color: "#FF3E4A" }}>{`${beautifulCost(
              price ?? 0
            )}`}</Text>
          </Flex>
          <Text delete disabled style={{ fontSize: "12px" }}>
            {beautifulCost(discountPrice)}
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default Level2;
