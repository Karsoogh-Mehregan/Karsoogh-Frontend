export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

interface RefreshSubItem {
  resolve: (value?: unknown) => void;
  reject: (reason: Error) => void;
}

class ApiClient {
  private baseUrl: string;
  private isRefreshing = false;
  private refreshSubscribers: RefreshSubItem[] = [];

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getHeaders(content_type: string = 'application/json'): Headers {
    const headers = new Headers({
      'Content-Type': content_type,
      Accept: 'application/json',
    });

    const csrfToken = this.getCookie('csrftoken');
    if (csrfToken) {
      headers.set('X-CSRFToken', csrfToken);
    }

    return headers;
  }

  private getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');

    for (const cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
      if (key == name) {
        return decodeURIComponent(value);
      }
    }
    return null;
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<Response> {
    const url = `${this.baseUrl}${endpoint}`;

    if (!options) {
      options = { headers: this.getHeaders(), method: 'GET' };
    }

    if (!options.headers) {
      options.headers = this.getHeaders();
    }
    options.credentials = 'include';

    const response = await fetch(url, options);
    return response;
  }

  private onRefreshed() {
    this.refreshSubscribers.forEach((subscriber) => subscriber.resolve());
    this.refreshSubscribers = [];
  }

  private onRefreshFailed(error: Error) {
    this.refreshSubscribers.forEach((subscriber) => subscriber.reject(error));
    this.refreshSubscribers = [];
  }

  private async handleResponse<T>(
    response: Response,
    endpoint: string,
    options: RequestInit,
    retry = false,
  ): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      // Handle 401 error
      if (response.status === 401) {
        if (
          (errorData.code === 'token_not_valid' ||
            errorData.detail === 'Authentication credentials were not provided.') &&
          !retry
        ) {
          if (this.isRefreshing) {
            await new Promise((resolve, reject) => {
              this.refreshSubscribers.push({ resolve, reject });
            });
            const newRes = await this.request(endpoint, options);
            return this.handleResponse<T>(newRes, endpoint, options, true);
          }

          this.isRefreshing = true;

          try {
            const refreshResponse = await this.request('/auth/refresh/', { method: 'POST' });

            if (!refreshResponse.ok) {
              throw new Error('Refresh Failed');
            }

            this.isRefreshing = false;
            this.onRefreshed();

            const newResponse = await this.request(endpoint, options);
            return this.handleResponse<T>(newResponse, endpoint, options, true);
          } catch (refreshError) {
            this.isRefreshing = false;
            // router.navigate('/login');

            const err =
              refreshError instanceof Error
                ? refreshError
                : new Error('مشکلی در تمدید احراز هویت به وجود آمد.');
            this.onRefreshFailed(err);

            throw err;
          }
        }
      }
      console.error('API Response Error:', {
        status: response.status,
        url: response.url,
        data: errorData,
      });

      let errorMessage = errorData.detail || errorData.message || errorData.error;

      if (!errorMessage) {
        if (response.status === 500) {
          errorMessage = 'خطای سرور';
        } else if (response.status === 403) {
          errorMessage = 'مجوز این کار را ندارید.';
        } else {
          errorMessage = 'خطا در ارتباط با سرور.';
        }
      }

      throw new Error(errorMessage);
    }

    if (response.status === 204) {
      return {} as T;
    }

    return response.json() as T;
  }

  async get<T>(endpoint: string): Promise<T> {
    const options: RequestInit = { method: 'GET' };
    const response = await this.request(endpoint, options);
    return this.handleResponse<T>(response, endpoint, options);
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    const options: RequestInit = { method: 'POST', body: data ? JSON.stringify(data) : undefined };
    const response = await this.request(endpoint, options);
    return this.handleResponse<T>(response, endpoint, options);
  }

  async postFormData<T>(endpoint: string, formData: FormData): Promise<T> {
    const headers = new Headers();
    const csrfToken = this.getCookie('csrftoken');
    if (csrfToken) {
      headers.set('X-CSRFToken', csrfToken);
    }
    const options: RequestInit = { method: 'POST', body: formData, headers };
    const response = await this.request(endpoint, options);
    return this.handleResponse<T>(response, endpoint, options);
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    const options: RequestInit = { method: 'PUT', body: data ? JSON.stringify(data) : undefined };
    const response = await this.request(endpoint, options);
    return this.handleResponse<T>(response, endpoint, options);
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    const options: RequestInit = { method: 'PATCH', body: data ? JSON.stringify(data) : undefined };
    const response = await this.request(endpoint, options);
    return this.handleResponse<T>(response, endpoint, options);
  }

  async delete<T>(endpoint: string): Promise<T> {
    const options: RequestInit = { method: 'DELETE' };
    const response = await this.request(endpoint, options);
    return this.handleResponse<T>(response, endpoint, options);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
