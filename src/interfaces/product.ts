export interface ProductResponse {
  author: Author;
  item: Item;
  price: Price;
  picture: string;
  condition: string;
  free_shipping: boolean;
  sold_quantity: number;
  description: string;
}

export interface Author {
  name: string;
  lastName: string;
}

export interface Item {
  id: string;
  title: string;
}

export interface Price {
  currency: string;
  amount: number;
  decimal: number;
}
