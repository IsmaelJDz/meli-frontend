import { FC } from "react";
import { GetServerSideProps } from "next";

import { Layout } from "@/components/layout";
import { Product } from "@/components/ui/Product";

import { fetchData } from "@/utils/common";
import { ProductResponse } from "@/interfaces/product";

/**
 *
 * @param {*} api -> EndPoint -> url"
 * @returns data from api
 */

interface Props {
  product: ProductResponse;
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { slug } = ctx.params as { slug: string };

  const data: ProductResponse = await fetchData(`/product/${slug}`);

  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  if (Object.keys(data).length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      product: data
    }
  };
};

const ProductName: FC<Props> = ({ product }) => {
  return (
    <Layout>
      <Product product={product} />
    </Layout>
  );
};

export default ProductName;
