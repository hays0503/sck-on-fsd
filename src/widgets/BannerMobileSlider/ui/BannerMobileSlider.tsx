"use client";
import { Flex } from "antd";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { MutableRefObject, useRef } from "react";

// Import Swiper styles
import 'swiper/css';


import './styles.css';
import { Category } from "@/shared/types/category";
import {  useRouter } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";

interface BannerMobileSliderProps {
    readonly category: Category[];
}

const BannerMobileSlider: React.FC<BannerMobileSliderProps> = ({ category }) => {
    const progressCircle: MutableRefObject<SVGSVGElement | null> = useRef(null);
    const progressContent: MutableRefObject<HTMLElement | null> = useRef(null);
    
    const onAutoplayTimeLeft = (s: unknown, time: number, progress: number): void => {
        if (progressCircle.current && progressContent.current) {
            progressCircle.current.style.setProperty('--progress', `${1 - progress}`);
            progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
        }
    };
    const router = useRouter();
    const city = useGetCityParams();

    return <Flex style={{ width: '100%', height: '120px' }} gap={20}>
        <Swiper
            slidesPerView={'auto'}
            centeredSlides={true}
            spaceBetween={30}
            loop={true}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
        >

            {category.map((item: Category) => {
                return item.list_url_to_baner.map((bannerImg) => <SwiperSlide onClick={()=>{
                    router.push(`/city/${city}/catalog/category-slug/${item.slug}`);
                }} key={bannerImg}  style={{ width: '100%', height: '120px' }}>
                    <Flex style={{ position: 'relative', width: '100dvw', height: '120px' }} align="center" justify="center">
                        {/* Растягиваем картинку на всю ширину баннера и размываем */}
                        <Image
                            src={bannerImg}
                            fill
                            quality={10}
                            alt="banner"
                            style={{ filter: 'blur(3px)', objectFit: 'cover', position: 'absolute', margin: 'auto' }}
                        />
                        {/* Отображаем оригинальную картинку */}
                        <Image
                            src={bannerImg}
                            alt="banner"
                            fill
                            style={{ position: 'absolute', zIndex: 1, margin: 'auto', objectFit: 'contain' }}
                        />
                    </Flex>
                </SwiperSlide>
                )
            })}
            <div className="autoplay-progress" slot="container-end">
                <svg viewBox="0 0 24 24" ref={progressCircle}>
                    <circle cx="12" cy="12" r="10"></circle>
                </svg>
                <span ref={progressContent}></span>
            </div>
        </Swiper>
    </Flex>
};


export default BannerMobileSlider;