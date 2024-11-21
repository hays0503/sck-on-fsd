import { addProduct } from "@/entities/Basket";
import useFetcherBasket from "@/shared/api/fetch/basket";
import { useCallback, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { v4 as uuidv4 } from "uuid";
import useGetUsersBasket from "./useGetUsersBasket";

const useBasketAdd = ({ prod_id }: { prod_id: number }) => {
  const userBasket = useGetUsersBasket();

  const [uuid_id, setUuid_id] = useLocalStorage<string>("uuid_id", "");

  useEffect(() => {
    if (userBasket?.uuid_id) {
      setUuid_id(userBasket?.uuid_id);
    } else {
      if (!uuid_id) {
        const Unique_ID: string = uuidv4();
        setUuid_id(Unique_ID);
      }
    }
  }, [setUuid_id, userBasket, uuid_id]);

  const { mutate } = useFetcherBasket({ by_id: uuid_id });

  const addAction = useCallback(async () => {
    if (uuid_id) {
      await addProduct(uuid_id, prod_id);
      try {
        mutate();
      } catch (error) {
        console.log(error);
      }
    }
  }, [uuid_id, prod_id, mutate]);

  return addAction;
};

export default useBasketAdd;
