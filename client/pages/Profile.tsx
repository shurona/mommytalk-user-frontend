import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const navigate = useNavigate();
  const [isOnboarded] = useState(true);

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
              <button className="text-[#FF9E08] text-center text-[16px] font-medium leading-[145%] tracking-[-0.64px]">
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
      <div className="w-full max-w-[343px] mx-auto flex flex-col gap-[25px]">
        <h1 className="text-[#111] text-center text-[16px] font-bold leading-[145%]">
          내 계정
        </h1>

        <div className="flex flex-col gap-[41px]">
          <div className="flex flex-col gap-[20px]">
            <label className="text-[#888] text-[16px] font-medium leading-[145%]">
              레벨
            </label>
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fe9b9b01c41aa41ffb5a9c124b22fbbf4%2F6af2f4304e9e4c3f8a0e6e62c9fdc279"
              alt="Level progression"
              className="w-full h-auto aspect-[343/106.38]"
            />
          </div>

          <div className="flex flex-col items-center gap-[13px]">
            <Button
              onClick={() => navigate("/onboarding3")}
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
                도니
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
            <button className="text-[#FF9E08] text-center text-[16px] font-medium leading-[145%] tracking-[-0.64px]">
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
