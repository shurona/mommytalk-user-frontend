import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "@/components";
import { Header as DashboardHeader } from "@/components/dashboard/Header";
import { CustomSelect } from "@/components/ui/custom-select";
import { useUserSentences } from "@/hooks/use-api";

type TabType = "my-sentences" | "mommytalk-365";

export default function Records() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("my-sentences");
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState<number>(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(currentDate.getMonth() + 1); // 현재 월 (1-12)

  // API로 내 문장 목록 가져오기
  const { data: sentencesResponse, isLoading, isError } = useUserSentences(selectedYear, selectedMonth);

  // 월 이름 배열 (1월~12월)
  const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

  // 년도 배열 생성 (현재년도부터 과거 5년)
  const years = Array.from({ length: 6 }, (_, i) => currentDate.getFullYear() - i);

  // 더미 데이터 (마미톡 365)
  const mommytalk365Records = [
    {
      month: `${selectedMonth}월`,
      items: [
        { day: "1일", text: "목욕하며 실험하기 🛁" },
        { day: "2일", text: "목욕하며 실험하기 🛁" },
        { day: "3일", text: "목욕하며 실험하기 🛁" },
      ],
    },
  ];

  // generateDate에서 일(day) 추출하는 함수
  const extractDay = (dateString: string): string => {
    const date = new Date(dateString);
    return `${date.getDate()}일`;
  };

  // API 데이터를 UI 형식으로 변환
  const mySentencesRecords = sentencesResponse?.data.length
    ? [
        {
          month: `${selectedMonth}월`,
          items: sentencesResponse.data.map(item => ({
            id: item.id,
            day: extractDay(item.generateDate),
            text: item.output, // 영어 문장
            korean: item.sentence, // 한글 문장 (상세 페이지용)
            date: item.generateDate,
          })),
        },
      ]
    : [];

  const records =
    activeTab === "my-sentences" ? mySentencesRecords : mommytalk365Records;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader />
      <div className="flex flex-col justify-start items-center pt-[110px] px-[25px] pb-[25px] gap-[15px]">
        {/* 탭 버튼 */}
        <div className="inline-flex items-center gap-[5px] h-[39px]">
          <button
            onClick={() => setActiveTab("my-sentences")}
            className={`flex px-[12px] py-[8px] justify-center items-center gap-[10px] rounded-[10px] transition-colors ${
              activeTab === "my-sentences" ? "bg-[#FFF1DC]" : "bg-white"
            }`}
          >
            <span
              className={`text-[16px] leading-[145%] ${activeTab === "my-sentences" ? "font-bold text-[#111]" : "font-light text-[#888]"}`}
            >
              나만의 문장
            </span>
          </button>
          <button
            onClick={() => setActiveTab("mommytalk-365")}
            className={`flex px-[12px] py-[8px] justify-center items-center gap-[10px] rounded-[10px] transition-colors ${
              activeTab === "mommytalk-365" ? "bg-[#FFF1DC]" : "bg-white"
            }`}
          >
            <span
              className={`text-[16px] leading-[145%] ${activeTab === "mommytalk-365" ? "font-bold text-[#111]" : "font-light text-[#888]"}`}
            >
              마미톡 365
            </span>
          </button>
        </div>

        {/* 년도 및 월 선택 드롭다운 */}
        <div className="w-full max-w-[343px] flex gap-[10px]">
          {/* 년도 선택 */}
          <div className="flex-1">
            <CustomSelect
              value={selectedYear}
              onChange={setSelectedYear}
              options={years.map((year) => ({ value: year, label: `${year}년` }))}
            />
          </div>

          {/* 월 선택 */}
          <div className="flex-1">
            <CustomSelect
              value={selectedMonth}
              onChange={setSelectedMonth}
              options={monthNames.map((name, index) => ({ value: index + 1, label: name }))}
            />
          </div>
        </div>
      </div>

      <main className="flex-1 flex flex-col justify-start items-center px-[25px] pb-[80px]">
        <div className="w-full max-w-[343px] flex flex-col gap-[15px]">
          {/* 로딩 상태 */}
          {activeTab === "my-sentences" && isLoading && (
            <div className="text-center py-[40px]">
              <p className="text-[#888] text-[16px]">로딩 중...</p>
            </div>
          )}

          {/* 에러 상태 */}
          {activeTab === "my-sentences" && isError && (
            <div className="text-center py-[40px]">
              <p className="text-[#888] text-[16px]">데이터를 불러오는데 실패했습니다.</p>
            </div>
          )}

          {/* 빈 데이터 */}
          {activeTab === "my-sentences" && !isLoading && !isError && records.length === 0 && (
            <div className="text-center py-[40px]">
              <p className="text-[#888] text-[16px]">생성된 문장이 없습니다.</p>
            </div>
          )}

          {/* 데이터 목록 */}
          {!isLoading && !isError && records.map((monthGroup, idx) => (
            <div key={idx} className="flex flex-col gap-[15px]">
              <div className="flex items-center gap-[7px]">
                <span className="text-[#888] text-[18px] font-medium leading-[145%] tracking-[-0.72px]">
                  {monthGroup.month}
                </span>
              </div>

              <div className="flex flex-col gap-[15px]">
                {monthGroup.items.map((item: any, itemIdx: number) => (
                  <div
                    key={itemIdx}
                    onClick={() => {
                      if (activeTab === "my-sentences") {
                        navigate(`/sentence/${item.id}`, {
                          state: {
                            korean: item.korean,
                            english: item.text,
                            date: item.date,
                          },
                        });
                      } else {
                        navigate("/mommytalk365/1");
                      }
                    }}
                    className="w-full p-[15px] flex flex-col justify-center gap-[15px] rounded-[20px] bg-[#F9F9FA] cursor-pointer hover:bg-[#F0F0F1] transition-colors"
                  >
                    <div className="flex items-center gap-[7px]">
                      <span className="text-[#888] text-[16px] font-medium leading-[145%]">
                        {item.day}
                      </span>
                    </div>

                    <div className="flex flex-col gap-[15px]">
                      <div className="text-[#111] text-[16px] font-bold leading-[145%]">
                        {item.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
