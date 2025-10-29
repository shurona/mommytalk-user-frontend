import apiClient from './api-client';
import type {
  OnboardingRequest,
  OnboardingResponse,
  UserResponse,
  SentenceListResponse,
  CreateSentenceRequest,
  CreateSentenceResponse,
  RecordListResponse,
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  LineLoginCallbackRequest,
  LineLoginResponse,
} from '@/types/api';

// ============================================
// Onboarding API
// ============================================

export const onboardingApi = {
  // Submit onboarding data
  submitOnboarding: async (data: OnboardingRequest): Promise<OnboardingResponse> => {
    const response = await apiClient.post<OnboardingResponse>('/onboarding', data);
    return response.data;
  },

  // Get user's onboarding settings
  getSettings: async (): Promise<OnboardingResponse> => {
    const response = await apiClient.get<OnboardingResponse>('/onboarding/settings');
    return response.data;
  },
};

// ============================================
// User API
// ============================================

export const userApi = {
  // Get current user info
  getMe: async (): Promise<UserResponse> => {
    const response = await apiClient.get<UserResponse>('/users/me');
    return response.data;
  },

  // Update user settings
  updateSettings: async (data: Partial<OnboardingRequest>): Promise<UserResponse> => {
    const response = await apiClient.patch<UserResponse>('/users/me', data);
    return response.data;
  },
};

// ============================================
// Sentence API
// ============================================

export const sentenceApi = {
  // Get sentence list with pagination
  getSentences: async (page = 1, pageSize = 10): Promise<SentenceListResponse> => {
    const response = await apiClient.get<SentenceListResponse>('/sentences', {
      params: { page, pageSize },
    });
    return response.data;
  },

  // Get single sentence by ID
  getSentence: async (id: string) => {
    const response = await apiClient.get(`/sentences/${id}`);
    return response.data;
  },

  // Create new sentence (AI generation)
  createSentence: async (data: CreateSentenceRequest): Promise<CreateSentenceResponse> => {
    const response = await apiClient.post<CreateSentenceResponse>('/sentences', data);
    return response.data;
  },

  // Get weekly sentence
  getWeeklySentence: async () => {
    const response = await apiClient.get('/sentences/weekly');
    return response.data;
  },
};

// ============================================
// Record API
// ============================================

export const recordApi = {
  // Get all records
  getRecords: async (): Promise<RecordListResponse> => {
    const response = await apiClient.get<RecordListResponse>('/records');
    return response.data;
  },

  // Mark record as completed
  completeRecord: async (recordId: string) => {
    const response = await apiClient.patch(`/records/${recordId}/complete`);
    return response.data;
  },

  // Create a new record
  createRecord: async (sentenceId: string) => {
    const response = await apiClient.post('/records', { sentenceId });
    return response.data;
  },
};

// ============================================
// Auth API
// ============================================

export const authApi = {
  // Login
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', data);
    // ✅ localStorage에 토큰 저장
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  },

  // Signup
  signup: async (data: SignupRequest): Promise<SignupResponse> => {
    const response = await apiClient.post<SignupResponse>('/auth/signup', data);
    // ✅ localStorage에 토큰 저장
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    // ✅ localStorage에서 토큰 삭제
    localStorage.removeItem('auth_token');
    return response.data;
  },

  // Check if user is authenticated
  checkAuth: async (): Promise<boolean> => {
    try {
      await apiClient.get('/auth/check');
      return true;
    } catch {
      return false;
    }
  },

  // LINE Login - Send authorization code to backend
  lineCallback: async (data: LineLoginCallbackRequest): Promise<LineLoginResponse> => {
    const response = await apiClient.post<LineLoginResponse>('/admin/v1/line/callback', data);
    // ✅ localStorage에 토큰 저장
    if (response.data.data.token) {
      localStorage.setItem('auth_token', response.data.data.token);
    }
    return response.data;
  },
};
