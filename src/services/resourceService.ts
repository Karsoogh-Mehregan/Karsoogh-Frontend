import { apiClient } from './api';

export interface DashboardResource {
  id: number;
  title: string;
  description?: string;
  url: string;
  type: 'video_aparat' | 'video_youtube' | 'video_direct' | 'link';
  thumbnail?: string;
  category?: string;
  is_new?: boolean;
}

export const resourceService = {
  getResources: () => {
    return apiClient.get<DashboardResource[]>('/auth/dashboard/resources/');
  },
};
