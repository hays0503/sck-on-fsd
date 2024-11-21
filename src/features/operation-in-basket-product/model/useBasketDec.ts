
import { delProduct } from "@/entities/Basket";
import useFetcherBasket from "@/shared/api/fetch/basket";
import { useReadLocalStorage } from "usehooks-ts";

const useBasketDec = ({ prod_id }: { prod_id: number }) => {
  const uuid = useReadLocalStorage<string>("uuid_id")!;
  
  const { mutate } = useFetcherBasket({ by_id: uuid });

  const delAction = async () => {
    if (uuid) {
      await delProduct(uuid, prod_id);
      try {
        mutate();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return delAction;
};

export default useBasketDec;
