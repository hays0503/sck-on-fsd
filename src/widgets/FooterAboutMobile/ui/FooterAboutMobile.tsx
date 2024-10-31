"use client";
import { Link } from "@/i18n/routing";
import LogoSCK from "@/shared/ui/LogoSCK";
import { Flex,Typography } from "antd";

const { Text, Title } = Typography; 

export default function FooterAboutMobile() {
  return (
    <Flex vertical={true} gap={20} style={{ width: "100%",padding:"20px",backgroundColor:"#fff"}}>

      <LogoSCK />

      <Flex vertical={true}>
        <Title level={5}>РЕКВИЗИТЫ</Title> 
        <Text>ТОО «SCK»</Text>
        <Text>БИН 160440027443</Text>
        <Text>Республика Казахстан, г. Петропавловск, ул. Букетова 31А, БЦ «Алем», офис 5</Text>
        <Text>Тел. +7 705 655 00 00, +7 705 552 21 57</Text>
        <Text>www.sck -1.kz</Text>
        <Text>АО &quot;Народный Банк Казахстана&quot;</Text>
        <Text>БИК HSBKKZKX</Text>
        <Text>ИИК KZ93601A251001294031</Text>
      </Flex>

      <Flex vertical={true}>
      <Title level={5}>СОЦИАЛЬНЫЕ СЕТИ</Title>
      <Link href={"https://wa.me/77056550000"}>WHATSAPP</Link>
      </Flex>

      <Flex vertical={true}>
      <Title level={5}>Компания</Title>
      <Text>О нас</Text>
      <Text>Реквизиты</Text>
      <Text>Контакты</Text>
      <Text>Адреса</Text></Flex>

      <Flex vertical={true}>
      <Title level={5}>ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</Title>
      <Text>Политика конфиденциальности</Text>
      <Text>Политика возвратов</Text>
      </Flex>

      <Text>2024 © SCK All rights reserved</Text>

    </Flex>
  )
}
