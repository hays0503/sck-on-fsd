"use server"
import { ProvidersClient } from "@/shared/providers/providersClient";
import { ProvidersServer } from "@/shared/providers/providersServer";
import HeaderText from "@/shared/ui/HeaderText";
import { FooterMobile } from "@/widgets/FooterMobile";
import { LayoutCustom } from "@/widgets/LayoutCustom";
import { UserMobile } from "@/widgets/UserMobile";

const ProfilePage = async ({
  params,
}: {
  params: { locale: string; city: string };
}) => {
  const fallback = {};

  return (
    <ProvidersServer>
      <ProvidersClient params={params} fallback={fallback}>
        <LayoutCustom
          h="px"
          hightHeader={70}
          hightFooter={70}
          headerContent={<HeaderText text="Данные пользователя"/>}
          content={<UserMobile/>}
          footerContent={<FooterMobile />}
        />
      </ProvidersClient>
    </ProvidersServer>
  );
};

export default ProfilePage;
