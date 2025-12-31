/**
 * Wallet API models
 */

export interface WalletBalance {
  total: string;
  withdrawable: string;
  invested: string;
  rewards: string;
  coin_investable: string;
  coinset_investable: string;
  vault_investable: string;
}

export interface FuturesBalance {
  balance: string;
  locked_amount: string;
  first_time_user: boolean;
}

export interface TransferResult {
  success: boolean;
  transactionId: string;
  amount: string;
  asset: string;
  type: string;
  timestamp: number;
}
