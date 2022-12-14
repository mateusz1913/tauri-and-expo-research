/**
 * https://stackoverflow.com/a/69571314
 * 
 * Usage:
 * 
 * ```tsx
 * export interface TypeInstance {
 *   method(): void;
 * }
 * 
 * export interface TypeStatic {
 *   new (): TypeInstance;
 *   staticMethod(): void;
 * }
 * 
 * class Implementation implements StaticImplements<TypeStatic, typeof Implementation> {
 *   static handleAAA() {
 *     //
 *   }
 *   handleFoo(): void {
 *     //
 *   }
 * }
 * ```
 * 
 * https://stackoverflow.com/a/43674389
 * 
 * Could be also done with decorators like so:
 * 
 * ```tsx
 * function staticImplements<T>() {
 *   return <U extends T>(_constructor: U) => {};
 * }
 * 
 * @staticImplements<TypeStatic>()
 * class Impl {
 *   static staticMethod() {
 *     //
 *   }
 *   method() {
 *     //
 *   }
 * }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export type StaticImplements<I extends new (...args: any[]) => any, _C extends I> = InstanceType<I>;

class EmptyInstance {}

type PlatformType = 'linux' | 'darwin' | 'ios' | 'freebsd' | 'dragonfly' | 'netbsd' | 'openbsd' | 'solaris' | 'android' | 'win32' | 'web';
type OSType = 'android' | 'ios' | 'web' | 'linux' | 'windows' | 'macos';
export type PlatformTupleType = { platform: PlatformType, os: OSType };

export interface HttpClientResponse<T> {
  data?: T;
  status: number;
}

export interface PlatformModuleInterface {
  new(): EmptyInstance;
  getPlatform(): Promise<PlatformTupleType>;
}

export interface NotificationModuleInterface {
  new(): EmptyInstance;
  sendNotification(title: string, body?: string): Promise<void>;
}

export interface HttpClientModuleInterface {
  new(): EmptyInstance;
  get<T>(url: string): Promise<HttpClientResponse<T>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post<T>(url: string, body: any): Promise<HttpClientResponse<T>>;
}
