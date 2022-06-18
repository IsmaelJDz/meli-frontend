import { Layout } from "@/components/layout";
import { Loading } from "@/components/ui/Loading";

import { useAppContext } from "@/hooks/HomeContext";
import { Products } from "@/components/ui/Products";
import { Categories } from "../Categories";

import styles from "./Home.module.scss";

export const Home = () => {
  const {
    loading,
    data: { items, categories }
  } = useAppContext();

  return (
    <Layout>
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
      {loading && <Loading />}
    </Layout>
  );
};
