export interface OrderItem {
  productId: number;
  quantity: number;
  price?: number;
}

export interface Order {
  id?: number;
  customerName: string;
  customerEmail: string;
  orderDate?: string;
  totalPrice?: number;
  status?: string;
  items: OrderItem[];
}
