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
  const [lastAddedItem, setLastAddedItem] = useState(null);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const value = useMemo(() => {
    const addItem = (productId, quantity = 1) => {
      const product = getProductById(productId);
      if (!product) return;

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
      setLastAddedItem({
        product,
        productId,
        quantity,
        nonce: `${productId}-${Date.now()}`,
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
    const dismissAddedItem = () => setLastAddedItem(null);

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
      lastAddedItem,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
      dismissAddedItem,
    };
  }, [items, lastAddedItem]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
