import { Button, Flex, Form, Input, message, Typography } from "antd"
import { useTranslations } from "next-intl"
import { Dispatch } from "react"

const { Title } = Typography

interface IRecipientProps {
    setStep: Dispatch<React.SetStateAction<number>>
    orderManager: [OrderData, Dispatch<SetStateAction<OrderData>>]
}

const Recipient: React.FC<IRecipientProps> = ({setStep,orderManager}) => {
    const t = useTranslations(); 
    const [messageApi, contextHolder] = message.useMessage();
    const [formUserInfo] = Form.useForm();

    const Submit = () => {
        formUserInfo.validateFields().then(() => {
            const userInfo = formUserInfo.getFieldsValue()
            const [order, setOrder] = orderManager;
    
            const user = `Фамилия=[${userInfo.lastName}] Имя=[${userInfo.firstName}] Отчество=[${userInfo.middleName}]`
            setOrder({ ...order, user_full_name: user, phone_number: userInfo.phone, email: userInfo.email });
            console.log(order);
            setStep(4);
        }).catch(() => { 
            messageApi.open({
            type: 'error',
            content: t('zapolnite-pole'),
        });});

    }


    return <Flex vertical>
        {contextHolder}
        <Flex gap={5} vertical>
            <Form
                form={formUserInfo}
                layout="vertical"
                style={{ width: "100%", display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '10px' }}>
                <Form.Item label="Фамилия" name="lastName"  rules={[{ required: true }]} required={true}>
                    <Input placeholder="Гео" />
                </Form.Item>
                <Form.Item label="Имя"  name="firstName" rules={[{ required: true }]} required={true}>
                    <Input placeholder="Георгии" />
                </Form.Item>
                <Form.Item label="Отчество" name="surname">
                    <Input placeholder="Георгиевич" />
                </Form.Item>
                <Form.Item label="Номер телефона" name="phone" rules={[{ required: true }]} required={true}>
                    <Input placeholder="8 776 34191 15" />
                </Form.Item>
                <Form.Item label="E-mail" name="email" rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    }
                ]}>
                    <Input placeholder={"main@mail.kz"} />
                </Form.Item>
            </Form>
            <Button type="primary" onClick={Submit}>
                {t('potverdet')}
            </Button>
        </Flex>
    </Flex>
}

export default Recipient