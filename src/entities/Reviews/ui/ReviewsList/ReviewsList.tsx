"use client";

import { Reviews } from "@/shared/types/reviews";
import { useFetcherReviews } from "../../api";
import { Avatar, Button, Flex, Rate, Typography } from "antd";
import { useTranslations } from "next-intl";
import { UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const ReviewsList: React.FC<{ productId: number | string }> = ({ productId }) => {
  const reviews: Reviews[] = useFetcherReviews(productId).data || [];
  const t = useTranslations();

  // Рассчитать средний рейтинг и количество отзывов
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  const ReviewItem: React.FC<{ review: Reviews }> = ({ review }) => {
    return (
      <Flex
        vertical={true}
        gap={10}
        itemProp="review"
        itemScope={true}
        itemType="http://schema.org/Review"
      >
        <Flex gap={10} align="baseline">
          <Avatar icon={<UserOutlined />} />
          <Title level={5} itemProp="author">
            {review.user_id || t("kommentator")}
          </Title>
        </Flex>
        <Flex gap={10}>
          <Text itemProp="reviewRating" itemScope={true} itemType="http://schema.org/Rating">
            <span itemProp="ratingValue">{review.rating}</span> {t("iz")} 5
          </Text>
          <Rate disabled defaultValue={review.rating} />
        </Flex>
        <Text itemProp="reviewBody">{review.review}</Text>
      </Flex>
    );
  };

  const RenderReviews: React.FC = () => {
    return reviews.map((item: Reviews) => (
      <ReviewItem key={item.id} review={item} />
    ));
  };

  if (reviews.length === 0) {
    return (
      <Flex vertical={true} style={{ width: "100%", padding: "10px" }}>
        <Title level={5}>{t("otzyvy")}</Title>
        <Text>
          {t("u-etogo-tovara-eshe-net-otzyvov-vy-mozhete-ostavit-ego-pervym")}
        </Text>
        <Button type="primary" onClick={() => alert("В разработке")}>
          {t("ostavit-otzyv")}
        </Button>
      </Flex>
    );
  }

  return (
    <Flex
      vertical={true}
      style={{ width: "100%", padding: "10px" }}
      itemScope={true}
      itemType="http://schema.org/Product"
    >
      <meta itemProp="productID" content={productId.toString()} />
      <Flex gap={10} align="baseline">
        <Title level={5} itemProp="name">
          {t("otzyvy")}
        </Title>
        <Text>
          <span >{averageRating.toFixed(1)}</span> {t("iz")} 5 ({reviews.length} {t("otzyvov")})
        </Text>
      </Flex>
      <RenderReviews />
    </Flex>
  );
};

export default ReviewsList;
