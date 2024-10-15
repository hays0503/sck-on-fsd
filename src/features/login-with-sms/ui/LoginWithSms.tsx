import { Button, Divider, Flex, Input, Typography } from "antd";
import { useState } from "react";
import { useSendSms } from "../model";
import { getSmsAuthToken } from "../api";
import type { GetProps } from "antd";
import { useLocalStorage } from "usehooks-ts";

const { Title, Text } = Typography;
type OTPProps = GetProps<typeof Input.OTP>;

export default function LoginWithSms() {
  const [numberString, setNumberString] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const { smsIdentifier, setPhone } = useSendSms();
  const [, setAccessToken] = useLocalStorage("accessToken", { token: "" });
  const [, setRefreshToken] = useLocalStorage("refreshToken", { token: "" });

  const SendSmsTo = () => {
    if (numberString.replace(/\D/g, "").length === 10) {
      const number = "8" + numberString.replace(/\D/g, "");
      setPhone(number);
      console.log(number);
    }
  };
  const SendCodeInSms = () => {
    if (smsIdentifier) {
      getSmsAuthToken(code, smsIdentifier).then((response) => {
        setAccessToken(response.access);
        setRefreshToken(response.refresh);
      });
    }
  };

  const onChange: OTPProps["onChange"] = (text) => {
    setCode(text);
  };

  const sharedProps: OTPProps = {
    onChange,
  };

  return (
    <Flex
      style={{
        border: "1px solid #D2D2D2",
        borderRadius: "4px",
      }}
      vertical={true}
      gap={10}
    >
      <Title>
        <Text>Вход с помощью СМС</Text>
      </Title>
      <Flex vertical={true} gap={10}>
        <Input
          addonBefore="8"
          value={numberString}
          placeholder="Ваш телефон"
          onChange={(e) => {
            const number = e.target.value.replace(/\D/g, "");

            switch (number.length) {
              case 0:
                setNumberString(``);
              case 1:
                setNumberString(``);
              case 2:
                setNumberString(`(${number}`);
                break;
              case 3:
                setNumberString(`(${number}`);
                break;
              case 4:
                setNumberString(
                  `(${number.slice(0, 3)}) ${number.slice(3, 6)}`
                );
                break;
              case 5:
                setNumberString(
                  `(${number.slice(0, 3)}) ${number.slice(3, 6)}`
                );
                break;
              case 6:
                setNumberString(
                  `(${number.slice(0, 3)}) ${number.slice(3, 6)}`
                );
                break;
              default:
                setNumberString(
                  `(${number.slice(0, 3)}) ${number.slice(
                    3,
                    6
                  )} - ${number.slice(6, 10)}`
                );
            }
          }}
        />
        <Button onClick={SendSmsTo}>Отправить код</Button>
      </Flex>
      <Divider />
      <Flex vertical={true} gap={10}>
        <Input.OTP variant="filled" length={4} {...sharedProps} />
        <Button onClick={SendCodeInSms}>Авторизоваться</Button>
      </Flex>
    </Flex>
  );
}
