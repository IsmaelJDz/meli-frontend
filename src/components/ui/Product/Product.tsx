import React, { FC } from "react";
import Image from "next/image";

import { toast } from "react-toastify";
import { useAppContext } from "@/hooks/HomeContext";
import { Categories } from "@/components/ui/Categories";
import { formatCurrency } from "@/utils/common";

import { ProductResponse } from "@/interfaces/product";

import styles from "./Product.module.scss";

interface Props {
  product: ProductResponse;
}

export const Product: FC<Props> = ({ product }) => {
  const {
    loading,
    data: { categories }
  } = useAppContext();

  const buyProduct = () => {
    toast(`💰 Buy an awesome ${product.item.title}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
    return;
  };

  return (
    <div className={styles.productId}>
      {categories.length > 1 ? (
        <Categories products={categories} />
      ) : (
        <Categories products={["Unknown category", "Sin categorías"]} />
      )}
      <div className={styles.wrapper}>
        <article className={styles.product}>
          <div className={styles.img}>
            <Image
              width={680}
              height={400}
              src={product.picture}
              alt={product.item.title}
              objectFit="scale-down"
            />
          </div>
          <div className={styles.info}>
            <p className={styles.sold}>
              {product?.condition} {" - "} {product?.sold_quantity}{" "}
              <span>Vendidos</span>
            </p>
            <p className={styles.titleProduct}> {product.item.title} </p>
            <p className={styles.priceProduct}>
              {`${formatCurrency(product?.price?.amount)}`}
            </p>
            <button className={styles.button} onClick={buyProduct}>
              Comprar
            </button>
          </div>
        </article>
        <section className={styles.details}>
          <h3 className={styles.detailsTitle}>Descripción del producto</h3>
          <p className={styles.detailsDesc}>{product?.description}</p>
        </section>
      </div>
    </div>
  );
};
