/**
 * Leverage API
 */

import { MudrexClient } from '../client';
import { Leverage } from '../models';

export class LeverageApi {
  private client: MudrexClient;

  constructor(client: MudrexClient) {
    this.client = client;
  }

  /**
   * Get current leverage for asset
   */
  public async get(assetId: string): Promise<Leverage> {
    return this.client.get<Leverage>(`/futures/${assetId}/leverage`);
  }

  /**
   * Set leverage for asset
   */
  public async set(assetId: string, leverage: number): Promise<Leverage> {
    const data = { leverage };
    return this.client.post<Leverage>(`/futures/${assetId}/leverage`, data);
  }
}
