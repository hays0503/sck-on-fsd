import { addProduct } from "@/entities/Basket";
import useFetcherBasket from "@/shared/api/fetch/basket";
import { useCallback, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { v4 as uuidv4 } from "uuid";
import { useDebounceCallback } from "usehooks-ts";
import useGetUsersBasket from "./useGetUsersBasket";
import { useUser } from "@/entities/User";

const useBasketAdd = ({ prod_id }: { prod_id: number }) => {
  const userBasket = useGetUsersBasket();
  const userData = useUser();
  const [uuid_id, setUuid_id] = useLocalStorage<string>("uuid_id", "");

  // Установка UUID для пользователя
  useEffect(() => {
    if (userBasket?.uuid_id && userBasket.uuid_id !== uuid_id) {
      setUuid_id(userBasket.uuid_id);
    } else if (!uuid_id) {
      const Unique_ID = uuidv4();
      setUuid_id(Unique_ID);
    }
  }, [setUuid_id, userBasket?.uuid_id, uuid_id]);

  const { mutate } = useFetcherBasket({ by_id: uuid_id });

  // Дебаунс вызова `mutate` для минимизации количества запросов
  const debouncedMutate = useDebounceCallback(() => {
    try {
      mutate();
    } catch (error) {
      console.error("Ошибка при обновлении корзины:", error);
    }
  }, 500);

  // Добавление продукта в корзину
  const addAction = useCallback(async () => {
    if (!uuid_id || !userData?.accessToken?.token) {
      console.error("Не удалось добавить продукт: UUID или токен отсутствует.");
      return;
    }

    try {
      await addProduct(uuid_id, prod_id, userData.accessToken.token);
      debouncedMutate(); // Запускаем обновление с задержкой
    } catch (error) {
      console.error("Ошибка при добавлении в корзину:", error);
    }
  }, [uuid_id, prod_id, userData?.accessToken?.token, debouncedMutate]);

  return addAction;
};

export default useBasketAdd;
