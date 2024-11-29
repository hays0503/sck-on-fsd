import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { UserInfo } from "@/shared/types/user";
import { Flex, message, Typography } from "antd";
import { useTranslations } from "next-intl";
import React from "react";

const { Title } = Typography;

const ElementList: React.FC<{
  title: string;
  href: string;
  disabled?: boolean;
  color?: string;
  icon?: React.ReactNode;
}> = (props) => {
  const t = useTranslations();
  const { title, href, disabled, color, icon } = props;
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <>
      {contextHolder}
      <Flex
        align="center"
        justify="center"
        style={{
          width: "100%",
          backgroundColor: `${disabled ? "#f0f0f0" : "#fff"}`,
          border: "1px solid #d7d7d7",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
          padding: "10px",
          cursor: `${disabled ? "not-allowed" : "pointer"}`,
        }}
        onClick={() => {
          if (disabled) {
            messageApi.open({
              type: "error",
              content: t("vy-ne-avtorizovany"),
            });
          }
        }}
      >
        <Flex align="center" justify="space-between" style={{ width: "95%" }}>
          <Flex align="normal" justify="space-between" gap={10}>
            {icon}
            <Title level={5} style={{ color }}>
              {title}
            </Title>
          </Flex>
          <Link href={disabled ? "#" : href}>
            <svg
              width="48"
              height="112"
              viewBox="0 0 24 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.26399 22.2636C8.91252 22.6151 8.91252 23.1849 9.264 23.5364L13.7276 28L9.26399 32.4636C8.91252 32.8151 8.91252 33.3849 9.264 33.7364C9.61547 34.0879 10.1853 34.0879 10.5368 33.7364L15.6368 28.6364C15.9883 28.2849 15.9883 27.715 15.6368 27.3636L10.5368 22.2636C10.1853 21.9121 9.61546 21.9121 9.26399 22.2636Z"
                fill="#99A2AD"
              />
            </svg>
          </Link>
        </Flex>
      </Flex>
    </>
  );
};

interface Level2Props {
  readonly IsAnonymous: boolean|undefined;
  readonly infoUser: UserInfo | null;
  readonly error: boolean;
}

const Level2: React.FC<Level2Props> = (props) => {

  const isGuest = props.IsAnonymous;

  const currentCity = useGetCityParams();
  const t = useTranslations();

  return (
    <Flex vertical={true} gap={10} align="center" style={{ width: "100%" }}>
      <ElementList
        title={t("istoriya-zakazov")}
        href={`/city/${currentCity}/main`}
        disabled={isGuest}
        icon={
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.9166 8.48942L14 13.9987M14 13.9987L4.0833 8.48942M14 13.9987L14 25.082M24.5 13.9987V9.26373C24.5 8.86398 24.5 8.66411 24.4411 8.48584C24.389 8.32814 24.3038 8.18338 24.1913 8.06124C24.064 7.92318 23.8893 7.82611 23.5399 7.63197L14.9065 2.83568C14.5757 2.65186 14.4102 2.55995 14.235 2.52392C14.08 2.49203 13.92 2.49203 13.765 2.52392C13.5898 2.55995 13.4243 2.65186 13.0935 2.83568L4.46013 7.63198C4.11069 7.82611 3.93597 7.92318 3.80874 8.06124C3.69618 8.18338 3.61101 8.32814 3.5589 8.48585C3.5 8.66411 3.5 8.86399 3.5 9.26374V18.7337C3.5 19.1334 3.5 19.3333 3.5589 19.5116C3.61101 19.6693 3.69618 19.8141 3.80874 19.9362C3.93596 20.0742 4.1107 20.1713 4.46013 20.3655L13.0935 25.1618C13.4243 25.3456 13.5898 25.4375 13.765 25.4735C13.92 25.5054 14.08 25.5054 14.235 25.4735C14.4102 25.4375 14.5757 25.3456 14.9065 25.1618L15.1667 25.0172M25.6667 25.082L24.5 23.9154M25.6667 20.9987C25.6667 22.9317 24.0997 24.4987 22.1667 24.4987C20.2337 24.4987 18.6667 22.9317 18.6667 20.9987C18.6667 19.0657 20.2337 17.4987 22.1667 17.4987C24.0997 17.4987 25.6667 19.0657 25.6667 20.9987Z"
              stroke="#715EFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      />
      <ElementList
        title={t("izbrannye-tovary")}
        href={`/city/${currentCity}/main`}
        disabled={isGuest}
        icon={
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 8.97686C11.6667 3.50002 3.5 4.08335 3.5 11.0834C3.5 18.0834 14 23.9169 14 23.9169C14 23.9169 24.5 18.0834 24.5 11.0834C24.5 4.08335 16.3333 3.50002 14 8.97686Z"
              stroke="#715EFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      />
      <ElementList
        title={t("otzyvy")}
        href={`/city/${currentCity}/main`}
        disabled={isGuest}
        icon={
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5494 19.2373C14.6411 19.0072 17.889 15.5752 17.889 11.3749C17.889 7.02572 14.4067 3.5 10.111 3.5C5.81534 3.5 2.33301 7.02572 2.33301 11.3749C2.33301 12.9246 2.77498 14.3696 3.53845 15.588L2.98877 17.2576L2.9879 17.26C2.77736 17.8995 2.67205 18.2194 2.74704 18.4323C2.81238 18.6178 2.95743 18.7641 3.14069 18.8302C3.35027 18.9059 3.66401 18.8 4.29137 18.5883L4.3003 18.5855L5.94983 18.029C7.15317 18.802 8.5805 19.2496 10.1111 19.2496C10.2582 19.2496 10.4043 19.2455 10.5494 19.2373ZM10.5494 19.2373C10.5495 19.2376 10.5493 19.237 10.5494 19.2373ZM10.5494 19.2373C11.6136 22.3026 14.4979 24.5 17.8892 24.5C19.4198 24.5 20.8468 24.052 22.0501 23.279L23.6992 23.8355L23.7025 23.8361C24.334 24.0493 24.6505 24.1561 24.8608 24.0802C25.044 24.014 25.1872 23.8677 25.2526 23.6822C25.3277 23.469 25.2227 23.1487 25.0115 22.5075L24.4619 20.8379L24.646 20.529C25.296 19.3784 25.6663 18.0454 25.6663 16.6249C25.6663 12.2757 22.1847 8.74995 17.889 8.74995L17.5979 8.75538L17.451 8.76265"
              stroke="#715EFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      />
      <ElementList
        title={t("sravnenie-tovarov")}
        href={`/city/${currentCity}/main`}
        icon={
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.33301 19.8333V19.6581C2.33301 19.2889 2.33301 19.1042 2.36125 18.9244C2.38632 18.7647 2.42793 18.608 2.48539 18.4569C2.55011 18.2867 2.64171 18.1264 2.8249 17.8059L6.99967 10.5M2.33301 19.8333C2.33301 22.4107 4.42235 24.5 6.99967 24.5C9.577 24.5 11.6663 22.4107 11.6663 19.8333M2.33301 19.8333V19.6C2.33301 19.2733 2.33301 19.11 2.39659 18.9852C2.45251 18.8754 2.54175 18.7862 2.65151 18.7302C2.7763 18.6667 2.93964 18.6667 3.26634 18.6667H10.733C11.0597 18.6667 11.2231 18.6667 11.3478 18.7302C11.4576 18.7862 11.5468 18.8754 11.6028 18.9852C11.6663 19.11 11.6663 19.2733 11.6663 19.6V19.8333M6.99967 10.5L11.1744 17.8059C11.3576 18.1264 11.4492 18.2867 11.514 18.4569C11.5714 18.608 11.613 18.7647 11.6381 18.9244C11.6663 19.1042 11.6663 19.2889 11.6663 19.6581V19.8333M6.99967 10.5L20.9997 8.16667M16.333 17.5V17.3248C16.333 16.9555 16.333 16.7709 16.3612 16.591C16.3863 16.4313 16.4279 16.2747 16.4854 16.1236C16.5501 15.9534 16.6417 15.7931 16.8249 15.4725L20.9997 8.16667M16.333 17.5C16.333 20.0773 18.4223 22.1667 20.9997 22.1667C23.577 22.1667 25.6663 20.0773 25.6663 17.5M16.333 17.5V17.2667C16.333 16.94 16.333 16.7766 16.3966 16.6518C16.4525 16.5421 16.5418 16.4528 16.6515 16.3969C16.7763 16.3333 16.9396 16.3333 17.2663 16.3333H24.733C25.0597 16.3333 25.2231 16.3333 25.3478 16.3969C25.4576 16.4528 25.5468 16.5421 25.6028 16.6518C25.6663 16.7766 25.6663 16.94 25.6663 17.2667V17.5M20.9997 8.16667L25.1744 15.4725C25.3576 15.7931 25.4492 15.9534 25.514 16.1236C25.5714 16.2747 25.613 16.4313 25.6381 16.591C25.6663 16.7709 25.6663 16.9555 25.6663 17.3248V17.5M13.9997 3.5V9.33333"
              stroke="#715EFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      />
      <ElementList
        title={t("nastroi-ki")}
        href={`/city/${currentCity}/main`}
        icon={
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.7416 10.4091L23.3143 10.1714C23.248 10.1345 23.2154 10.116 23.1833 10.0968C22.8647 9.90595 22.5962 9.64226 22.4002 9.32679C22.3805 9.29505 22.3619 9.26176 22.3239 9.19597C22.286 9.13026 22.2667 9.09696 22.2491 9.064C22.0733 8.73579 21.9782 8.37003 21.9725 7.99776C21.972 7.96034 21.9721 7.9221 21.9734 7.84607L21.9817 7.34994C21.9951 6.55599 22.0018 6.15778 21.8902 5.80041C21.7911 5.48298 21.6253 5.1906 21.4039 4.94248C21.1536 4.66202 20.8072 4.46192 20.1136 4.06225L19.5375 3.73026C18.8458 3.3317 18.4999 3.13235 18.1327 3.05635C17.8079 2.98912 17.4726 2.99223 17.1489 3.0649C16.7836 3.14691 16.442 3.35145 15.7592 3.76031L15.7553 3.76216L15.3425 4.00933C15.2772 4.04842 15.2442 4.06812 15.2115 4.0863C14.8868 4.26681 14.5244 4.36662 14.1531 4.37854C14.1157 4.37974 14.0776 4.37974 14.0015 4.37974C13.9259 4.37974 13.8862 4.37974 13.8489 4.37854C13.4768 4.36657 13.1136 4.26622 12.7884 4.08496C12.7557 4.0667 12.7232 4.04684 12.6578 4.00757L12.2424 3.75818C11.5549 3.34545 11.2107 3.13877 10.8433 3.05635C10.5183 2.98343 10.1819 2.98142 9.85589 3.04952C9.48775 3.12641 9.14173 3.32724 8.44968 3.72889L8.4466 3.73026L7.87766 4.06047L7.87137 4.06432C7.18555 4.46236 6.84181 4.66186 6.59365 4.94118C6.37343 5.18905 6.20882 5.48097 6.1103 5.79756C5.99893 6.15542 6.00487 6.55448 6.01829 7.35217L6.02662 7.84761C6.02789 7.92263 6.03007 7.95991 6.02953 7.99681C6.02401 8.36984 5.92767 8.73635 5.75137 9.06514C5.73393 9.09766 5.71515 9.13018 5.67763 9.19513C5.64009 9.26012 5.6219 9.29244 5.60244 9.32381C5.40559 9.64097 5.13583 9.90619 4.81522 10.0974C4.78351 10.1163 4.75009 10.1345 4.68442 10.1709L4.26259 10.4046C3.56076 10.7935 3.20993 10.9882 2.95465 11.2652C2.72881 11.5102 2.55821 11.8008 2.45407 12.1174C2.33635 12.4752 2.33645 12.8764 2.33828 13.6788L2.33976 14.3346C2.34158 15.1317 2.34406 15.5299 2.46204 15.8853C2.56642 16.1997 2.73577 16.4887 2.96035 16.7322C3.21418 17.0075 3.56153 17.2009 4.25803 17.5884L4.6761 17.821C4.74725 17.8606 4.78305 17.8801 4.81736 17.9008C5.13506 18.0921 5.40271 18.3566 5.59788 18.6719C5.61896 18.706 5.6392 18.7413 5.67968 18.8121C5.71965 18.8819 5.7401 18.9168 5.75859 18.9518C5.92971 19.2758 6.02133 19.6357 6.02757 20.0021C6.02825 20.0417 6.02767 20.0817 6.02631 20.1621L6.01829 20.6376C6.00477 21.438 5.99889 21.8387 6.11091 22.1975C6.21001 22.515 6.37565 22.8073 6.59706 23.0555C6.84734 23.3359 7.19431 23.5359 7.88792 23.9356L8.46391 24.2675C9.15557 24.6661 9.50127 24.8652 9.86847 24.9412C10.1933 25.0084 10.5288 25.0058 10.8524 24.9331C11.2183 24.851 11.5611 24.6457 12.2458 24.2357L12.6586 23.9886C12.7239 23.9495 12.757 23.9298 12.7897 23.9117C13.1144 23.7312 13.4764 23.6308 13.8477 23.6189C13.8851 23.6177 13.9232 23.6177 13.9993 23.6177C14.0756 23.6177 14.1136 23.6177 14.1511 23.6189C14.5232 23.6309 14.8875 23.7315 15.2126 23.9128C15.2412 23.9287 15.2699 23.946 15.3202 23.9762L15.7591 24.2397C16.4466 24.6525 16.7902 24.8585 17.1575 24.9409C17.4825 25.0139 17.8192 25.0168 18.1452 24.9487C18.5133 24.8719 18.86 24.6706 19.5517 24.2692L20.1292 23.934C20.8154 23.5357 21.1595 23.336 21.4078 23.0566C21.628 22.8087 21.7928 22.5169 21.8913 22.2003C22.0019 21.8451 21.9952 21.4491 21.982 20.6629L21.9734 20.1502C21.9721 20.0752 21.972 20.0378 21.9725 20.0009C21.978 19.6279 22.0728 19.2611 22.2491 18.9323C22.2665 18.8999 22.2854 18.8671 22.3228 18.8024C22.3604 18.7374 22.3798 18.705 22.3993 18.6736C22.5961 18.3565 22.8661 18.091 23.1867 17.8998C23.2181 17.8811 23.2503 17.8633 23.3144 17.8278L23.3166 17.8267L23.7385 17.593C24.4403 17.204 24.7918 17.0092 25.0471 16.7322C25.2729 16.4872 25.4433 16.1969 25.5474 15.8804C25.6644 15.5247 25.6635 15.1258 25.6617 14.3328L25.6602 13.6629C25.6584 12.8658 25.6574 12.4677 25.5394 12.1123C25.4351 11.7978 25.2648 11.5089 25.0402 11.2653C24.7866 10.9903 24.4388 10.7968 23.7436 10.4101L23.7416 10.4091Z"
              stroke="#715EFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.33372 13.999C9.33372 16.5763 11.4231 18.6656 14.0004 18.6656C16.5777 18.6656 18.6671 16.5763 18.6671 13.999C18.6671 11.4216 16.5777 9.33231 14.0004 9.33231C11.4231 9.33231 9.33372 11.4216 9.33372 13.999Z"
              stroke="#715EFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      />

      <ElementList
        title={t('vykhod')}
        href={`/city/${currentCity}/logout`}
        disabled={isGuest}
        color="red"
        icon={
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.0003 17.4974L17.5003 13.9974M17.5003 13.9974L14.0003 10.4974M17.5003 13.9974H4.66699M10.5003 8.45408V8.39762C10.5003 7.09083 10.5003 6.43695 10.7546 5.93783C10.9783 5.49878 11.335 5.14209 11.7741 4.91838C12.2732 4.66406 12.9271 4.66406 14.2339 4.66406H19.6006C20.9073 4.66406 21.5598 4.66406 22.059 4.91838C22.498 5.14209 22.8559 5.49878 23.0796 5.93783C23.3337 6.43646 23.3337 7.08956 23.3337 8.39379V19.6016C23.3337 20.9058 23.3337 21.558 23.0796 22.0566C22.8559 22.4956 22.498 22.853 22.059 23.0767C21.5603 23.3307 20.9082 23.3307 19.6039 23.3307H14.2301C12.9258 23.3307 12.2727 23.3307 11.7741 23.0767C11.335 22.853 10.9783 22.4953 10.7546 22.0563C10.5003 21.5571 10.5003 20.9042 10.5003 19.5974V19.5391"
              stroke="#FF3E4A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      />
    </Flex>
  );
};

export default Level2;
