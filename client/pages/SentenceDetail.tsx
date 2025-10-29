import { useNavigate, useParams } from "react-router-dom";
import { BottomNav } from "@/components";

export default function SentenceDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const sentenceData = {
    date: "2025년 9월 29일",
    korean: "얼른 가서 손 씻고 와",
    english: "Go wash your hands",
  };

  return (
    <div className="min-h-[850px] bg-white flex flex-col">
      {/* Header with Back Button and Date */}
      <header className="w-full px-[25px] pt-[25px] pb-[24px] flex items-center justify-center relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-[25px] top-[25px] flex items-center justify-between w-[12px] h-[22px]"
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
      </header>

      <main className="flex-1 px-[25px] pb-[55px]">
        <div className="w-full max-w-[343px] mx-auto pt-[25px]">
          <div className="flex flex-col gap-[15px]">
            {/* Title */}
            <div className="flex flex-col gap-[5px]">
              <h2 className="text-[#111] text-[16px] font-bold leading-[140%]">
                이럴 때는 어떻게?
              </h2>
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
      </main>

      <BottomNav />
    </div>
  );
}
