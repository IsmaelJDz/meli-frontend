import { Layout } from "@/components/layout";
import { Home } from "@/components/ui/Home";
import { useAppContext } from "@/hooks/HomeContext";

/**
 *
 * @param {*} props initial props
 * @returns Component -> Principal
 */

export default function Main() {
  const { loading, data } = useAppContext();
  return (
    <Layout>
      <Home data={data} />
    </Layout>
  );
}
