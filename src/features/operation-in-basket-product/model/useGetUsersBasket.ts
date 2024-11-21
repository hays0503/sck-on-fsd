import {getUsersBasket} from "@/entities/Basket";
import { useUser } from "@/entities/User";
import { iBasket } from "@/shared/types/basket";
import { useCallback, useEffect, useState } from "react";

const useGetUsersBasket = () => {
  const [usersBasket, setUsersBasket] = useState<iBasket>();
  const user = useUser();

  const action = useCallback(async () => {
    setUsersBasket(await getUsersBasket(user.accessToken.token));
  }, [user.accessToken.token]);

  useEffect(() => {
    if (user.accessToken.token) {
      action();
    }
  }, [user.accessToken.token, action]);
  return usersBasket;
};

export default useGetUsersBasket;
