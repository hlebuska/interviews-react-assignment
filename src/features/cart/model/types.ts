import { Product } from "../../shop/model/types";

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
};
