import { FC } from "react";
import Link from "next/link";

import styles from "./Categories.module.scss";

interface Props {
  products: string[];
}

const renderCategory = (category: string, index: number) => (
  <p className={styles.categories} key={index}>
    <Link href="/#">
      <a className={styles.link}>{category + " "} </a>
    </Link>
  </p>
);

export const Categories: FC<Props> = ({ products }) => {
  return (
    <nav className={styles.products}>
      {products &&
        products.map((category: string, index: number) =>
          renderCategory(category, index)
        )}
    </nav>
  );
};
