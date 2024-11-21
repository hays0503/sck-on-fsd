import {assignBasketToUser} from "@/entities/Basket";
import { useUser } from "@/entities/User";

const useAssignBasketToUser = ({ uuid_id }: { uuid_id: string }) => {
  const user = useUser();

  const action = async () => {
    if (uuid_id) {
      await assignBasketToUser(uuid_id, user.accessToken.token);
    }
  };
  return action;
};

export default useAssignBasketToUser;