import { useEffect, useMemo, useState } from "react";
import { getProductById } from "../data/shopProducts";
import { CartContext } from "./cartContext";

const storageKey = "beroya-cart";

function loadCart() {
  if (typeof window === "undefined") return [];

  try {
    const parsed = JSON.parse(window.localStorage.getItem(storageKey) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item) => getProductById(item.productId))
      .map((item) => ({
        productId: item.productId,
        quantity: Math.max(1, Number(item.quantity) || 1),
      }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const value = useMemo(() => {
    const addItem = (productId, quantity = 1) => {
      setItems((current) => {
        const existing = current.find((item) => item.productId === productId);
        if (existing) {
          return current.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
        }
        return [...current, { productId, quantity }];
      });
    };

    const removeItem = (productId) => {
      setItems((current) => current.filter((item) => item.productId !== productId));
    };

    const setQuantity = (productId, quantity) => {
      const nextQuantity = Math.max(1, Number(quantity) || 1);
      setItems((current) =>
        current.map((item) =>
          item.productId === productId ? { ...item, quantity: nextQuantity } : item,
        ),
      );
    };

    const clearCart = () => setItems([]);

    const enrichedItems = items
      .map((item) => ({
        ...item,
        product: getProductById(item.productId),
      }))
      .filter((item) => item.product);

    const totalQuantity = enrichedItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = enrichedItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    return {
      items,
      enrichedItems,
      totalQuantity,
      subtotal,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
