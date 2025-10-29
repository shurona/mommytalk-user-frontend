import { useNavigate } from "react-router-dom";
import { BackButton } from "@/components";
import { Button } from "@/components/ui/button";

export default function Onboarding6() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/onboarding5");
  };

  const handleKakaoTalk = () => {
    window.open("http://pf.kakao.com/_SxmQxbn", "_blank");
  };

  return (
    <div className="min-h-screen bg-background flex justify-center px-[25px] py-[25px]">
      <div className="w-full max-w-[393px] flex flex-col gap-[51px]">
        <BackButton onClick={handleBack} />

        <div className="flex flex-col gap-[81px]">
          <div className="flex flex-col gap-[101px]">
            <h1 className="text-[22px] font-bold leading-[145%] text-foreground">
              우리집 맞춤 레벨 설정이 끝났어요
            </h1>

            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets%2Fe9b9b01c41aa41ffb5a9c124b22fbbf4%2F6af2f4304e9e4c3f8a0e6e62c9fdc279?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2Fe9b9b01c41aa41ffb5a9c124b22fbbf4%2F6af2f4304e9e4c3f8a0e6e62c9fdc279?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2Fe9b9b01c41aa41ffb5a9c124b22fbbf4%2F6af2f4304e9e4c3f8a0e6e62c9fdc279?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2Fe9b9b01c41aa41ffb5a9c124b22fbbf4%2F6af2f4304e9e4c3f8a0e6e62c9fdc279?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2Fe9b9b01c41aa41ffb5a9c124b22fbbf4%2F6af2f4304e9e4c3f8a0e6e62c9fdc279?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2Fe9b9b01c41aa41ffb5a9c124b22fbbf4%2F6af2f4304e9e4c3f8a0e6e62c9fdc279?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2Fe9b9b01c41aa41ffb5a9c124b22fbbf4%2F6af2f4304e9e4c3f8a0e6e62c9fdc279?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2Fe9b9b01c41aa41ffb5a9c124b22fbbf4%2F6af2f4304e9e4c3f8a0e6e62c9fdc279"
              src="https://cdn.builder.io/api/v1/image/assets%2Fe9b9b01c41aa41ffb5a9c124b22fbbf4%2F6af2f4304e9e4c3f8a0e6e62c9fdc279?width=800"
              alt="Level setting complete illustration"
              className="aspect-[3.23] object-cover object-center w-full mt-[20px] min-h-[20px] min-w-[20px] overflow-hidden"
            />
          </div>

          <div className="flex flex-col gap-[20px]">
            <p className="text-[16px] font-medium leading-[145%] text-muted-foreground">
              📌 메시지를 받으려면 마미톡잉글리쉬 카카오톡 채널 친구 추가가
              필요해요.
              <br />
              <br />
              📌 아직 친구추가를 하지 않았다면, 지금 바로 아래 버튼을
              눌러주세요!
            </p>

            <Button
              onClick={handleKakaoTalk}
              className="w-full h-[62px] rounded-[20px] text-[18px] tracking-[-0.72px]"
              style={{ backgroundColor: "#FFE100", color: "#111" }}
            >
              카카오톡채널 친구 추가하기
            </Button>

            <Button
              onClick={() => navigate("/dashboard")}
              className="w-full h-[62px] rounded-[20px] text-[18px] tracking-[-0.64px]"
             style={{ backgroundColor: "#FF9B00", color: "#FFF" }}
            >
              시작하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
