/**
 * Main Mudrex Trading SDK Client
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import { RateLimiter } from './utils/rateLimiter';
import { WalletApi } from './api/wallet';
import { AssetsApi } from './api/assets';
import { LeverageApi } from './api/leverage';
import { OrdersApi } from './api/orders';
import { PositionsApi } from './api/positions';
import { FeesApi } from './api/fees';
import {
  MudrexException,
  MudrexAuthenticationException,
  MudrexRateLimitException,
  MudrexValidationException,
  MudrexNotFoundException,
  MudrexConflictException,
  MudrexServerException,
  MudrexInsufficientBalanceException,
} from './exceptions';
import { ApiResponse } from './models';

export interface MudrexClientConfig {
  apiKey: string;
  baseUrl?: string;
  requestsPerSecond?: number;
}

export class MudrexClient {
  private apiKey: string;
  private baseUrl: string;
  private httpClient: AxiosInstance;
  private rateLimiter: RateLimiter;

  public wallet: WalletApi;
  public assets: AssetsApi;
  public leverage: LeverageApi;
  public orders: OrdersApi;
  public positions: PositionsApi;
  public fees: FeesApi;

  constructor(config: MudrexClientConfig | string) {
    const configObj = typeof config === 'string' ? { apiKey: config } : config;

    this.apiKey = configObj.apiKey;
    this.baseUrl = configObj.baseUrl || 'https://trade.mudrex.com/fapi/v1';
    this.rateLimiter = new RateLimiter(configObj.requestsPerSecond || 2);

    this.httpClient = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'X-Authentication': this.apiKey,
        'Content-Type': 'application/json',
      },
    });

    this.wallet = new WalletApi(this);
    this.assets = new AssetsApi(this);
    this.leverage = new LeverageApi(this);
    this.orders = new OrdersApi(this);
    this.positions = new PositionsApi(this);
    this.fees = new FeesApi(this);
  }

  /**
   * GET request
   */
  public async get<T = unknown>(path: string, params?: Record<string, unknown>): Promise<T> {
    await this.rateLimiter.wait();

    try {
      const response = await this.httpClient.get<ApiResponse<T>>(path, { params });
      return response.data.data as T;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * POST request
   */
  public async post<T = unknown>(path: string, data?: unknown): Promise<T> {
    await this.rateLimiter.wait();

    try {
      const response = await this.httpClient.post<ApiResponse<T>>(path, data);
      return response.data.data as T;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * PATCH request
   */
  public async patch<T = unknown>(path: string, data?: unknown): Promise<T> {
    await this.rateLimiter.wait();

    try {
      const response = await this.httpClient.patch<ApiResponse<T>>(path, data);
      return response.data.data as T;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * DELETE request
   */
  public async delete<T = unknown>(path: string): Promise<T> {
    await this.rateLimiter.wait();

    try {
      const response = await this.httpClient.delete<ApiResponse<T>>(path);
      return response.data.data as T;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Handle API errors and convert to appropriate exceptions
   */
  private handleError(error: unknown): MudrexException {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status || 500;
      const data = axiosError.response?.data as Record<string, unknown>;
      const message = (data?.message as string) || axiosError.message || 'Unknown error';

      switch (status) {
        case 401:
          return new MudrexAuthenticationException(message);
        case 429:
          return new MudrexRateLimitException(message);
        case 400:
          if (message.toLowerCase().includes('insufficient')) {
            return new MudrexInsufficientBalanceException(message);
          }
          return new MudrexValidationException(message);
        case 404:
          return new MudrexNotFoundException(message);
        case 409:
          return new MudrexConflictException(message);
        case 500:
        case 502:
        case 503:
          return new MudrexServerException(message);
        default:
          return new MudrexException(message, status);
      }
    }

    return new MudrexException('Unknown error occurred', 500);
  }
}

export default MudrexClient;
