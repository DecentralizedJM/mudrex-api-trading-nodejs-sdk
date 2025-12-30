/**
 * Orders API
 */

import { MudrexClient } from '../client';
import { Order, OrderRequest, OrderSide, OrderType } from '../models';

export class OrdersApi {
  private client: MudrexClient;

  constructor(client: MudrexClient) {
    this.client = client;
  }

  /**
   * Create a new order
   */
  public async create(assetId: string, request: OrderRequest): Promise<Order> {
    return this.client.post<Order>(`/futures/${assetId}/order`, request);
  }

  /**
   * Create a market order
   */
  public async createMarketOrder(assetId: string, side: OrderSide, quantity: string): Promise<Order> {
    const request: OrderRequest = {
      side,
      type: OrderType.MARKET,
      quantity,
    };
    return this.create(assetId, request);
  }

  /**
   * Create a limit order
   */
  public async createLimitOrder(
    assetId: string,
    side: OrderSide,
    quantity: string,
    price: string
  ): Promise<Order> {
    const request: OrderRequest = {
      side,
      type: OrderType.LIMIT,
      quantity,
      price,
    };
    return this.create(assetId, request);
  }

  /**
   * List open orders
   */
  public async listOpen(): Promise<Order[]> {
    return this.client.get<Order[]>('/orders');
  }

  /**
   * Get specific order
   */
  public async get(orderId: string): Promise<Order> {
    return this.client.get<Order>(`/orders/${orderId}`);
  }

  /**
   * Get order history with pagination
   */
  public async getHistory(page: number = 0, perPage: number = 0): Promise<Order[]> {
    const params: Record<string, unknown> = {};
    if (page > 0) params.page = page;
    if (perPage > 0) params.per_page = perPage;

    return this.client.get<Order[]>('/orders/history', params);
  }

  /**
   * Cancel an order
   */
  public async cancel(orderId: string): Promise<boolean> {
    await this.client.delete<void>(`/orders/${orderId}`);
    return true;
  }

  /**
   * Amend an order
   */
  public async amend(orderId: string, updates: Record<string, unknown>): Promise<Order> {
    return this.client.patch<Order>(`/orders/${orderId}`, updates);
  }
}
