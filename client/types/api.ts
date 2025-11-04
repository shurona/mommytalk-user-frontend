// ============================================
// Onboarding Types
// ============================================

export type LanguageLevel = 'basic' | 'conversation' | 'advanced';
export type ResponseLevel = 'short-answer' | 'short-sentence' | 'listening-only';

// Level mapping to integers (1-based)
export const LANGUAGE_LEVEL_MAP = {
  basic: 1,
  conversation: 2,
  advanced: 3,
} as const;

export const RESPONSE_LEVEL_MAP = {
  'short-answer': 1,
  'short-sentence': 2,
  'listening-only': 3,
} as const;

export interface OnboardingData {
  childName: string;
  userLevel: number;
  childLevel: number;
}

export interface OnboardingRequest {
  childName: string;
  userLevel: number;
  childLevel: number;
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

// 로그인 응답용 User (channelId 포함)
export interface LoginUser {
  userId: number;
  channelId: number;
  name?: string;
  childName?: string;
  userLevel?: number;
  childLevel?: number;
  onboardingCompleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// 일반 User 조회용 (channelId 포함 - 쿼리 파라미터로 전달)
export interface User {
  userId: number;
  channelId: number;
  name?: string;
  childName?: string;
  userLevel?: number;
  childLevel?: number;
  onboardingCompleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserResponse {
  message: string;
  data: User;
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

// 기존 타입 (사용 안 함 - 호환성 유지)
export interface CreateSentenceRequest {
  korean: string;
  category?: string;
}

export interface CreateSentenceResponse {
  sentence: Sentence;
  message: string;
}

// 실제 백엔드 API 타입
export interface GenerateSentenceRequest {
  channelId: number;
  sentence: string;  // 한글 문장
}

export interface GenerateSentenceResponse {
  message: string;
  data: {
    sentence: string;  // AI 생성 영어 문장
  };
}

// 사용자 문장 목록 조회
export interface UserSentenceListItem {
  id: number;
  sentence: string;  // 한글 문장
  output: string;    // AI 생성 영어 문장
  generateDate: string;  // LocalDate format: "YYYY-MM-DD"
}

export interface UserSentenceListResponse {
  message: string;
  data: UserSentenceListItem[];
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
  channelCode: string;  // 'MOMJ', 'MOMK' 등
}

export interface LineLoginResponse {
  message: string;
  data: {
    token: string;
    user: LoginUser;  // LoginUser 사용 (channelId는 숫자)
  };
}

// Kakao Login Types
export interface KakaoLoginCallbackRequest {
  code: string;
  state: string;
  redirectUri: string;
  channelCode: string;  // 'MOMJ', 'MOMK' 등
}

export interface KakaoLoginResponse {
  message: string;
  data: {
    token: string;
    user: LoginUser;  // LoginUser 사용 (channelId는 숫자)
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

// 공통 API Response (백엔드 표준)
export interface ApiResponse<T> {
  message: string;
  data: T;
}
