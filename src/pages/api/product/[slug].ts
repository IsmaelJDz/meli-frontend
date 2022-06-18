import type { NextApiRequest, NextApiResponse } from "next";

import { ProductResponse } from "@/interfaces/product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductResponse>
) {
  const { slug } = req.query;

  /**
   *
   * @param path: url product
   * @returns data: product data
   * @info Promise<any> because is not necessary type all data from MERCADO LIBRE api in this project
   */

  const fetcher = async (path: string): Promise<any> => {
    try {
      const response = await fetch(
        `https://api.mercadolibre.com/items/${path}`
      );
      return await response.json();
    } catch (error) {
      console.log("error fetching....", error);
    }
  };

  const response = async function getData() {
    try {
      let [description, details] = await Promise.all([
        fetcher(`${slug}/description`),
        fetcher(`${slug}`)
      ]);

      return { description, details };
    } catch (error) {
      console.error("error: " + error);
    }
  };

  const data = await response();

  const signUser = {
    author: {
      name: "Ismael",
      lastName: "Barrios Rojas"
    }
  };

  const item = {
    item: {
      id: data?.details.id,
      title: data?.details.title
    },
    price: {
      currency: data?.details.currency_id,
      amount: data?.details.price,
      decimal: 2
    },
    picture: data?.details.thumbnail,
    condition: data?.details.condition,
    free_shipping: data?.details.shipping.free_shipping,
    sold_quantity: data?.details.sold_quantity,
    description: data?.description.plain_text
  };

  const serializedAllData = {
    ...signUser,
    ...item
  };

  res.status(200).json(serializedAllData);
}
