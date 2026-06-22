import { apiClient } from './api';

export interface ChallengeData {
  slug: string;
  title: string;
  description: string;
  regex?: string;
}

export interface ChallengeListItem {
  slug: string;
  title: string;
  description: string;
  is_open: boolean;
  start_date: string;
  end_date: string;
}

export const challengeService = {
  getLatestChallenge: () => {
    return apiClient.get<ChallengeData>('/challenges/latest/');
  },
  getChallenge: (slug: string) => {
    return apiClient.get<ChallengeListItem>(`/challenges/${slug}/`);
  },
  getChallenges: () => {
    return apiClient.get<ChallengeListItem[]>('/challenges/');
  },
  submitChallenge: (slug: string, data: FormData) => {
    return apiClient.postFormData<unknown>(`/challenges/${slug}/submit/`, data);
  },
};
