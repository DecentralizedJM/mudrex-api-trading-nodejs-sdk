/**
 * Orders API models
 */

import { OrderSide, OrderType, OrderStatus } from './enums';

export interface OrderRequest {
  side: OrderSide;
  type: OrderType;
  quantity: string;
  price?: string;
  triggerPrice?: string;
  clientOrderId?: string;
}

export interface Order {
  id: string;
  assetId: string;
  clientOrderId?: string;
  side: OrderSide;
  type: OrderType;
  quantity: string;
  filled: string;
  price: string;
  status: OrderStatus;
  createdAt: number;
  updatedAt: number;
  fee?: string;
  feeAsset?: string;
}
