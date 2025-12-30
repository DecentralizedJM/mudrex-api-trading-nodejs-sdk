/**
 * Positions API
 */

import { MudrexClient } from '../client';
import { Position, RiskOrder } from '../models';

export class PositionsApi {
  private client: MudrexClient;

  constructor(client: MudrexClient) {
    this.client = client;
  }

  /**
   * List all open positions
   */
  public async listOpen(): Promise<Position[]> {
    return this.client.get<Position[]>('/positions');
  }

  /**
   * Get a specific position
   */
  public async get(positionId: string): Promise<Position> {
    return this.client.get<Position>(`/positions/${positionId}`);
  }

  /**
   * Close a position completely
   */
  public async close(positionId: string): Promise<boolean> {
    await this.client.post<void>(`/positions/${positionId}/close`, null);
    return true;
  }

  /**
   * Close a position partially
   */
  public async closePartial(positionId: string, quantity: string): Promise<boolean> {
    const data = { quantity };
    await this.client.post<void>(`/positions/${positionId}/close`, data);
    return true;
  }

  /**
   * Reverse a position
   */
  public async reverse(positionId: string): Promise<boolean> {
    await this.client.post<void>(`/positions/${positionId}/reverse`, null);
    return true;
  }

  /**
   * Set a risk order (stop loss or take profit)
   */
  public async setRiskOrder(positionId: string, triggerType: string, triggerPrice: string): Promise<RiskOrder> {
    const data = {
      trigger_type: triggerType,
      trigger_price: triggerPrice,
    };
    return this.client.post<RiskOrder>(`/positions/${positionId}/risk-order`, data);
  }

  /**
   * Set a stop loss
   */
  public async setStopLoss(positionId: string, triggerPrice: string): Promise<RiskOrder> {
    return this.setRiskOrder(positionId, 'STOP_LOSS', triggerPrice);
  }

  /**
   * Set a take profit
   */
  public async setTakeProfit(positionId: string, triggerPrice: string): Promise<RiskOrder> {
    return this.setRiskOrder(positionId, 'TAKE_PROFIT', triggerPrice);
  }

  /**
   * Edit an existing risk order
   */
  public async editRiskOrder(positionId: string, riskOrderId: string, triggerPrice: string): Promise<RiskOrder> {
    const data = { trigger_price: triggerPrice };
    return this.client.patch<RiskOrder>(`/positions/${positionId}/risk-order/${riskOrderId}`, data);
  }

  /**
   * Get position history with pagination
   */
  public async getHistory(page: number = 0, perPage: number = 0): Promise<Position[]> {
    const params: Record<string, unknown> = {};
    if (page > 0) params.page = page;
    if (perPage > 0) params.per_page = perPage;

    return this.client.get<Position[]>('/positions/history', params);
  }
}
