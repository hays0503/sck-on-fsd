"use client";
import { useRouter } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { Button, Flex, Typography } from "antd";
import { useLocalStorage } from "usehooks-ts";

const { Title } = Typography;

export default function Logout() {
  const currentCity = useGetCityParams();
  const router = useRouter();
  const [,,removeAccessToken] = useLocalStorage("accessToken", { token: "" });
  const [,,removeRefreshToken] = useLocalStorage("refreshToken", { token: "" });
  return (
    <Flex
      vertical={true}
      gap={10}
      justify="center"
      align="center"
      style={{ width: "100%" }}
    >
      <Title>Вы действительно хотите выйти?</Title>
      <Flex gap={10}>
        <Button
          type="primary"
          onClick={() => {
            // Отчистка локал стора
            removeAccessToken();
            removeRefreshToken();
            router.replace(`/${currentCity}/main`);
          }}
        >
          Да
        </Button>
        <Button
          type="primary"
          onClick={() => {
            // Возврат на образную страницу
            router.back();
          }}
        >
          Нет
        </Button>
      </Flex>
    </Flex>
  );
}
