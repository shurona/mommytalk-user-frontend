import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Panel } from "@/components/common/Panel";
import { SectionTitle } from "@/components/common/SectionTitle";
import { BottomNav, DashboardHeader } from "@/components";
import { useGenerateSentence } from "@/hooks/use-api";
import { useToast } from "@/hooks/use-toast";

export default function ContentCreation() {
  const navigate = useNavigate();
  const [sentenceText, setSentenceText] = useState("");
  const [childName, setChildName] = useState("");
  const maxChars = 100;
  const generateSentence = useGenerateSentence();
  const { toast } = useToast();

  // Get child name from localStorage
  useEffect(() => {
    const userStr = localStorage.getItem('user_info');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setChildName(user.childName || "");
      } catch (error) {
        console.error('Failed to parse user info:', error);
      }
    }
  }, []);

  // Get user info from localStorage (channelId)
  const getUserChannelId = (): number | null => {
    const token = localStorage.getItem('auth_token');
    if (!token) return null;

    // JWT 토큰에서 user 정보를 추출하거나, 별도로 저장된 user 정보 사용
    // 임시: localStorage에서 user 정보 가져오기
    const userStr = localStorage.getItem('user_info');
    if (userStr) {
      const user = JSON.parse(userStr);
      return user.channelId;
    }
    return null;
  };

  const handleCreateSentence = async () => {
    if (!sentenceText.trim()) return;

    const channelId = getUserChannelId();
    if (!channelId) {
      toast({
        title: '로그인 필요',
        description: '다시 로그인해주세요.',
        variant: 'destructive',
      });
      navigate('/');
      return;
    }

    try {
      const response = await generateSentence.mutateAsync({
        channelId,
        sentence: sentenceText.trim(),
      });

      // Navigate to result page with the sentence data
      navigate("/content-result", {
        state: {
          korean: sentenceText.trim(),
          english: response.data.sentence,
        },
      });
    } catch (error: any) {
      toast({
        title: '문장 생성 실패',
        description: error.response?.data?.message || '문장 생성 중 오류가 발생했습니다.',
        variant: 'destructive',
      });
    }
  };

  const isDisabled = !sentenceText.trim() || generateSentence.isPending;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <DashboardHeader />

      <main className="flex-1 px-[25px] pt-[60px] pb-[80px]">
        <div className="w-full max-w-[343px] mx-auto">
          <div className="flex flex-col gap-[15px]">
            {/* Title */}
            <div className="flex flex-col gap-[5px]">
              <SectionTitle as="h1">이런 말은 영어로 어떻게 말할까요?</SectionTitle>
            </div>

            {/* Input Card */}
            <Panel variant="yellow">
              <Textarea
                value={sentenceText}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v.length <= maxChars) setSentenceText(v);
                }}
                placeholder="지금 손 씻으러가자"
                className="w-full min-h-[250px] h-auto bg-transparent border-0 text-[#888] text-[16px] leading-[145%] resize-none placeholder:text-[#888] p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <div className="text-[#888] text-[14px] leading-[145%] tracking-[-0.56px] text-right">
                {sentenceText.length} / {maxChars}
              </div>
              <Button
                onClick={handleCreateSentence}
                disabled={isDisabled}
                className="w-full h-[62px] rounded-[20px] font-bold text-[16px] leading-[145%] tracking-[-0.64px] text-white bg-[#FF9B00] hover:brightness-95 disabled:bg-[#FF9B00] disabled:opacity-50"
              >
                {generateSentence.isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>문장 생성 중...</span>
                  </div>
                ) : (
                  "나만의 문장 만들기"
                )}
              </Button>
            </Panel>

            {/* Info Card */}
            <Panel variant="blue" minHeightClass="min-h-[250px]">
              <p className="text-[#888] text-[16px] leading-[140%]">
                {childName ? childName : "아이"}에게 해주고 싶은 엄마표영어 표현을 마미톡AI로 만들어보세요! 궁금한 문장을 한글로 입력하시면 아이에게 말해주기 딱 좋은 문장으로 만들어드려요.
                <br />
                <br />
                (1일 1회 사용이 가능합니다)
              </p>
            </Panel>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
