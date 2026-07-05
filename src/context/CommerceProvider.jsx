import { useCallback, useEffect, useMemo, useState } from "react";
import { productCatalog } from "../data/shopProducts";
import { CommerceContext } from "./commerceContext";

const inventoryKey = "beroya-inventory";
const ordersKey = "beroya-orders";

const seededStock = {
  "braking-system-pro": { stock: 42, reserved: 3, sold: 18, reorderLevel: 8, warehouse: "DXB-A1" },
  "suspension-control-arm": { stock: 36, reserved: 2, sold: 14, reorderLevel: 8, warehouse: "DXB-B2" },
  "engine-mount-premium": { stock: 18, reserved: 1, sold: 9, reorderLevel: 6, warehouse: "DXB-C1" },
  "filtration-performance-kit": { stock: 96, reserved: 6, sold: 42, reorderLevel: 18, warehouse: "DXB-F3" },
  "steering-precision-link": { stock: 28, reserved: 2, sold: 11, reorderLevel: 7, warehouse: "DXB-S2" },
  "drivetrain-joint-assembly": { stock: 12, reserved: 4, sold: 7, reorderLevel: 5, warehouse: "DXB-D4" },
};

function readJson(key, fallback) {
  if (typeof window === "undefined") return fallback;

  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) || "null");
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function makeInventorySeed() {
  return productCatalog.reduce((records, product) => {
    records[product.id] = {
      productId: product.id,
      sku: product.sku,
      category: product.category,
      ...seededStock[product.id],
      updatedAt: new Date().toISOString(),
    };
    return records;
  }, {});
}

function makeOrderNumber() {
  const stamp = Date.now().toString(36).toUpperCase();
  return `BRY-${stamp.slice(-6)}`;
}

function makeSeedOrders() {
  return [
    {
      id: "order_seed_1007",
      number: "BRY-1007",
      status: "fulfilled",
      paymentMethod: "card",
      paymentStatus: "paid",
      customerEmail: "omar@example.com",
      customerName: "Omar Al Mansouri",
      city: "Dubai",
      car: "BMW X5 2022",
      createdAt: "2026-07-01T09:40:00.000Z",
      totalAmount: 1130,
      items: [
        { productId: "braking-system-pro", sku: "BRY-BRK-610", quantity: 2, unitPrice: 420, lineTotal: 840 },
        { productId: "filtration-performance-kit", sku: "BRY-FLT-120", quantity: 2, unitPrice: 145, lineTotal: 290 },
      ],
      notes: "Priority replacement order",
    },
    {
      id: "order_seed_1008",
      number: "BRY-1008",
      status: "paymentPending",
      paymentMethod: "paymentLink",
      paymentStatus: "pending",
      customerEmail: "layla@example.com",
      customerName: "Layla Hassan",
      city: "Abu Dhabi",
      car: "Mercedes C-Class 2021",
      createdAt: "2026-07-03T14:18:00.000Z",
      totalAmount: 675,
      items: [
        { productId: "engine-mount-premium", sku: "BRY-MNT-330", quantity: 1, unitPrice: 275, lineTotal: 275 },
        { productId: "steering-precision-link", sku: "BRY-STR-440", quantity: 1, unitPrice: 310, lineTotal: 310 },
      ],
      notes: "Waiting for customer confirmation",
    },
    {
      id: "order_seed_1009",
      number: "BRY-1009",
      status: "processing",
      paymentMethod: "whatsapp",
      paymentStatus: "pending",
      customerEmail: "parts@garage.example",
      customerName: "Premium Garage",
      city: "Sharjah",
      car: "Fleet order",
      createdAt: "2026-07-04T11:08:00.000Z",
      totalAmount: 870,
      items: [
        { productId: "suspension-control-arm", sku: "BRY-SUS-240", quantity: 2, unitPrice: 365, lineTotal: 730 },
        { productId: "filtration-performance-kit", sku: "BRY-FLT-120", quantity: 1, unitPrice: 145, lineTotal: 145 },
      ],
      notes: "Trade account inquiry",
    },
  ];
}

function statusType(status) {
  if (status === "paid" || status === "fulfilled") return "sold";
  if (status === "cancelled") return "cancelled";
  return "reserved";
}

function mutateInventoryForItems(inventory, items, mode) {
  const next = { ...inventory };

  items.forEach((item) => {
    const current = next[item.productId];
    if (!current) return;
    const quantity = Math.max(0, Number(item.quantity) || 0);
    const updated = { ...current, updatedAt: new Date().toISOString() };

    if (mode === "reserve") {
      updated.reserved = Math.max(0, updated.reserved + quantity);
    }

    if (mode === "release") {
      updated.reserved = Math.max(0, updated.reserved - quantity);
    }

    if (mode === "sellFromReserved") {
      updated.reserved = Math.max(0, updated.reserved - quantity);
      updated.stock = Math.max(0, updated.stock - quantity);
      updated.sold = Math.max(0, updated.sold + quantity);
    }

    if (mode === "returnSold") {
      updated.stock = Math.max(0, updated.stock + quantity);
      updated.sold = Math.max(0, updated.sold - quantity);
    }

    next[item.productId] = updated;
  });

  return next;
}

function transitionInventory(inventory, order, nextStatus) {
  const previous = statusType(order.status);
  const next = statusType(nextStatus);
  if (previous === next) return inventory;

  if (previous === "reserved" && next === "sold") {
    return mutateInventoryForItems(inventory, order.items, "sellFromReserved");
  }

  if (previous === "reserved" && next === "cancelled") {
    return mutateInventoryForItems(inventory, order.items, "release");
  }

  if (previous === "sold" && next === "cancelled") {
    return mutateInventoryForItems(inventory, order.items, "returnSold");
  }

  if (previous === "sold" && next === "reserved") {
    const returned = mutateInventoryForItems(inventory, order.items, "returnSold");
    return mutateInventoryForItems(returned, order.items, "reserve");
  }

  if (previous === "cancelled" && next === "reserved") {
    return mutateInventoryForItems(inventory, order.items, "reserve");
  }

  if (previous === "cancelled" && next === "sold") {
    return mutateInventoryForItems(inventory, order.items, "sellFromReserved");
  }

  return inventory;
}

export function CommerceProvider({ children }) {
  const [inventory, setInventory] = useState(() => readJson(inventoryKey, makeInventorySeed()));
  const [orders, setOrders] = useState(() => readJson(ordersKey, makeSeedOrders()));

  useEffect(() => {
    window.localStorage.setItem(inventoryKey, JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    window.localStorage.setItem(ordersKey, JSON.stringify(orders));
  }, [orders]);

  const createOrder = useCallback(({ fields, items, paymentMethod = "paymentLink", customerId = "" }) => {
    if (!items.length) return null;

    const orderItems = items.map(({ product, copy, quantity }) => ({
      productId: product.id,
      sku: product.sku,
      name: copy.name,
      quantity,
      unitPrice: product.price,
      lineTotal: product.price * quantity,
    }));

    const order = {
      id: `order_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
      number: makeOrderNumber(),
      status: paymentMethod === "card" ? "paymentPending" : "inquiry",
      paymentMethod,
      paymentStatus: "pending",
      customerId,
      customerEmail: fields.email,
      customerName: fields.fullName,
      city: fields.city,
      car: [fields.carBrand, fields.carModel, fields.year].filter(Boolean).join(" "),
      vin: fields.vin,
      createdAt: new Date().toISOString(),
      totalAmount: orderItems.reduce((sum, item) => sum + item.lineTotal, 0),
      items: orderItems,
      notes: fields.notes || "",
    };

    setOrders((current) => [order, ...current]);
    setInventory((current) => mutateInventoryForItems(current, orderItems, "reserve"));
    return order;
  }, []);

  const updateOrderStatus = useCallback((orderId, nextStatus) => {
    const order = orders.find((item) => item.id === orderId);
    if (!order || order.status === nextStatus) return;

    setInventory((currentInventory) => transitionInventory(currentInventory, order, nextStatus));
    setOrders((currentOrders) =>
      currentOrders.map((item) =>
        item.id === orderId
          ? {
              ...item,
              status: nextStatus,
              paymentStatus:
                nextStatus === "paid" || nextStatus === "fulfilled"
                  ? "paid"
                  : nextStatus === "cancelled"
                    ? "cancelled"
                    : item.paymentStatus,
              updatedAt: new Date().toISOString(),
            }
          : item,
      ),
    );
  }, [orders]);

  const updateStock = useCallback((productId, stock) => {
    setInventory((current) => ({
      ...current,
      [productId]: {
        ...current[productId],
        stock: Math.max(0, Number(stock) || 0),
        updatedAt: new Date().toISOString(),
      },
    }));
  }, []);

  const adjustStock = useCallback((productId, delta) => {
    setInventory((current) => {
      const item = current[productId];
      if (!item) return current;
      return {
        ...current,
        [productId]: {
          ...item,
          stock: Math.max(0, item.stock + delta),
          updatedAt: new Date().toISOString(),
        },
      };
    });
  }, []);

  const resetCommerceDemo = useCallback(() => {
    setInventory(makeInventorySeed());
    setOrders(makeSeedOrders());
  }, []);

  const metrics = useMemo(() => {
    const paidOrders = orders.filter((order) => order.status === "paid" || order.status === "fulfilled");
    const openOrders = orders.filter((order) => statusType(order.status) === "reserved");
    const lowStock = Object.values(inventory).filter(
      (item) => item.stock - item.reserved <= item.reorderLevel,
    );

    return {
      revenue: paidOrders.reduce((sum, order) => sum + order.totalAmount, 0),
      orders: orders.length,
      openOrders: openOrders.length,
      lowStock: lowStock.length,
      unitsSold: Object.values(inventory).reduce((sum, item) => sum + item.sold, 0),
    };
  }, [inventory, orders]);

  const value = useMemo(
    () => ({
      adjustStock,
      createOrder,
      inventory,
      metrics,
      orders,
      resetCommerceDemo,
      updateOrderStatus,
      updateStock,
    }),
    [adjustStock, createOrder, inventory, metrics, orders, resetCommerceDemo, updateOrderStatus, updateStock],
  );

  return <CommerceContext.Provider value={value}>{children}</CommerceContext.Provider>;
}
