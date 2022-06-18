import type { NextApiRequest, NextApiResponse } from "next";

import { ProductsResponse } from "@/interfaces/products";
import { SerializedData, Author } from "@/interfaces/serialized-data";

interface Props {
  data: SerializedData;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Props>
) {
  if (req.method === "GET" && req.query.search !== "") {
    const queryProducts = req.query.search;
    const response = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search?q=${queryProducts}&limit=4`
    );
    const resJson: ProductsResponse = await response.json();
    const { results = [], filters = [] } = resJson;

    const filteredCategories: string[] = [];

    const signUser = {
      author: {
        name: "Ismael",
        lastName: "Barrios Rojas"
      }
    };

    filters.map(productCategory => {
      productCategory.values.map(product => {
        if (product.name) {
          filteredCategories.push(product.name);
        }
        if (product.path_from_root) {
          product.path_from_root.map(category => {
            if (category.name) {
              filteredCategories.push(category.name);
            }
          });
        }
      });
    });

    const serializedProducts = results.map(product => {
      const {
        id,
        title,
        prices: { prices: pricesArray },
        thumbnail,
        shipping,
        condition
      } = product;
      return {
        id,
        title,
        prices: pricesArray,
        picture: thumbnail,
        condition,
        free_shipping: shipping.free_shipping
      };
    });

    const serializedAllData = {
      ...signUser,
      categories: filteredCategories,
      items: serializedProducts
    };

    return res.status(200).json({ data: serializedAllData });
  }

  res.status(200).json({
    data: { author: {} as Author, categories: [], items: [] }
  });
}
