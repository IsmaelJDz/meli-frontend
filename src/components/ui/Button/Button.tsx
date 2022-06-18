import Image from "next/image";

import styles from "./Button.module.scss";

export const Button = () => {
  return (
    <button
      data-testid="submit-product"
      className={styles.searchBtn}
      type="submit"
    >
      <Image
        width="18"
        height="18"
        src="/Assets/ic_Search.png"
        alt="Search"
        objectFit="scale-down"
      />
    </button>
  );
};
