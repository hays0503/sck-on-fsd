import { Input } from "antd";
import { useTranslations } from "next-intl";
export default function InputNumberPhoneKz({numberString, setNumberString}:{numberString:string, setNumberString:(value:string)=>void}) {
  const t = useTranslations();
  return <Input
  type="tel"
  addonBefore="8"
  value={numberString}
  placeholder={t('vash-telefon')}
  size="large"
  onChange={(e) => {
    const number = e.target.value.replace(/\D/g, "");
    console.log(number.length);
    switch (number.length) {
      case 0:
        setNumberString(`(${number}`);
        break;
      case 1:
        setNumberString(`(${number}`);
        break;
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
}
