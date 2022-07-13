import { FC } from "react";
import { Layout } from "@/components/layout";
import { Loading } from "@/components/ui/Loading";

import { useAppContext } from "@/hooks/HomeContext";
import { Products } from "@/components/ui/Products";
import { Categories } from "../Categories";
import { Item } from "@/interfaces/serialized-data";

import styles from "./Home.module.scss";

interface Props {
  data: {
    items: Item[];
    categories: string[];
  };
}

export const Home: FC<Props> = ({ data: { items = [], categories = [] } }) => {
  //console.log("data", items);

  // const {
  //   loading,
  //   data: { items, categories }
  // } = useAppContext();

  return (
    <div className={styles.main}>
      {items.length > 0 && (
        <Categories
          products={
            categories.length > 1
              ? categories
              : ["Unknown category", "Sin categorías"]
          }
        />
      )}
      {items.length > 0 && <Products products={items} />}
      {/* {loading && <Loading />} */}
    </div>
  );
};
