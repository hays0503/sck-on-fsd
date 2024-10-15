"use client";
import { UserProfile } from "@/entities/user";
import { LoginWithGoogle } from "@/features/login-with-google";
import { LoginWithSms } from "@/features/login-with-sms";
import { Flex, Typography } from "antd";

const { Text } = Typography;

export default function HomePage() {
  const [UserEntities, UserData] = UserProfile();
  return (
    <Flex vertical={true} gap={20}>
      

      <Flex
        vertical={false}
        gap={10}
        style={{ width: "190px", height: "44px", border: "1px solid #D2D2D2", borderRadius: "4px" }}
        align="center"
        justify="center"
      >
        <div style={{ width: "20%" }}>
          {UserEntities}
        </div>
        <Text style={{ width: "60%",color:"#808185" }}>
          {`${UserData?.info?.user?.first_name??"Авторизоваться"} ${UserData?.info?.user?.last_name??""}`}
        </Text>
      </Flex>

      <LoginWithGoogle />

      <LoginWithSms />
    </Flex>
  );
}
