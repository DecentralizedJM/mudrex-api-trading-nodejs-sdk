/**
 * Wallet API models
 */

export interface WalletBalance {
  total: string;
  available: string;
  locked: string;
}

export interface FuturesBalance {
  total: string;
  available: string;
  locked: string;
  unrealizedPnl: string;
}

export interface TransferResult {
  success: boolean;
  transactionId: string;
  amount: string;
  asset: string;
  type: string;
  timestamp: number;
}
