import { apiClient } from './api';

export interface Submission {
  id: number;
  user: number;
  question: number;
  question_name: string;
  exam_id: number;
  file: string;
  grade: number | null;
  max_grade: number | null;
  description: string | null;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type FilterType = 'all' | 'graded' | 'ungraded';

interface ListSubmissionsParams {
  questionId: number;
  page: number;
  filter: FilterType;
  searchId?: number;
}

class SubmissionService {
  async getSubmission(submissionId: number) {
    return apiClient.get<Submission>(`/exams/submissions/${submissionId}/`);
  }

  async gradeSubmission(submissionId: number, grade: number, description: string) {
    return apiClient.patch<Submission>(`/exams/submissions/${submissionId}/`, {
      grade,
      description,
    });
  }

  async listSubmissions({ questionId, page, filter, searchId }: ListSubmissionsParams) {
    if (searchId !== undefined) {
      return apiClient.get<PaginatedResponse<Submission>>(`/exams/submissions/?id=${searchId}`);
    }

    let url = `/exams/submissions/?question=${questionId}&page=${page}`;

    if (filter === 'graded') {
      url += '&graded=true';
    } else if (filter === 'ungraded') {
      url += '&graded=false';
    }

    return apiClient.get<PaginatedResponse<Submission>>(url);
  }
}

export const submissionService = new SubmissionService();
