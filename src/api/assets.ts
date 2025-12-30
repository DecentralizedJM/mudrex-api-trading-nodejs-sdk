/**
 * Assets API
 */

import { MudrexClient } from '../client';
import { Asset, AssetListResponse } from '../models';

export class AssetsApi {
  private client: MudrexClient;

  constructor(client: MudrexClient) {
    this.client = client;
  }

  /**
   * List all available assets
   */
  public async listAll(): Promise<Asset[]> {
    const response = await this.client.get<AssetListResponse>('/assets');
    return response.assets;
  }

  /**
   * Get specific asset details
   */
  public async getAsset(assetId: string): Promise<Asset> {
    return this.client.get<Asset>(`/assets/${assetId}`);
  }
}
