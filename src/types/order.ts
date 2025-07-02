export type Order = {
  id: string;
  userId: string;
  total: number;
  createdAt: string;
  status: OrderStatus;
  items: OrderItem[];
};

export enum OrderStatus {
  PENDING,
  SHIPPED,
  DELIVERED,
}

export type OrderItem = {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
};

export const statusLabels: Record<string, string> = {
  PENDING: "En attente",
  SHIPPED: "Expédiée",
  DELIVERED: "Livrée",
};
