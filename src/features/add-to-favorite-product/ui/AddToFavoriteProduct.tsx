import { Button, Flex } from "antd";

export default function AddToBasketProduct() {
  return (
    <Flex style={{ width: "25px", height: "25px" }} justify="center" align="center">
      <Button type={"text"} shape="default" size="small">
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.4"
            d="M16.6111 3.5C20.1333 3.5 22.5 6.8525 22.5 9.98C22.5 16.3138 12.6778 21.5 12.5 21.5C12.3222 21.5 2.5 16.3138 2.5 9.98C2.5 6.8525 4.86667 3.5 8.38889 3.5C10.4111 3.5 11.7333 4.52375 12.5 5.42375C13.2667 4.52375 14.5889 3.5 16.6111 3.5Z"
            stroke="#0F0F0F"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
    </Flex>
  );
}
