/**
 * Fees API
 */

import { MudrexClient } from '../client';
import { FeeRecord } from '../models';

export class FeesApi {
  private client: MudrexClient;

  constructor(client: MudrexClient) {
    this.client = client;
  }

  /**
   * Get fee history with pagination
   */
  public async getHistory(page: number = 0, perPage: number = 0): Promise<FeeRecord[]> {
    const params: Record<string, unknown> = {};
    if (page > 0) params.page = page;
    if (perPage > 0) params.per_page = perPage;

    return this.client.get<FeeRecord[]>('/fees/history', params);
  }
}
