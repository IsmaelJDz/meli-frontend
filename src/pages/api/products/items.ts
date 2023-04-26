import type { NextApiRequest, NextApiResponse } from "next";

import { ProductsResponse } from "@/interfaces/products";
import { SerializedData, Author } from "@/interfaces/serialized-data";

interface Props {
  data: SerializedData;
}

interface ProductNotExist {
  status: number;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Props | ProductNotExist>
) {
  if (req.method === "GET" && req.query.search === "undefined") {
    return res.status(404).json({ status: 404, message: "Product not found" });
  }

  if (req.method === "GET" && req.query.search !== "") {
    const queryProduct = req.query.search;

    const response = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search?q=${queryProduct}&limit=4`
    );

    const jsonResponse: ProductsResponse = await response.json();

    const { results = [], filters = [] } = jsonResponse;

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
        //prices: { prices: pricesArray },
        currency_id,
        price,
        thumbnail,
        shipping,
        condition
      } = product;
      return {
        id,
        title,
        currency_id,
        //prices: pricesArray,
        price,
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
