import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { onboardingApi, userApi, sentenceApi, recordApi, authApi, mommytalk365Api } from '@/lib/api';
import type {
  OnboardingRequest,
  CreateSentenceRequest,
  LoginRequest,
  SignupRequest,
  LineLoginCallbackRequest,
  KakaoLoginCallbackRequest,
  GenerateSentenceRequest,
} from '@/types/api';

// ============================================
// Onboarding Hooks
// ============================================

export const useSubmitOnboarding = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: OnboardingRequest) => onboardingApi.submitOnboarding(data),
    onSuccess: () => {
      // Invalidate user data to refetch
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['onboarding-settings'] });
    },
  });
};

export const useOnboardingSettings = () => {
  return useQuery({
    queryKey: ['onboarding-settings'],
    queryFn: () => onboardingApi.getSettings(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// ============================================
// User Hooks
// ============================================

export const useUser = (channelId?: string) => {
  return useQuery({
    queryKey: ['user', channelId],
    queryFn: () => {
      if (!channelId) {
        throw new Error('channelId is required');
      }
      return userApi.getMe(channelId);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    enabled: !!channelId, // channelId가 있을 때만 실행
  });
};

export const useUpdateUserSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<OnboardingRequest>) => userApi.updateSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

// ============================================
// Sentence Hooks
// ============================================

export const useSentences = (page = 1, pageSize = 10) => {
  return useQuery({
    queryKey: ['sentences', page, pageSize],
    queryFn: () => sentenceApi.getSentences(page, pageSize),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useSentence = (id: string) => {
  return useQuery({
    queryKey: ['sentence', id],
    queryFn: () => sentenceApi.getSentence(id),
    enabled: !!id, // Only fetch if id exists
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateSentence = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSentenceRequest) => sentenceApi.createSentence(data),
    onSuccess: () => {
      // Invalidate sentences list to refetch
      queryClient.invalidateQueries({ queryKey: ['sentences'] });
    },
  });
};

export const useWeeklySentence = () => {
  return useQuery({
    queryKey: ['weekly-sentence'],
    queryFn: () => sentenceApi.getWeeklySentence(),
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

export const useGenerateSentence = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GenerateSentenceRequest) => sentenceApi.generateSentence(data),
    onSuccess: () => {
      // Invalidate user sentences list to refetch
      queryClient.invalidateQueries({ queryKey: ['user-sentences'] });
    },
  });
};

export const useUserSentences = (year: number, month: number) => {
  return useQuery({
    queryKey: ['user-sentences', year, month],
    queryFn: () => sentenceApi.getUserSentences(year, month),
    staleTime: 2 * 60 * 1000, // 2 minutes
    enabled: month >= 1 && month <= 12, // Only fetch if valid month
  });
};

// ============================================
// Mommytalk 365 Hooks
// ============================================

export const useMommytalk365History = (channelId: number, year: number, month: number) => {
  return useQuery({
    queryKey: ['mommytalk365-history', channelId, year, month],
    queryFn: () => mommytalk365Api.getMessageHistory(channelId, year, month),
    staleTime: 2 * 60 * 1000, // 2 minutes
    enabled: !!channelId && month >= 1 && month <= 12, // Only fetch if channelId exists and valid month
  });
};

export const useMommytalk365Detail = (channelId: number, messageLogDetailId: number) => {
  return useQuery({
    queryKey: ['mommytalk365-detail', channelId, messageLogDetailId],
    queryFn: () => mommytalk365Api.getMessageDetail(channelId, messageLogDetailId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!channelId && !!messageLogDetailId, // Only fetch if both IDs exist
  });
};

// ============================================
// Record Hooks
// ============================================

export const useRecords = () => {
  return useQuery({
    queryKey: ['records'],
    queryFn: () => recordApi.getRecords(),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const useCompleteRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recordId: string) => recordApi.completeRecord(recordId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['records'] });
    },
  });
};

export const useCreateRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sentenceId: string) => recordApi.createRecord(sentenceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['records'] });
    },
  });
};

// ============================================
// Auth Hooks
// ============================================

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: () => {
      // Refetch user data after login
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SignupRequest) => authApi.signup(data),
    onSuccess: () => {
      // Refetch user data after signup
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
    },
  });
};

export const useCheckAuth = () => {
  return useQuery({
    queryKey: ['auth-check'],
    queryFn: () => authApi.checkAuth(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
};

export const useLineCallback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LineLoginCallbackRequest) => authApi.lineCallback(data),
    onSuccess: () => {
      // Refetch user data after LINE login
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useKakaoCallback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: KakaoLoginCallbackRequest) => authApi.kakaoCallback(data),
    onSuccess: () => {
      // Refetch user data after Kakao login
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
