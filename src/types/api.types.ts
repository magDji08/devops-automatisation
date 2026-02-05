/**
 * Types communs pour les réponses API
 */

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  error: string;
  detail?: string;
  status?: number;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface CreateResponse {
  message: string;
  id: number;
}
