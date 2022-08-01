import type { HttpClientModuleInterface, HttpClientResponse, StaticImplements } from './types';

export class HttpClientModule implements StaticImplements<HttpClientModuleInterface, typeof HttpClientModule> {
  static async get<T>(url: string): Promise<HttpClientResponse<T>> {
    const response = await fetch(url, { method: 'GET' });

    if (response.ok) {
      const data: T = await response.json();

      return {
        data,
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
    const response = await fetch(url, { method: 'POST', body });

    if (response.ok) {
      const data: T = await response.json();

      return {
        data,
        status: response.status,
      };
    }

    return {
      data: undefined,
      status: response.status,
    };
  }
}
