import { iCity } from "@/shared/types/city";


interface SelectCurrentCityParams {
  cities: iCity[];
  EngNameCity?: string;
  RusNameCity?: string;
  KzNameCity?: string;
}

export default function selectCurrentCity({
  cities,
  EngNameCity,
  RusNameCity,
  KzNameCity,
}: SelectCurrentCityParams): iCity | undefined {
  if (!cities || cities.length === 0) return undefined;

  if (RusNameCity) {
    return cities.find((city) => city.name_city === RusNameCity);
  }

  if (EngNameCity) {
    return cities.find((city) => city.additional_data.EN === EngNameCity);
  }

  if (KzNameCity) {
    return cities.find((city) => city.additional_data.KZ === KzNameCity);
  }

  return undefined;
}
