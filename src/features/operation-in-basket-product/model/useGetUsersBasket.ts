import {getUsersBasket} from "@/entities/Basket";
import { iBasket } from "@/shared/types/basket";
import {  useEffect, useState } from "react";

const useGetUsersBasket = (token: string|undefined) => {

  const [usersBasket, setUsersBasket] = useState<iBasket>();

  useEffect(() => {
    if (token) {
      getUsersBasket(token).then((data) => {
        setUsersBasket(data);
      });
    }
  }, [token]);
  return usersBasket;
};

export default useGetUsersBasket;
