/**
 * Common models
 */

export interface Leverage {
  assetId: string;
  leverage: number;
  maxLeverage: number;
  riskLevel: string;
}

export interface FeeRecord {
  id: string;
  asset: string;
  amount: string;
  feeType: string;
  timestamp: number;
}

export interface ApiResponse<T> {
  success: boolean;
  code?: string;
  message?: string;
  data?: T;
  timestamp: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
