
import { delProduct } from "@/entities/Basket";
import useFetcherBasket from "@/shared/api/fetch/basket";
import { useReadLocalStorage } from "usehooks-ts";

const useBasketDec = ({
  prod_id,
  token
}: {
  prod_id: number;
  token: string | undefined
}) => {
  const uuid = useReadLocalStorage<string>("uuid_id")!;
  // const userData = useUser();
  const { mutate } = useFetcherBasket({ by_id: uuid });

  const delAction = async () => {
    if (uuid) {
      await delProduct(uuid, prod_id,token);
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
