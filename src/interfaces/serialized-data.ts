export interface SerializedData {
  author: Author;
  categories: string[];
  items: Item[];
}

export interface Author {
  name: string;
  lastName: string;
}

export interface Item {
  id: string;
  title: string;
  prices: Price[];
  picture: string;
  condition: string;
  free_shipping: boolean;
}

export interface Price {
  id: string;
  type: string;
  amount: number;
  regular_amount?: any;
  currency_id: string;
  last_updated: string | Date;
  conditions: Conditions;
  exchange_rate_context: string;
  metadata?: any;
}

export interface Conditions {
  context_restrictions: string[];
  start_time: string | null | Date;
  end_time: string | null | Date;
  eligible: boolean;
}
