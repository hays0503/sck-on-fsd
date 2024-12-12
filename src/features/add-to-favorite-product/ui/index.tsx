import { Spin } from "antd";
import dynamic from "next/dynamic";



const AddToFavoriteProduct = dynamic(() => import("./AddToFavoriteProduct"), { ssr: false, loading: () => <div style={{ width: "25px", height: "25px" }}><Spin /></div> });
export { AddToFavoriteProduct };
