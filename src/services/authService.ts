import { apiClient } from './api';

export interface User {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  national_code: string;
  school: unknown;
  phone: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: User;
}

export interface MessageResponse {
  message: string;
}

class AuthService {
  async getProfile(): Promise<User> {
    return apiClient.get<User>('/auth/users/profile/');
  }

  async login(data: LoginCredentials): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>('/auth/login/', data);
  }

  async logout(): Promise<MessageResponse> {
    return apiClient.post<MessageResponse>('/auth/logout/');
  }
}

export const authService = new AuthService();
