"use client";
import { Flex } from "antd";
import Image from "next/image";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';


import './styles.css';
import { Category } from "@/shared/types/category";
import { useRouter } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";

interface BannerMobileSliderProps {
    readonly category: Category[];
}

const BannerMobileSlider: React.FC<BannerMobileSliderProps> = ({ category }) => {

    const router = useRouter();
    const city = useGetCityParams();

    const swiperParams: SwiperProps = {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        navigation: true,
        modules: [Autoplay, Navigation],
        lazy: "true"
    } as SwiperProps;

    return <Flex style={{ width: '100%', height: '120px' }} gap={20}>
        <Swiper {...swiperParams}>

            {category.map((item: Category) => {
                return item.list_url_to_baner.map((bannerImg) => <SwiperSlide onClick={() => {
                    router.push(`/city/${city}/catalog/category-slug/${item.slug}`);
                }} key={bannerImg} style={{ width: '100%', height: '120px' }}>
                    <Flex style={{ position: 'relative', width: '100dvw', height: '120px' }} align="center" justify="center">
                        {/* Растягиваем картинку на всю ширину баннера и размываем */}
                        <Image
                            priority={false}
                            loading="lazy"
                            src={bannerImg}
                            fill
                            quality={10}
                            alt="banner"
                            style={{ filter: 'blur(3px)', objectFit: 'cover', position: 'absolute', margin: 'auto' }}
                        />
                        {/* Отображаем оригинальную картинку */}
                        <Image
                            priority={false}
                            loading="lazy"
                            src={bannerImg}
                            alt="banner"
                            fill
                            style={{ position: 'absolute', zIndex: 1, margin: 'auto', objectFit: 'contain' }}
                        />
                    </Flex>
                </SwiperSlide>
                )
            })}
        </Swiper>
    </Flex>
};


export default BannerMobileSlider;