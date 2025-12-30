/**
 * Enums for Mudrex Trading API
 */

export enum OrderSide {
  BUY = 'BUY',
  SELL = 'SELL'
}

export enum OrderType {
  LIMIT = 'LIMIT',
  MARKET = 'MARKET',
  STOP_LOSS = 'STOP_LOSS',
  TAKE_PROFIT = 'TAKE_PROFIT'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  OPEN = 'OPEN',
  FILLED = 'FILLED',
  PARTIALLY_FILLED = 'PARTIALLY_FILLED',
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED'
}

export enum PositionSide {
  LONG = 'LONG',
  SHORT = 'SHORT'
}

export enum RiskTriggerType {
  STOP_LOSS = 'STOP_LOSS',
  TAKE_PROFIT = 'TAKE_PROFIT'
}

export enum TransferType {
  TO_FUTURES = 'TO_FUTURES',
  TO_SPOT = 'TO_SPOT'
}
