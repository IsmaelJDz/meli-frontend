import { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { formatCurrency } from "@/utils/common";
import { Item } from "@/interfaces/serialized-data";

import styles from "./Products.module.scss";

interface Props {
  products: Item[];
}

export const Products: FC<Props> = ({ products }) => {
  const router = useRouter();

  const handleClick = (productId: string) => {
    router.push({
      pathname: `/items/[slug]`,
      query: { slug: `${productId}` }
    });
  };

  return (
    <section className={styles.product}>
      <div className={styles.container}>
        {products?.map((product: Item) => (
          <article
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
            <div key={product.id} className={styles.productDetail}>
              <div className={styles.amount}>
                <p className={styles.price}>
                  {`${formatCurrency(product.price)}`}
                </p>
                {product.free_shipping && (
                  <div className={styles.icon}>
                    <i className="fas fa-car"></i>
                  </div>
                )}
              </div>
              <div className={styles.info}>
                <p className={styles.currency}>
                  {/* {product.prices[0].currency_id} */}
                  {product?.currency_id}
                </p>
                <p> {product.title}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
