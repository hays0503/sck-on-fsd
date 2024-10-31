"use server";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "@/shared/styles/Reset.scss";
import { ConfigProvider } from "antd";

export async function ProvidersServer({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (

      <AntdRegistry>
        <ConfigProvider theme={{ cssVar: true }}>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ConfigProvider>
      </AntdRegistry>

  );
}
