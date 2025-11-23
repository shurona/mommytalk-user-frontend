import { useNavigate, useParams, useLocation } from "react-router-dom";
import { BottomNav } from "@/components";
import { Header as DashboardHeader } from "@/components/dashboard/Header";

export default function SentenceDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  // Records 페이지에서 전달받은 state 데이터 사용
  const { korean, english, date } = location.state || {};

  // 날짜 포맷팅 함수 (YYYY-MM-DD -> YYYY년 M월 D일)
  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  const sentenceData = {
    date: formatDate(date),
    korean: korean || "",
    english: english || "",
  };

  const handleBack = () => {
    navigate("/records", { state: { activeTab: "my-sentences" } });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <DashboardHeader />
      <div className="flex-1 w-full px-[25px] pt-[90px] pb-[70px] flex flex-col items-center">
        {/* Header with Back Button and Date (match Mommytalk365 layout) */}
        <div className="flex items-center justify-center relative w-full max-w-[343px] mb-[25px]">
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
          <h1 className="text-[#111] text-center text-[16px] font-medium leading-[145%]">
            {sentenceData.date}
          </h1>
        </div>

        <div className="w-full max-w-[343px] flex flex-col gap-[15px]">
          {/* Title */}
          <div className="flex flex-col gap-[5px]">
          </div>

          {/* Korean Input Card */}
          <div className="rounded-[15px] border border-[#DBDBDB] bg-white p-[20px_15px] flex flex-col gap-[10px]">
            <p className="text-[#111] text-[16px] leading-[145%] min-h-[22px]">
              {sentenceData.korean}
            </p>
          </div>

          {/* English Result Card */}
          <div className="rounded-[15px] bg-[#ECF5FF] p-[20px_15px] flex flex-col gap-[10px] min-h-[165px]">
            <p className="text-[#000] text-[20px] leading-[140%]">
              {sentenceData.english}
            </p>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
