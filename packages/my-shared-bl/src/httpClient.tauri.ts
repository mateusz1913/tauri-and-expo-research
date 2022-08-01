import { fetch } from '@tauri-apps/api/http';

import type { HttpClientModuleInterface, HttpClientResponse, StaticImplements } from './types';

export class HttpClientModule implements StaticImplements<HttpClientModuleInterface, typeof HttpClientModule> {
  static async get<T>(url: string): Promise<HttpClientResponse<T>> {
    const response = await fetch<T>(url, { method: 'GET' });

    if (response.ok) {
      return {
        data: response.data,
        status: response.status,
      };
    }

    return {
      data: undefined,
      status: response.status,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async post<T>(url: string, body: any): Promise<HttpClientResponse<T>> {
    const response = await fetch<T>(url, { method: 'POST', body });

    if (response.ok) {
      return {
        data: response.data,
        status: response.status,
      };
    }

    return {
      data: undefined,
      status: response.status,
    };
  }
}
