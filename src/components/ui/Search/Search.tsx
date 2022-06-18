import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";

import { useAppContext } from "@/hooks/HomeContext";
import { useProducts } from "@/hooks/Products";
import { useDebounce } from "@/hooks/Debounce";

import { Button } from "@/components/ui/Button";
import { SerializedData } from "@/interfaces/serialized-data";
import { fetchData } from "@/utils/common";

import styles from "./Search.module.scss";

export const Search = () => {
  const { setSearchData } = useAppContext();
  const [product, saveProduct] = useState<string>("");
  const queryClient = useQueryClient();
  const router = useRouter();

  const searchTerm = useDebounce(product, 1000);

  const {
    data: { author, categories = [], items = [] } = {} as SerializedData
  } = useProducts(searchTerm!);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (product.length === 0) {
      toast("🔎 Please introduce a search!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      return;
    }

    if (router.pathname !== "/") {
      router.push("/");
    }

    setSearchData({ author, categories, items });
  };

  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      if (product.length === 0) {
        toast("🔎 Please introduce a search!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        return;
      }

      event.preventDefault();

      const prevQuerySearch = queryClient.getQueryData([
        "products",
        product
      ]) as SerializedData;

      if (router.pathname !== "/") {
        setTimeout(() => {
          router.push("/");
        }, 500);
      }

      if (prevQuerySearch) {
        if (prevQuerySearch.items.length > 0) {
          setSearchData(prevQuerySearch);
          return;
        }
      }

      const response = await fetchData(`products/items?search=${product}`).then(
        response => response.data
      );

      setSearchData(response);
    }
  };

  return (
    <div className={styles.search}>
      <form onSubmit={event => handleSubmit(event)}>
        <input
          type="search"
          name="name"
          value={product}
          autoComplete="off"
          className={styles.input}
          data-testid="set-product"
          placeholder="Nunca dejes de buscar"
          onChange={e => saveProduct(e.target.value)}
          onKeyPress={event => handleKeyPress(event)}
        />
        <Button />
      </form>
    </div>
  );
};
