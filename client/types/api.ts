// ============================================
// Onboarding Types
// ============================================

export type LanguageLevel = 'basic' | 'conversation' | 'advanced';
export type ResponseLevel = 'short-answer' | 'short-sentence' | 'listening-only';

export interface OnboardingData {
  childName: string;
  languageLevel: LanguageLevel;
  responseLevel: ResponseLevel;
}

export interface OnboardingRequest {
  childName: string;
  languageLevel: LanguageLevel;
  responseLevel: ResponseLevel;
}

export interface OnboardingResponse {
  success: boolean;
  message: string;
  userId?: string;
  settings?: OnboardingData;
}

// ============================================
// User Types
// ============================================

export interface User {
  id: string;
  name?: string;
  childName?: string;
  languageLevel?: LanguageLevel;
  responseLevel?: ResponseLevel;
  onboardingCompleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserResponse {
  user: User;
}

// ============================================
// Sentence Types
// ============================================

export interface Sentence {
  id: string;
  korean: string;
  english: string;
  category: string;
  difficulty: LanguageLevel;
  createdAt: string;
}

export interface SentenceListResponse {
  sentences: Sentence[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CreateSentenceRequest {
  korean: string;
  category?: string;
}

export interface CreateSentenceResponse {
  sentence: Sentence;
  message: string;
}

// ============================================
// Record Types
// ============================================

export interface Record {
  id: string;
  sentenceId: string;
  sentence: Sentence;
  practiceDate: string;
  completed: boolean;
}

export interface RecordListResponse {
  records: Record[];
  total: number;
}

// ============================================
// Auth Types
// ============================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface SignupRequest {
  email: string;
  password: string;
  childName: string;
}

export interface SignupResponse {
  token: string;
  user: User;
  message: string;
}

// LINE Login Types
export interface LineLoginCallbackRequest {
  code: string;
  state: string;
  redirectUri: string;
}

export interface LineLoginResponse {
  message: string;
  data: {
    token: string;
    user: User;
  };
}

// ============================================
// Common API Response Types
// ============================================

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}
