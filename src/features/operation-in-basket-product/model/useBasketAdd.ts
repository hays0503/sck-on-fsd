import { addProduct } from "@/entities/Basket";
import useFetcherBasket from "@/shared/api/fetch/basket";
// import { useReadLocalStorage } from "usehooks-ts";

const useBasketAdd = ({ prod_id }: { prod_id: number }) => {
  const uuid = "1f";//useReadLocalStorage<string>("uuid");
  const { mutate } = useFetcherBasket({ by_id: uuid });

  const addAction = async () => {
    if (uuid) {
      await addProduct(uuid, prod_id);
      try {
        mutate();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return addAction;
};

export default useBasketAdd;
