import { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { formatCurrency } from "@/utils/common";
import { Item } from "@/interfaces/serialized-data";

import styles from "./Products.module.scss";

interface Props {
  products: Item[];
}

export const Products: FC<Props> = ({ products }: any) => {
  const router = useRouter();

  const handleClick = (productId: string) => {
    router.push({
      pathname: `/product/[slug]`,
      query: { slug: `${productId}` }
    });
  };

  return (
    <article className={styles.product}>
      <div className={styles.container}>
        {products?.map((product: Item) => (
          <div
            key={product.id}
            className={styles.productInfo}
            onClick={() => handleClick(product.id)}
          >
            <div className={styles.img}>
              <Image
                width={180}
                height={180}
                src={product?.picture}
                alt={product?.title}
                objectFit="scale-down"
              />
            </div>
            <div key={products.id} className={styles.productDetail}>
              <div className={styles.amount}>
                <p className={styles.price}>
                  {`${formatCurrency(product.prices[0].amount)}`}
                </p>
                {product.free_shipping && (
                  <div className={styles.icon}>
                    <i className="fas fa-car"></i>
                  </div>
                )}
              </div>
              <div className={styles.info}>
                <p className={styles.currency}>
                  {product.prices[0].currency_id}
                </p>
                <p> {product.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};
