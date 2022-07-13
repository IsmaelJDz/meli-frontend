import { FC } from "react";

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
    </div>
  );
};
