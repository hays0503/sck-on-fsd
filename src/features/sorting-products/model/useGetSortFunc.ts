import { useQueryState } from "nuqs";
import ascFunc from "./ascProductSort";
import descFunc from "./descProductSort";
import { Products } from "@/shared/types/products";
import useSelectedCity from "@/shared/hooks/useSelectedCity";
const useGetSortFunc = () => {
    const [sortOrder] = useQueryState("sortOrder", { defaultValue: "asc" });
    const city = useSelectedCity();
    switch(sortOrder){
        case "asc": return  (a:Products,b:Products) => ascFunc(a,b,city);
        case "desc": return (a:Products,b:Products) => descFunc(a,b,city);
    }
}

export default useGetSortFunc;