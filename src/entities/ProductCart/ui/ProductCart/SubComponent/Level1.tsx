import { Flex, Tag } from "antd";

interface ILevel1Props {
  readonly addToFavoriteSlot: JSX.Element;
  readonly Swiper: JSX.Element;
  readonly discount: number | string | null | undefined;
}

// Первый уровень карты (скидка и слайдер)
const Level1: React.FC<ILevel1Props> = (props) => {
  const { discount, Swiper,  addToFavoriteSlot } = props;
  return (
    <Flex
      vertical={true}
      gap={10}
      align="center"
      style={{ width: "100%" }}
    >
      <Flex
        gap="4px 0"
        align="center"        
        justify="space-between"
        wrap
        style={{ width: "100%",flexDirection: "row-reverse" }}
      >
        <>{addToFavoriteSlot}</>
        {discount && <Tag color="black">{`-${discount}%`}</Tag>}
      </Flex>

      {Swiper}
    </Flex>
  );
};

export default Level1;
