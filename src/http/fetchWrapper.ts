import { BE_API } from '@/env'

type ConfigFetchOption = RequestInit & {
  timeout?: number
  onRequest?: (_url: string, _option: RequestInit) => void
  onResponse?: (_response: Response) => void
  onError?: (_error: Error) => void
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

class FetchWrapper {
  static async request<T>(
    url: string,
    options: ConfigFetchOption = {}
  ): Promise<T> {
    const {
      timeout = 5000,
      onRequest,
      onResponse,
      onError,
      ...fetchOptions
    } = options
    // 请求拦截器
    onRequest?.(url, fetchOptions)

    const controller = new AbortController()
    fetchOptions.signal = controller.signal

    // 超时逻辑
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(BE_API + url, fetchOptions)

      // 响应拦截器（可选）
      onResponse?.(response)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = (await response.json()) as T
      return data
    } catch (error: unknown) {
      // 错误拦截器（可选）
      onError?.(error as Error)
      throw error
    } finally {
      clearTimeout(timeoutId)
    }
  }

  static send<T, U>(
    method: HttpMethod,
    { url, params }: { url: string; params?: T },
    options: ConfigFetchOption = {}
  ): Promise<U> {
    const config: ConfigFetchOption = {
      ...options,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: method !== 'GET' ? JSON.stringify(params) : undefined,
    }

    return this.request<U>(url, config)
  }

  static get<T, U>(
    { url, params }: { url: string; params?: T },
    options?: ConfigFetchOption
  ): Promise<U> {
    const queryString = params
      ? '?' +
        new URLSearchParams(
          Object.entries(params).reduce(
            (acc, [key, value]) => {
              acc[key] = String(value)
              return acc
            },
            {} as Record<string, string>
          )
        ).toString()
      : ''

    return this.send<T, U>('GET', { url: url + queryString }, options)
  }

  static post<T, U>(
    { url, params }: { url: string; params?: T },
    options?: ConfigFetchOption
  ): Promise<U> {
    return this.send<T, U>('POST', { url, params }, options)
  }

  static put<T, U>(
    { url, params }: { url: string; params?: T },
    options?: ConfigFetchOption
  ): Promise<U> {
    return this.send<T, U>('PUT', { url, params }, options)
  }

  static delete<T, U>(
    { url, params }: { url: string; params?: T },
    options?: ConfigFetchOption
  ): Promise<U> {
    return this.send<T, U>('DELETE', { url, params }, options)
  }
}

export default FetchWrapper
