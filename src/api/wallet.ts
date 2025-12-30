/**
 * Wallet API
 */

import { MudrexClient } from '../client';
import { WalletBalance, FuturesBalance, TransferResult, TransferType } from '../models';

export class WalletApi {
  private client: MudrexClient;

  constructor(client: MudrexClient) {
    this.client = client;
  }

  /**
   * Get spot wallet balance
   */
  public async getSpotBalance(): Promise<WalletBalance> {
    return this.client.get<WalletBalance>('/wallet/balance?type=SPOT');
  }

  /**
   * Get futures wallet balance
   */
  public async getFuturesBalance(): Promise<FuturesBalance> {
    return this.client.get<FuturesBalance>('/wallet/balance?type=FUTURES');
  }

  /**
   * Transfer between spot and futures
   */
  public async transfer(asset: string, amount: string, type: TransferType): Promise<TransferResult> {
    const data = {
      asset,
      amount,
      type,
    };
    return this.client.post<TransferResult>('/wallet/transfer', data);
  }

  /**
   * Transfer to futures
   */
  public async transferToFutures(asset: string, amount: string): Promise<TransferResult> {
    return this.transfer(asset, amount, TransferType.TO_FUTURES);
  }

  /**
   * Transfer to spot
   */
  public async transferToSpot(asset: string, amount: string): Promise<TransferResult> {
    return this.transfer(asset, amount, TransferType.TO_SPOT);
  }
}
