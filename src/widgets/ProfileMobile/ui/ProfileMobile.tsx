"use client";
import { Flex } from "antd";
import { Level1, Level2, Level3 } from "./SubComponents";
import { useUser } from "@/entities/User-fix";

const ProfileMobile: React.FC = () => {
  const { useIsAnonymous, info, error } = useUser();
  return (
    <Flex gap={10} vertical={true} style={{ width: "100%" }}>
      <Level1 infoUser={info} useIsAnonymous={useIsAnonymous} error={error}/>
      <Level2 infoUser={info} useIsAnonymous={useIsAnonymous} error={error}/>
      <Level3 />
    </Flex>
  );
};
export default ProfileMobile;
