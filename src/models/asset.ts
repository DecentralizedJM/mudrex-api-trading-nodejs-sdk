/**
 * Assets API models
 */

export interface Asset {
  id: string;
  name: string;
  baseCoin: string;
  quoteCoin: string;
  minOrder: string;
  maxOrder: string;
  tickSize: string;
  stepSize: string;
  makerFee: string;
  takerFee: string;
  status: string;
}

export interface AssetListResponse {
  total: number;
  assets: Asset[];
}
