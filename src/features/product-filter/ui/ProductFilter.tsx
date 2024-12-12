import { Products } from "@/shared/types/products";
import { Button, Checkbox, Collapse, Flex, Modal, Tag, Typography } from "antd"
import type { CollapseProps } from 'antd';
import { useTranslations } from "next-intl"
import { CSSProperties, Dispatch, ReactNode, SetStateAction, useEffect, useLayoutEffect, useState } from "react";
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const { Text, Title } = Typography

type ProductSpecsType = {
    id: number;
    name_specification: {
        id: number;
        additional_data: {
            EN: string;
            KZ: string;
        };
        name_specification: string;
    };
    value_specification: {
        id: number;
        additional_data: {
            EN: string;
            KZ: string;
        };
        value_specification: string;
    };
    product: number;
};

type SpecificationType = Map<string, Map<string, Set<number>>>;
type SelectedFilterType = { key: string; value_ru: string };

const ParserSpecifications = (data: ProductSpecsType[]): SpecificationType => {
    const specifications: SpecificationType = new Map();

    data.forEach((item: ProductSpecsType) => {
        const key = item.name_specification?.name_specification;
        const value = item.value_specification?.value_specification;

        if (key && value) {
            // Получить или инициализировать карту значений для этой спецификации
            const values = specifications.get(key) ?? new Map();

            // Получить или инициализировать набор ID продуктов для этого значения
            const productIds = values.get(value) ?? new Set();

            // Добавить текущий ID продукта
            productIds.add(item.product);

            // Обновить карты с новыми значениями
            values.set(value, productIds);
            specifications.set(key, values);
        }
    });

    return specifications;
};

const SelectFilterOptions = (
    specifications: SpecificationType,
    selectedFilter: SelectedFilterType
): number[] => {
    const SelectedKey = specifications.get(selectedFilter.key);
    if (!SelectedKey) {
        // Нет такой спецификации
        return [];
    }
    const SelectedFiltered = SelectedKey.get(selectedFilter.value_ru);
    return SelectedFiltered ? Array.from(SelectedFiltered) : [];
};

// Получаем сырые данные спецификаций
const getRawSpecsByProductIds = async (
    productIds: number[]
): Promise<ProductSpecsType[]> => {
    const urlsProductSpecs = `/api/v1/specif/configurations/${productIds.join(",")}/`;
    let responseProductSpecs: Response;
    try {
        responseProductSpecs = await fetch(urlsProductSpecs);
    } catch (error) {
        console.log("Шаг 4.");
        console.log("Ошибка при получении спецификации продуктов", error);
        return [];
    }

    let productSpecs: ProductSpecsType[];
    try {
        productSpecs = await responseProductSpecs.json();
    } catch (error) {
        console.log("Шаг 5.");
        console.log("Ошибка при парсинге спецификации продуктов", error);
        return [];
    }

    return productSpecs;
};


const getRawSpecsByProductIdsAndParse = async (
    productIds: number[]
): Promise<SpecificationType | undefined> => {
    // Получаем сырые данные спецификаций
    const productSpecs = await getRawSpecsByProductIds(productIds);

    let specifications: SpecificationType;
    try {
        specifications = ParserSpecifications(productSpecs);
    } catch (error) {
        console.log("Шаг 6.");
        console.log("Ошибка при разборе спецификации по продуктам", error);
        return undefined;
    }

    return specifications;
};


const ExpandedCheckboxGroup: React.FC<{
    specificationsKey: string,
    specifications: Map<string, Set<number>>,
    selectedTagState: any
}> = ({
    specificationsKey,
    specifications,
    selectedTagState
}) => {
        const t = useTranslations();
        const [expand, setExpand] = useState(specifications.size > 5);
        const needExpanded = specifications.size > 5
        const entries = expand ? specifications.entries().toArray().slice(0, 5) : specifications.entries().toArray()
        const options = entries.map((dataSpecifications) => {
            const [key, productIds] = dataSpecifications
            return {
                id: key,
                label: <Flex gap={3}><Text>{key}</Text><Text style={{ color: "gray" }}>{productIds.size}</Text></Flex>,
                value: key,
                name: key
            }
        })

        const onChange = (checkedValues: any) => {
            const [selectedTag, setSelectedTag] = selectedTagState;
            // Проверяем есть ключ
            const pair = {
                [specificationsKey]: checkedValues.map((key: string) => {
                    const ids = Array.from(specifications.get(key)!)
                    return { key, id: ids }
                })
            }
            setSelectedTag({ ...selectedTag, ...pair })
        }



        return <Flex vertical>
            <Checkbox.Group
                onChange={onChange}
                style={{ flexDirection: 'column' }}
                options={options}
                value={selectedTagState[0]?.[specificationsKey]?.map((item: any) => item.key)}
            />
            {needExpanded && <Text onClick={() => setExpand(!expand)}
                style={{
                    color: 'blue',
                    textDecorationLine: "underline"
                }}
            >
                {expand ? t('pokazat-eshe') : t('spryatat')}
            </Text>
            }
        </Flex>
    }

const CollapseListSpecification: React.FC<{
    specifications: SpecificationType,
    selectedTagState: any
}> = ({ specifications, selectedTagState }) => {
    const specificationsKeys = specifications.keys().toArray()

    const items: CollapseProps['items'] = specificationsKeys.map((key: string) => {
        return {
            key: key,
            label: <Flex style={{ width: "100%" }} justify="space-between">
                <Title level={5}>{key}</Title>
            </Flex>,
            children: <ExpandedCheckboxGroup specificationsKey={key} specifications={specifications.get(key)!} selectedTagState={selectedTagState} />,
        }
    })

    return <Collapse
        defaultActiveKey={specificationsKeys}
        bordered={true}
        items={items}
        expandIconPosition="right"
        expandIcon={(panelProps) => {
            if (panelProps.isActive) {
                return <DownOutlined />
            } else {
                return <UpOutlined />
            }
        }} />;
}


const ModalFilter: React.FC<{ children: ReactNode, specificationsDefault: SpecificationType }> = ({ children, specificationsDefault }) => {
    const [open, setOpen] = useState(false);
    const [selectedTagState, setSelectedTagState] = useState<{ [key: string]: { key: string, id: number[] }[] }| undefined>(undefined);

    const RenderTag = () => {
        return <Flex style={{
            width: "calc(100%)",
            height: "30px",
            overflowX: "auto",
            overflowY: "hidden",
            whiteSpace: "nowrap"
        }}>
            {
                selectedTagState && Object.keys(selectedTagState).map((key) => {
                    return selectedTagState?.[key].map((item) => {
                        return <Tag 
                                    key={`${key}-${item}`}
                                    style={{ fontSize: "12px", marginRight: "5px", marginLeft: "5px" }}
                                    // color="blue"
                                    closable
                                    onClose={() => {
                                        const newSelectedTagState = { ...selectedTagState };
                                        newSelectedTagState[key] = newSelectedTagState[key].filter((i) => i.key !== item.key);
                                        setSelectedTagState(newSelectedTagState);
                                    }}
                                >
                                    {item.key}
                                </Tag>
                    })
                })
            }
        </Flex>
    }

    return <>
        <Modal style={{ top: 0, width: "100%", "--ant-modal-content-padding": "0" } as CSSProperties} open={true} footer={null} closeIcon={null} onCancel={() => setOpen(false)}>

            {/* {JSON.stringify(selectedTagState)} */}
            <RenderTag/>
            <Flex style={{ width: "100%", height: "90dvh", backgroundColor: "#ffff", gap: '3px', paddingTop: '10px', overflowX: 'auto' }} vertical>

                <CollapseListSpecification specifications={specificationsDefault} selectedTagState={[selectedTagState, setSelectedTagState]} />
            </Flex>
        </Modal>
        <Button onClick={() => setOpen(!open)}>
            {children}
        </Button>
    </>
}


const ProductFilter: React.FC<{ Products: Products[] }> = ({ Products }) => {

    const [specificationsDefault, setSpecificationsDefault] = useState<SpecificationType | undefined>(undefined);

    const t = useTranslations();

    useLayoutEffect(() => {
        const ProductsId = Products.map((item) => item.id);
        if (ProductsId.length != 0 && !specificationsDefault) {
            getRawSpecsByProductIdsAndParse(ProductsId).then((data) => {
                setSpecificationsDefault(data)
            });
        }
    }, [Products, specificationsDefault])

    return <Flex style={{
        minWidth: "100px",
        padding: "10px",
        backgroundColor: "#fff",
        marginTop: "1px",
    }} justify="center" align="center">
        {specificationsDefault && <ModalFilter specificationsDefault={specificationsDefault}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M14.6673 2.66545C14.6673 2.19874 14.667 1.96521 14.5762 1.78695C14.4963 1.63014 14.3693 1.50275 14.2125 1.42286C14.0342 1.33203 13.8004 1.33203 13.3337 1.33203H2.66699C2.20028 1.33203 1.96716 1.33203 1.7889 1.42286C1.6321 1.50275 1.50471 1.63014 1.42481 1.78695C1.33398 1.96521 1.33398 2.19874 1.33398 2.66545V3.27983C1.33398 3.48365 1.33398 3.58564 1.35701 3.68155C1.37742 3.76658 1.41118 3.8478 1.45687 3.92236C1.50839 4.00643 1.58057 4.07862 1.72461 4.22266L5.94356 8.44161C6.08768 8.58572 6.15935 8.6574 6.21088 8.74149C6.25657 8.81605 6.29078 8.89755 6.3112 8.98258C6.33399 9.07751 6.33399 9.1783 6.33398 9.37799V13.3412C6.33398 14.0555 6.33398 14.4129 6.48444 14.6281C6.61581 14.8159 6.81849 14.9412 7.04525 14.9747C7.30493 15.0131 7.62458 14.8535 8.26351 14.534L8.93018 14.2007C9.19773 14.0669 9.33118 13.9998 9.42891 13.9C9.51534 13.8117 9.58147 13.7058 9.62174 13.589C9.66729 13.4569 9.66732 13.307 9.66732 13.0079V9.3842C9.66732 9.18037 9.66732 9.07849 9.69034 8.98258C9.71076 8.89755 9.74451 8.81605 9.7902 8.74149C9.84139 8.65796 9.91287 8.58648 10.0551 8.44427L10.0579 8.44161L14.2769 4.22266C14.421 4.07853 14.4927 4.00646 14.5442 3.92236C14.5899 3.8478 14.6241 3.76658 14.6445 3.68155C14.6673 3.58662 14.6673 3.48573 14.6673 3.28603V2.66545Z"
                    stroke="#464646"
                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <Text>{t('filtry')}</Text>
        </ModalFilter>}
    </Flex>
}



export default ProductFilter

