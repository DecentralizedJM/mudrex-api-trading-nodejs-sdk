/**
 * Rate limiter utility
 */

export class RateLimiter {
  private lastRequestTime: number = 0;
  private minInterval: number;

  constructor(requestsPerSecond: number = 2) {
    this.minInterval = 1000 / requestsPerSecond;
  }

  public async wait(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;

    if (timeSinceLastRequest < this.minInterval) {
      const delayNeeded = this.minInterval - timeSinceLastRequest;
      await new Promise<void>((resolve) => {
        setTimeout(resolve, delayNeeded);
      });
    }

    this.lastRequestTime = Date.now();
  }
}
