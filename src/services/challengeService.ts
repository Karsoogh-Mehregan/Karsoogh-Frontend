import { apiClient } from './api';

export interface ChallengeData {
  slug: string;
  title: string;
  description: string;
  regex?: string;
  is_open: boolean;
  start_date?: string;
  end_date?: string;
}

export interface ChallengeListItem {
  slug: string;
  title: string;
  description: string;
  is_open: boolean;
  start_date: string;
  end_date: string;
}

class ChallengeService {
  async getLatestChallenge() {
    return apiClient.get<ChallengeData>('/challenges/latest/');
  }

  async getChallenge(slug: string) {
    return apiClient.get<ChallengeData>(`/challenges/${slug}/`);
  }

  async getChallenges() {
    return apiClient.get<ChallengeListItem[]>('/challenges/');
  }

  async submitChallenge(slug: string, data: FormData) {
    return apiClient.postFormData<unknown>(`/challenges/${slug}/submit/`, data);
  }
}

export const challengeService = new ChallengeService();
