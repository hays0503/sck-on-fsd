"use client";
import { useGetCityParams } from "./useGetCityParams"
import useSelectCurrentCity from "./useSelectCurrentCity";

type useSelectedCityHook = () => string

const useSelectedCity:useSelectedCityHook = () => {
    const city = useGetCityParams();
    const SelectCity = useSelectCurrentCity("en",city );

    return (SelectCity?.name_city)??"undefined";
}

export default useSelectedCity