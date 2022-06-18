import Image from "next/image";
import Link from "next/link";
import { useQueryClient } from "react-query";

import { Search } from "@/components/ui/Search";
import { useAppContext } from "@/hooks/HomeContext";

import styles from "./Navbar.module.scss";

export const Navbar = () => {
  //const queryClient = useQueryClient();
  const { resetState } = useAppContext();

  const handleReload = () => {
    //queryClient.clear();
    resetState();
  };

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Link href="/" passHref>
          <a style={{ cursor: "pointer" }} onClick={handleReload}>
            <Image
              src="/Assets/logo_ML.png"
              objectFit="scale-down"
              width={53}
              height={36}
              alt="logo"
            />
          </a>
        </Link>
        <Search />
      </div>
    </header>
  );
};
