import { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLineCallback } from '@/hooks/use-api';
import { useToast } from '@/hooks/use-toast';

export default function LineCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const lineCallback = useLineCallback();

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string>('');
  const hasExecuted = useRef(false);

  useEffect(() => {
    // 이미 실행되었으면 리턴 (무한 루프 방지)
    if (hasExecuted.current) return;
    hasExecuted.current = true;
    const handleCallback = async () => {
      // URL에서 code와 state 파라미터 추출
      const code = searchParams.get('code');
      const state = searchParams.get('state');

      console.log('🔍 LINE Callback Debug:');
      console.log('- Code:', code);
      console.log('- State from URL:', state);

      // 에러 처리
      if (!code || !state) {
        setStatus('error');
        setError('인증 정보가 없습니다.');
        toast({
          title: '로그인 실패',
          description: '인증 정보가 없습니다.',
          variant: 'destructive',
        });
        setTimeout(() => navigate('/'), 2000);
        return;
      }

      // ✅ State 검증 (CSRF 방지) - localStorage 사용
      const savedState = localStorage.getItem('line_login_state');
      console.log('- Saved State:', savedState);
      console.log('- State Match:', savedState === state);

      if (!savedState || savedState !== state) {
        setStatus('error');
        setError(`보안 검증에 실패했습니다. (URL: ${state?.substring(0, 8)}..., Saved: ${savedState?.substring(0, 8) || 'null'}...)`);
        toast({
          title: '로그인 실패',
          description: '보안 검증에 실패했습니다.',
          variant: 'destructive',
        });
        setTimeout(() => navigate('/'), 2000);
        return;
      }

      // ✅ State 사용 후 삭제
      localStorage.removeItem('line_login_state');

      try {
        // 🚀 백엔드 API 호출 - Authorization Code 전송
        const response = await lineCallback.mutateAsync({
          code: code,
          state: state,
          redirectUri: import.meta.env.VITE_LINE_REDIRECT_URI,
        });

        console.log('✅ Login Success:');
        console.log('- Response:', response);
        console.log('- Token saved:', localStorage.getItem('auth_token') ? 'Yes' : 'No');

        setStatus('success');

        toast({
          title: '로그인 성공!',
          description: `${response.data.user.name || '사용자'}님, 환영합니다!`,
        });

        // ✅ 온보딩 완료 여부에 따라 라우팅
        if (response.data.user.onboardingCompleted) {
          // 온보딩 완료 → 대시보드로
          console.log('→ Redirecting to /dashboard');
          navigate('/dashboard');
        } else {
          // 온보딩 미완료 → 온보딩 페이지로
          console.log('→ Redirecting to /onboarding1');
          navigate('/onboarding1');
        }
      } catch (err: any) {
        console.error('LINE login error:', err);
        setStatus('error');
        setError(err.response?.data?.message || '로그인 처리 중 오류가 발생했습니다.');

        toast({
          title: '로그인 실패',
          description: err.response?.data?.message || '로그인 처리 중 오류가 발생했습니다.',
          variant: 'destructive',
        });

        setTimeout(() => navigate('/'), 3000);
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-[25px]">
      <div className="w-full max-w-[343px] flex flex-col gap-[40px] items-center">
        {status === 'loading' && (
          <>
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <div className="flex flex-col gap-[10px] text-center">
              <h2 className="text-[22px] font-bold text-foreground">로그인 처리 중...</h2>
              <p className="text-[16px] text-muted-foreground">잠시만 기다려주세요</p>
            </div>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-[10px] text-center">
              <h2 className="text-[22px] font-bold text-foreground">로그인 성공!</h2>
              <p className="text-[16px] text-muted-foreground">페이지를 이동합니다...</p>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-[10px] text-center">
              <h2 className="text-[22px] font-bold text-foreground">로그인 실패</h2>
              <p className="text-[16px] text-muted-foreground">{error}</p>
              <p className="text-[14px] text-muted-foreground">잠시 후 로그인 페이지로 이동합니다...</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
