"use client";
import { useUser } from "../model";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { ResponseUserInfo } from "../api/getUserInfo";


type UserProfileReturnValue = [
  JSX.Element,
  {
    useIsAnonymous:() => boolean | undefined;
    info: ResponseUserInfo | null;
    error: boolean;
  }
]

export default function UserProfile():UserProfileReturnValue {
  const data = useUser();
  return [
    <>
      <Avatar
        size={32}
        icon={<UserOutlined />}
        alt={data.info?.user?.first_name}
      />
    </>,
    data,
  ];
}
