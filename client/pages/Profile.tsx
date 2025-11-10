import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-api";
import { useOnboarding } from "@/contexts/OnboardingContext";

export default function Profile() {
  const navigate = useNavigate();
  const [isOnboarded, setIsOnboarded] = useState(true);
  const [childName, setChildName] = useState("");
  const [channelId, setChannelId] = useState<string>("");
  const { setChildName: saveChildName } = useOnboarding();

  // localStorage에서 channelId 가져오기
  useEffect(() => {
    const userInfoStr = localStorage.getItem('user_info');
    if (userInfoStr) {
      try {
        const user = JSON.parse(userInfoStr);
        if (user.channelId) {
          setChannelId(user.channelId.toString());
        }
      } catch (error) {
        console.error('Failed to parse user info:', error);
      }
    }
  }, []);

  // API로 유저 정보 가져오기
  const { data: userResponse, isLoading, isError } = useUser(channelId);

  // 유저 정보 업데이트
  useEffect(() => {
    if (userResponse?.data) {
      const user = userResponse.data;
      setIsOnboarded(user.onboardingCompleted || false);
      setChildName(user.childName || "");

      // localStorage에도 최신 정보 저장
      localStorage.setItem('user_info', JSON.stringify(user));
    }
  }, [userResponse]);

  // 로컬 레벨 이미지 경로
  const userLevel = userResponse?.data?.userLevel || 1;
  const childLevel = userResponse?.data?.childLevel || 1;
  const levelImageUrl = `/assets/images/Level_${userLevel}_${childLevel}.png`;

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    navigate('/', { replace: true });
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-[#888] text-[16px]">로딩 중...</p>
      </div>
    );
  }

  // 에러 상태
  if (isError) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-[20px] px-[25px]">
        <p className="text-[#888] text-[16px]">유저 정보를 불러오는데 실패했습니다.</p>
        <Button onClick={() => navigate('/')}>로그인 페이지로 이동</Button>
      </div>
    );
  }

  if (!isOnboarded) {
    return (
      <div className="min-h-screen bg-background flex flex-col px-[25px] py-[25px]">
        <div className="w-full max-w-[343px] mx-auto flex flex-col gap-[25px]">
          <h1 className="text-[#111] text-center text-[16px] font-bold leading-[145%]">
            내 계정
          </h1>

          <div className="flex flex-col items-center gap-[28px]">
            <h2 className="text-[#111] text-center text-[22px] font-bold leading-[145%]">
              우리집 맞춤 레벨을 설정해 보세요!
            </h2>

            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fe9b9b01c41aa41ffb5a9c124b22fbbf4%2F5ef8d5d724b04f5aa24d9690fa3df549"
              alt="Level setup illustration"
              className="w-[298px] h-[141px]"
            />

            <p className="w-full text-[#888] text-[18px] font-medium leading-[145%]">
              매일 받아볼 문장을
              <br />
              우리집 상황에 맞게 고를 수 있어요.
            </p>

            <Button
              onClick={() => navigate("/onboarding2")}
              className="w-full h-[62px] rounded-[20px] text-[16px] tracking-[-0.64px]"
            >
              시작하기
            </Button>
          </div>

          <div className="flex flex-col gap-[26px]">
            <div className="flex flex-col gap-[15px]">
              <label className="text-[#888] text-[16px] font-medium leading-[145%]">
                로그인 이메일
              </label>
              <div className="w-full h-[65px] px-[15px] py-[20px] flex items-center rounded-[20px] bg-[#F9F9FA]">
                <span className="text-[#111] text-[16px] font-bold leading-[145%] tracking-[-0.64px]">
                  jungukm@gmail.com
                </span>
              </div>
            </div>

            <div className="flex justify-center items-center h-[23px]">
              <button
                onClick={handleLogout}
                className="text-[#FF9E08] text-center text-[16px] font-medium leading-[145%] tracking-[-0.64px]"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col px-[25px] py-[25px]">
      <div className="w-full max-w-[343px] mx-auto flex flex-col gap-[25px] relative">
        {/* X 버튼 */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-0 right-0 w-[24px] h-[24px] flex items-center justify-center focus:outline-none"
          aria-label="닫기"
        >
          <img src="/assets/images/x_button_profile.svg" alt="닫기" className="w-full h-full" />
        </button>

        <h1 className="text-[#111] text-center text-[16px] font-bold leading-[145%]">
          내 계정
        </h1>

        <div className="flex flex-col gap-[41px]">
          <div className="flex flex-col gap-[20px]">
            <label className="text-[#888] text-[16px] font-medium leading-[145%]">
              레벨
            </label>
            <img
              src={levelImageUrl}
              alt={`Level ${userLevel}-${childLevel} progression`}
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="flex flex-col items-center gap-[13px]">
            <Button
              onClick={() => {
                saveChildName(childName);
                navigate("/onboarding3", { state: { fromProfile: true } });
              }}
              className="w-full h-[62px] rounded-[20px] text-[16px] tracking-[-0.64px]"
            >
              맞춤 레벨 변경하기
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-[21px]">
          <div className="flex flex-col gap-[15px]">
            <label className="text-[#888] text-[16px] font-medium leading-[145%]">
              아이 별명
            </label>
            <div className="w-full h-[65px] px-[15px] py-[20px] flex items-center rounded-[20px] bg-[#F9F9FA]">
              <span className="text-[#111] text-[16px] font-bold leading-[145%] tracking-[-0.64px]">
                {childName || "이름 없음"}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-[15px]">
            <label className="text-[#888] text-[16px] font-medium leading-[145%]">
              로그인 이메일
            </label>
            <div className="w-full h-[65px] px-[15px] py-[20px] flex items-center rounded-[20px] bg-[#F9F9FA]">
              <span className="text-[#111] text-[16px] font-bold leading-[145%] tracking-[-0.64px]">
                jungukm@gmail.com
              </span>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <button
              onClick={handleLogout}
              className="text-[#FF9E08] text-center text-[16px] font-medium leading-[145%] tracking-[-0.64px]"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
