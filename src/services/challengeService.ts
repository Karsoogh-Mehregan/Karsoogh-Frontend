import { apiClient } from './api';

export interface ChallengeData {
  slug: string;
  title: string;
  description: string;
  regex?: string;
}

export const challengeService = {
  getLatestChallenge: () => {
    return apiClient.get<ChallengeData>('/challenges/latest/');
  },
  submitChallenge: (slug: string, data: FormData) => {
    return apiClient.postFormData<unknown>(`/challenges/${slug}/submit/`, data);
  },
};
