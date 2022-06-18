import Head from "next/head";
import { Navbar } from "@/components/ui/Navbar";

interface Props {
  title?: string;
  children: React.ReactNode | React.ReactNode[];
}

export const Layout = ({ title = "MeLi", children }: Props) => {
  return (
    <>
      <Head>
        <title> Mercado Libre</title>
        <meta name="description" content="search the best products" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Navbar />

      <main>{children}</main>
    </>
  );
};
