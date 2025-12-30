# Mudrex Node.js Trading SDK

Unofficial Node.js SDK for the [Mudrex Futures API](https://mudrex.com/). This SDK provides a type-safe, Promise-based interface for trading on Mudrex futures markets using TypeScript.

**Maintainer:** [DecentralizedJM](https://github.com/DecentralizedJM)

## Features

- 🔐 **Type-Safe**: Full TypeScript definitions for all API requests and responses
- ⚡ **Async/Await**: Modern Promise-based async design
- 🛡️ **Error Handling**: Comprehensive exception hierarchy with specific error types
- 📊 **Rate Limiting**: Built-in rate limiter (2 requests/second)
- 🔗 **Minimal Dependencies**: Only Axios for HTTP requests
- 📦 **npm Package**: Easy installation via npm

## Installation

### Via npm

```bash
npm install mudrex-trading-sdk
```

### Via yarn

```bash
yarn add mudrex-trading-sdk
```

### Via pnpm

```bash
pnpm add mudrex-trading-sdk
```

## Quick Start

### Initialize the Client

```typescript
import { MudrexClient } from 'mudrex-trading-sdk';

const client = new MudrexClient('your-api-key');
```

### Get Wallet Balance

```typescript
// Spot balance
const spotBalance = await client.wallet.getSpotBalance();
console.log(`Spot Balance: ${spotBalance.total}`);

// Futures balance
const futuresBalance = await client.wallet.getFuturesBalance();
console.log(`Futures Balance: ${futuresBalance.total}`);
```

### List Assets

```typescript
const assets = await client.assets.listAll();
assets.forEach((asset) => {
  console.log(`Asset: ${asset.id} - Min Order: ${asset.minOrder}`);
});
```

### Create an Order

```typescript
const order = await client.orders.createLimitOrder(
  'BTCUSD',
  'BUY',
  '0.1',
  '50000'
);
console.log(`Order Created: ${order.id}`);
```

### Get Open Positions

```typescript
const positions = await client.positions.listOpen();
positions.forEach((position) => {
  console.log(`Position: ${position.assetId} - Size: ${position.size} - Leverage: ${position.leverage}`);
});
```

### Close a Position

```typescript
const success = await client.positions.close('position-id');
if (success) {
  console.log('Position closed');
}
```

### Set Stop Loss

```typescript
const riskOrder = await client.positions.setStopLoss('position-id', '48000');
console.log(`Stop Loss Set at: ${riskOrder.triggerPrice}`);
```

## API Reference

### Wallet API

```typescript
// Get spot wallet balance
const balance = await client.wallet.getSpotBalance();

// Get futures wallet balance
const balance = await client.wallet.getFuturesBalance();

// Transfer between spot and futures
const result = await client.wallet.transfer('BTC', '1.0', 'TO_FUTURES');

// Convenience methods
await client.wallet.transferToFutures('BTC', '1.0');
await client.wallet.transferToSpot('BTC', '1.0');
```

### Assets API

```typescript
// List all available assets
const assets = await client.assets.listAll();

// Get specific asset details
const asset = await client.assets.getAsset('BTCUSD');
```

### Leverage API

```typescript
// Get current leverage
const leverage = await client.leverage.get('BTCUSD');

// Set leverage
await client.leverage.set('BTCUSD', 10);
```

### Orders API

```typescript
// Create order
const order = await client.orders.create('BTCUSD', {
  side: 'BUY',
  type: 'LIMIT',
  quantity: '0.1',
  price: '50000',
});

// Convenience methods
await client.orders.createMarketOrder('BTCUSD', 'BUY', '0.1');
await client.orders.createLimitOrder('BTCUSD', 'BUY', '0.1', '50000');

// List open orders
const orders = await client.orders.listOpen();

// Get specific order
const order = await client.orders.get('order-id');

// Get order history with pagination
const history = await client.orders.getHistory(1, 20);

// Cancel order
await client.orders.cancel('order-id');

// Amend order
await client.orders.amend('order-id', { quantity: '0.2' });
```

### Positions API

```typescript
// List open positions
const positions = await client.positions.listOpen();

// Get specific position
const position = await client.positions.get('position-id');

// Close position completely
await client.positions.close('position-id');

// Close position partially
await client.positions.closePartial('position-id', '0.5');

// Reverse position
await client.positions.reverse('position-id');

// Risk orders (stop loss / take profit)
await client.positions.setStopLoss('position-id', '48000');
await client.positions.setTakeProfit('position-id', '52000');

// Generic risk order setting
const riskOrder = await client.positions.setRiskOrder(
  'position-id',
  'STOP_LOSS',
  '48000'
);

// Edit existing risk order
await client.positions.editRiskOrder('position-id', 'risk-order-id', '47000');

// Get position history with pagination
const history = await client.positions.getHistory(1, 20);
```

### Fees API

```typescript
// Get fee history with pagination
const fees = await client.fees.getHistory(1, 20);
fees.forEach((fee) => {
  console.log(`Fee: ${fee.amount} - Asset: ${fee.asset}`);
});
```

## Error Handling

The SDK provides specific exception types for different error scenarios:

```typescript
import {
  MudrexAuthenticationException,
  MudrexRateLimitException,
  MudrexValidationException,
  MudrexNotFoundException,
  MudrexInsufficientBalanceException,
  MudrexServerException,
  MudrexException,
} from 'mudrex-trading-sdk';

try {
  const balance = await client.wallet.getSpotBalance();
} catch (error) {
  if (error instanceof MudrexAuthenticationException) {
    console.error(`Authentication failed: ${error.message}`);
  } else if (error instanceof MudrexRateLimitException) {
    console.error(`Rate limited: ${error.message}`);
    // Implement backoff logic
  } else if (error instanceof MudrexValidationException) {
    console.error(`Validation error: ${error.message}`);
  } else if (error instanceof MudrexNotFoundException) {
    console.error(`Resource not found: ${error.message}`);
  } else if (error instanceof MudrexInsufficientBalanceException) {
    console.error(`Insufficient balance: ${error.message}`);
  } else if (error instanceof MudrexServerException) {
    console.error(`Server error: ${error.message}`);
  } else if (error instanceof MudrexException) {
    console.error(`API error: ${error.message}`);
  }
}
```

## Configuration

### Custom Base URL

```typescript
const client = new MudrexClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://custom-api-endpoint.com',
});
```

### Custom Rate Limit

```typescript
const client = new MudrexClient({
  apiKey: 'your-api-key',
  requestsPerSecond: 5, // Default is 2
});
```

## Usage Examples

### Complete Trading Example

```typescript
import { MudrexClient, OrderSide, OrderType } from 'mudrex-trading-sdk';

const client = new MudrexClient('your-api-key');

async function executeTradeFlow() {
  try {
    // Check balance
    const balance = await client.wallet.getFuturesBalance();
    console.log(`Available: ${balance.available}`);

    // Create a limit order
    const order = await client.orders.createLimitOrder(
      'BTCUSD',
      OrderSide.BUY,
      '0.1',
      '50000'
    );
    console.log(`Order created: ${order.id}`);

    // Wait for order to fill and position to open
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Get position
    const positions = await client.positions.listOpen();
    const position = positions[0];
    console.log(`Position size: ${position.size}`);

    // Set stop loss and take profit
    await client.positions.setStopLoss(position.id, '48000');
    await client.positions.setTakeProfit(position.id, '52000');

    console.log('Trade flow completed');
  } catch (error) {
    console.error('Error:', error);
  }
}

executeTradeFlow();
```

### Monitoring Positions

```typescript
async function monitorPositions() {
  const positions = await client.positions.listOpen();

  for (const position of positions) {
    const pnl = parseFloat(position.unrealizedPnlPct);
    if (pnl < -5) {
      console.warn(`Position ${position.id} down ${pnl}%`);
      // Take action
    }
  }
}
```

## Building from Source

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Run tests
npm test

# Format code
npm run format

# Lint code
npm run lint
```

## Rate Limiting

The SDK includes built-in rate limiting (2 requests/second by default). If you exceed rate limits, a `MudrexRateLimitException` is thrown.

## Contributing

This is an unofficial SDK maintained by the community. Contributions are welcome!

## License

MIT License - see LICENSE file for details

## API Documentation

For complete API documentation, visit: https://mudrex.com/api/docs

## Support

For issues, questions, or suggestions:
- Open an issue on [GitHub](https://github.com/DecentralizedJM/mudrex-nodejs-sdk)
- Check the [API docs](https://mudrex.com/api/docs)

## Changelog

### v1.0.0
- Initial release
- All 6 API modules implemented
- Full TypeScript support
- Rate limiting and error handling
