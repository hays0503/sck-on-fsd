"use client";

import { Reviews } from "@/shared/types/reviews";
import { useFetcherReviews } from "../../api";
import { Avatar, Button, Flex, Rate, Typography } from "antd";
import { useTranslations } from "next-intl";
import {  UserOutlined } from '@ant-design/icons';


const { Title, Text } = Typography;


const ReviewsList: React.FC<{productId: number|string}> = ({productId}) => {
  const reviews: Reviews[] = useFetcherReviews(productId).data || [];
  const t = useTranslations();

  const Reviews: React.FC<{ Reviews: Reviews }> = ({ Reviews }) => {
    return (
      <Flex vertical={true} gap={10}>
        <Flex gap={10} align="baseline">
          <Avatar icon={<UserOutlined />} />
          <Title level={5}>Комментатор</Title>
        </Flex>
        <Flex gap={10}>
          <Text>{`${Reviews.rating} ${t("iz")} 5`}</Text>{" "}
          <Rate disabled defaultValue={Reviews.rating} />
        </Flex>
        <Text>{Reviews.review}</Text>
      </Flex>
    );
  };

  const RenderReviews: React.FC = () => {
    return reviews.map((item: Reviews) => (
      <Reviews key={item.id} Reviews={item} />
    ));
  };

  if (reviews.length === 0) {
    return (
      <Flex vertical={true} style={{width:"100%",padding:"10px"}}>
        <Title level={5}>{t("otzyvy")}</Title>
        <Text>
          {t("u-etogo-tovara-eshe-net-otzyvov-vy-mozhete-ostavit-ego-pervym")}
        </Text>
        <Button type="primary" onClick={() => {alert("В разработке")}}>{t("ostavit-otzyv")}</Button>
      </Flex>
    );
  }

  return (
    <Flex vertical={true} style={{width:"100%",padding:"10px"}}>
      <Flex gap={10} align="baseline">
        <Title level={5}>{t("otzyvy")}</Title>
        <Text>{reviews.length}</Text>
      </Flex>
      <RenderReviews />
    </Flex>
  );
};

export default ReviewsList;
