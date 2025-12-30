/**
 * Positions API models
 */

import { PositionSide } from './enums';

export interface Position {
  id: string;
  assetId: string;
  side: PositionSide;
  size: string;
  entryPrice: string;
  markPrice: string;
  leverage: number;
  margin: string;
  marginType: string;
  unrealizedPnl: string;
  unrealizedPnlPct: string;
  createdAt: number;
  updatedAt: number;
}

export interface RiskOrder {
  id: string;
  positionId: string;
  triggerType: string;
  triggerPrice: string;
  status: string;
  createdAt: number;
}
