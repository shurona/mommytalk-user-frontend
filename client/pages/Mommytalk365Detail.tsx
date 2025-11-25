import { useState, useEffect, useRef, ReactNode } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useMommytalk365Detail } from "@/hooks/use-api";
import { BottomNav } from "@/components";
import { Header as DashboardHeader } from "@/components/dashboard/Header";

export default function Mommytalk365Detail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [channelId, setChannelId] = useState<number>(0);
  const [childName, setChildName] = useState<string>("아이");

  // Audio refs
  const momAudioRef = useRef<HTMLAudioElement>(null);
  const childAudioRef = useRef<HTMLAudioElement>(null);

  // localStorage에서 channelId와 childName 가져오기
  useEffect(() => {
    const userInfoStr = localStorage.getItem('user_info');
    if (userInfoStr) {
      try {
        const user = JSON.parse(userInfoStr);
        if (user.channelId) {
          setChannelId(Number(user.channelId));
        }
        if (user.childName) {
          setChildName(user.childName);
        }
      } catch (error) {
        console.error('Failed to parse user info:', error);
      }
    }
  }, []);

  // API로 메시지 상세 정보 가져오기
  const { data: detailResponse, isLoading, isError } = useMommytalk365Detail(
    channelId,
    Number(id)
  );

  const detail = detailResponse?.data;

  // 날짜 포맷 함수 (YYYY-MM-DD → YYYY년 M월 D일)
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  // 마크다운 텍스트를 HTML로 변환 (간단한 파싱)
  const parseMarkdown = (text: string): string => {
    // {아이이름} 치환
    let parsed = text.replace(/\{아이이름\}/g, childName);

    // **굵게** 처리
    parsed = parsed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // \n 줄바꿈 처리
    parsed = parsed.replace(/\n/g, '<br/>');

    return parsed;
  };

  // 오디오 단순 재생
  const playMomAudio = () => {
    if (!momAudioRef.current) return;
    momAudioRef.current.currentTime = 0;
    momAudioRef.current.play().catch((error) => {
      console.error('Mom audio play failed:', error);
    });
  };

  const playChildAudio = () => {
    if (!childAudioRef.current) return;
    childAudioRef.current.currentTime = 0;
    childAudioRef.current.play().catch((error) => {
      console.error('Child audio play failed:', error);
    });
  };

  const displayDate = detail ? (location.state?.date || detail.deliveryDate) : undefined;
  const handleBack = () => navigate('/records', { state: { activeTab: 'mommytalk-365' } });

  let content: ReactNode;

  if (isLoading) {
    content = (
      <div className="w-full flex items-center justify-center py-[40px]">
        <p className="text-[#888] text-[16px]">로딩 중...</p>
      </div>
    );
  } else if (isError || !detail) {
    content = (
      <div className="w-full flex flex-col items-center justify-center gap-[20px] py-[40px]">
        <p className="text-[#888] text-[16px]">메시지를 불러오는데 실패했습니다.</p>
        <button
          onClick={handleBack}
          className="px-[20px] py-[10px] rounded-[10px] bg-[#FF9B00] text-white"
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  } else {
    content = (
      <>
        <div className="flex items-center justify-center relative w-full mb-[25px]">
          <button
            onClick={handleBack}
            className="absolute left-0 w-[12px] h-[22px] flex items-center"
            aria-label="뒤로 가기"
          >
            <svg
              width="12"
              height="22"
              viewBox="0 0 12 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.54752 11.0075L11.6665 20.0483C11.8788 20.2588 11.9849 20.5219 11.9849 20.8376C11.9849 21.1533 11.8788 21.426 11.6665 21.6556C11.4349 21.8852 11.1599 22 10.8415 22C10.523 22 10.248 21.8852 10.0164 21.6556L0.492135 12.2129C0.318441 12.0407 0.192994 11.8494 0.115797 11.6389C0.0385989 11.4284 0 11.2179 0 11.0075C0 10.797 0.0385989 10.5865 0.115797 10.376C0.192994 10.1656 0.318441 9.97422 0.492135 9.80201L10.0454 0.330637C10.2769 0.101028 10.5471 -0.00899302 10.8559 0.000574023C11.1647 0.0101411 11.4349 0.129729 11.6665 0.359338C11.8788 0.588947 11.9898 0.856825 11.9994 1.16297C12.0091 1.46912 11.8981 1.73699 11.6665 1.9666L2.54752 11.0075Z"
                fill="#888888"
              />
            </svg>
          </button>
          <h1 className="text-[#111] text-center text-[16px] font-medium leading-[145%] font-['Noto_Sans']">
            {formatDate(displayDate!)}
          </h1>
        </div>

        <div className="rounded-[20px] bg-[#FFF2DD] p-[20px_15px] flex flex-col justify-center gap-[15px]">
          {/* Message Text */}
          <div className="flex flex-col gap-[15px]">
            <div
              className="text-[#111] text-[16px] leading-[145%] font-['Noto_Sans']"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(detail.messageText) }}
            />
          </div>

          {/* Mom Audio */}
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[10px]">
              <span className="text-[#111] text-[16px] font-medium">엄마의 발음🔊</span>
              <button
                onClick={playMomAudio}
                className="w-[40px] h-[40px] flex items-center justify-center bg-white rounded-full shadow-sm"
                aria-label="재생"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5v14l11-7z" fill="#111" />
                </svg>
              </button>
            </div>
            <audio ref={momAudioRef} src={detail.momAudioUrl} preload="metadata" />
          </div>

          {/* Child Audio */}
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[10px]">
              <span className="text-[#111] text-[16px] font-medium">아이의 발음🔊</span>
              <button
                onClick={playChildAudio}
                className="w-[40px] h-[40px] flex items-center justify-center bg-white rounded-full shadow-sm"
                aria-label="재생"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5v14l11-7z" fill="#111" />
                </svg>
              </button>
            </div>
            <audio ref={childAudioRef} src={detail.childAudioUrl} preload="metadata" />
          </div>

          {/* Mommyvoca Card Button - 권한이 있을 때만 표시 */}
          {detail.mommyVoca && (
            <button
              onClick={() => window.open(detail.mommyVoca!, '_blank')}
              className="w-full h-auto p-[15px] flex justify-center items-center gap-[10px] rounded-[20px] bg-white transition-all duration-200 hover:bg-gray-50 active:scale-[0.98]"
            >
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.91783 14.5583C2.91783 15.3921 3.20619 16.1009 3.78223 16.6846C4.35828 17.2682 5.06364 17.5601 5.89849 17.5601H18.1464C18.1464 17.8936 18.0464 18.1816 17.8461 18.4234C17.6457 18.6652 17.3782 18.8029 17.0443 18.8363L3.29353 20.4872C2.87617 20.5371 2.50469 20.4412 2.17914 20.1994C1.85359 19.9576 1.66572 19.6283 1.61559 19.2115L0.0125002 6.75378C-0.0375896 6.33686 0.0628899 5.96163 0.313355 5.6281C0.563815 5.29462 0.897815 5.10258 1.31522 5.05255L2.91783 4.87764V14.5583Z"
                  fill="#111111"
                />
                <path
                  d="M13.2437 8.83707H11.3011L12.2722 6.33067L13.2437 8.83707Z"
                  fill="#111111"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.4972 0.5C18.8979 0.500021 19.2484 0.650307 19.549 0.950467C19.8495 1.25064 20 1.60068 20 2.00091V14.5583C20 14.9585 19.8495 15.309 19.549 15.6092C19.2484 15.9093 18.8979 16.0592 18.4972 16.0592H5.92343C5.52279 16.0591 5.17217 15.9093 4.87167 15.6092C4.57111 15.309 4.42063 14.9585 4.42063 14.5583V2.00091C4.42063 1.60071 4.57118 1.25063 4.87167 0.950467C5.17218 0.650339 5.52277 0.500052 5.92343 0.5H18.4972ZM12.057 3.50181C11.8539 3.50185 11.6633 3.56 11.4949 3.66695C11.3131 3.78238 11.1802 3.9465 11.103 4.14429L8.08861 11.6493C7.96642 11.9632 7.99499 12.2933 8.19183 12.5786C8.38952 12.865 8.68921 13.0076 9.02493 13.0076C9.21564 13.0075 9.40523 12.9591 9.57429 12.8478C9.75471 12.7289 9.87298 12.5596 9.94266 12.3768L10.5825 10.7073H13.9633L14.6027 12.3587C14.6754 12.5486 14.7979 12.7136 14.9726 12.8331C15.142 12.949 15.3359 13.0076 15.5395 13.0076C15.8657 13.0075 16.1693 12.8752 16.3658 12.584C16.5591 12.2974 16.5738 11.9709 16.4563 11.6689L13.4414 4.14478C13.3643 3.9469 13.2317 3.78245 13.05 3.66695C12.8815 3.55994 12.6906 3.50184 12.4874 3.50181H12.057Z"
                  fill="#111111"
                />
              </svg>
              <span className="text-[#111] text-center text-[16px] font-bold leading-[145%] tracking-[-0.64px] font-['Noto_Sans']">
                마미보카 카드보기
              </span>
            </button>
          )}
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <DashboardHeader />
      <div className="flex-1 w-full px-[25px] pt-[15px] pb-[70px] flex flex-col items-center">
        <div className="w-full max-w-[343px] flex flex-col gap-[20px]">
          {content}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
