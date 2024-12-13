import { Button } from "antd";
import { CSSProperties } from "react";
import { useBasketAdd } from "../model";
import { iBasket } from "@/shared/types/basket";

interface IIncButtonProps {
  readonly prod_id: number;
  readonly userBasket:iBasket | undefined
  readonly token: string | undefined
}

type TIncButton = React.FC<IIncButtonProps>

const IncButton: TIncButton = ({ prod_id, userBasket,token }) => {

  const styleButton: CSSProperties = {
    color: "gray",
    width: "32px",
    height: "32px",
    border: "none",
    backgroundColor: "#F5F5F5",
  };

  // console.log("IncButton => ", prod_id)

  const addProduct = useBasketAdd({ prod_id, userBasket,token });

  return (
    <Button
      onClick={addProduct}
      icon={
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 10H10M10 10H15M10 10V15M10 10V5"
            stroke="#464646"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      }
      style={styleButton}
    />
  );
};

export { IncButton };
export type { TIncButton }
