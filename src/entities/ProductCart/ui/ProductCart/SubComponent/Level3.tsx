import { Flex } from "antd";

 
 interface ILevel3Props {
    readonly addToCartSlot: JSX.Element;
  }
 
 // Третий уровень карты (В корзину и добавить в избранное)
  const Level3: React.FC<ILevel3Props> = (props) => {
    const {addToCartSlot} = props
    return (
      <Flex
        gap={10}
        style={{ width: "100%" }}
        align="center"
        justify="space-around"
      >
        <>{addToCartSlot}</>
      </Flex>
    );
  };

export default Level3;