import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "@/components";

type TabType = "my-sentences" | "mommytalk-365";

export default function Records() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("my-sentences");

  const mySentencesRecords = [
    {
      month: "9월",
      items: [
        { day: "1일", text: "Let's see what floats and what sinks! ..." },
        { day: "2일", text: "Let's see what floats and what sinks! ..." },
        { day: "3일", text: "Let's see what floats and what sinks! ..." },
      ],
    },
  ];

  const mommytalk365Records = [
    {
      month: "9월",
      items: [
        { day: "1일", text: "목욕하며 실험하기 🛁" },
        { day: "2일", text: "목욕하며 실험하기 🛁" },
        { day: "3일", text: "목욕하며 실험하기 🛁" },
      ],
    },
  ];

  const records =
    activeTab === "my-sentences" ? mySentencesRecords : mommytalk365Records;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex flex-col justify-start items-center p-[25px]">
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
              내 문장
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
      </div>

      <main className="flex-1 flex flex-col justify-start items-center px-[25px] pb-[55px]">
        <div className="w-full max-w-[343px] flex flex-col gap-[15px]">
          {records.map((monthGroup, idx) => (
            <div key={idx} className="flex flex-col gap-[15px]">
              <div className="flex items-center gap-[7px]">
                <span className="text-[#888] text-[18px] font-medium leading-[145%] tracking-[-0.72px]">
                  {monthGroup.month}
                </span>
              </div>

              <div className="flex flex-col gap-[15px]">
                {monthGroup.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    onClick={() =>
                      navigate(
                        activeTab === "my-sentences"
                          ? "/list-detail/1"
                          : "/mommytalk365/1",
                      )
                    }
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
