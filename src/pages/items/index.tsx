import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Layout } from "@/components/layout";

import { useQuery, QueryClient, dehydrate } from "react-query";
import { fetchData } from "@/utils/common";
import { Home } from "../../components/ui/Home/Home";

type Props = {};

export const getServerSideProps: GetServerSideProps = async context => {
  const search = context.query?.search as string;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["getProducts", search], () =>
    fetchData(`products/items?search=${search}`)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};

export default function Products({}: Props) {
  const router = useRouter();
  const search =
    typeof router.query?.search === "string" ? router.query?.search : "";

  const {
    isSuccess,
    data: dataProduct,
    isLoading,
    isError
  } = useQuery(
    ["getProducts", search],
    () => fetchData(`products/items?search=${search}`),
    {
      enabled: search.length > 0,
      staleTime: Infinity
    }
  );

  return (
    <Layout>
      <Home {...dataProduct} />
    </Layout>
  );
}
