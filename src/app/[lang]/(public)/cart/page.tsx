import { Metadata } from "next";
import CartClient from "./CartClient";

export const metadata: Metadata = {
  title: "Cart - Kiều Sâm",
  description: "Shopping cart",
};

export default function CartPage() {
  return <CartClient />;
}

