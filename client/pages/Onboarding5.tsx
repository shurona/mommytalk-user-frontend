import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function Onboarding5() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/onboarding4");
  };

  // Auto-redirect after 3 seconds to simulate level setup processing
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding6");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col px-[25px] pt-[98px] pb-0">
      {/* Content */}
      <div className="flex-1 flex flex-row justify-center">
        <div className="w-full max-w-[343px] flex flex-col items-center gap-[144px]">
          {/* Title */}
          <h1 className="text-[22px] font-bold leading-[31.9px] text-foreground text-center w-full">
            맞춤 레벨을 설정하는 중이에요
          </h1>

          {/* Chick Illustration */}
          <div className="flex justify-center w-full">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/file/assets%2Fe9b9b01c41aa41ffb5a9c124b22fbbf4%2F3e97d5cdc98f434b856826508d1628c7?width=100 100w, https://cdn.builder.io/api/v1/file/assets%2Fe9b9b01c41aa41ffb5a9c124b22fbbf4%2F3e97d5cdc98f434b856826508d1628c7?width=200 200w, https://cdn.builder.io/api/v1/file/assets%2Fe9b9b01c41aa41ffb5a9c124b22fbbf4%2F3e97d5cdc98f434b856826508d1628c7?width=400 400w, https://cdn.builder.io/api/v1/file/assets%2Fe9b9b01c41aa41ffb5a9c124b22fbbf4%2F3e97d5cdc98f434b856826508d1628c7?width=800 800w, https://cdn.builder.io/api/v1/file/assets%2Fe9b9b01c41aa41ffb5a9c124b22fbbf4%2F3e97d5cdc98f434b856826508d1628c7?width=1200 1200w, https://cdn.builder.io/api/v1/file/assets%2Fe9b9b01c41aa41ffb5a9c124b22fbbf4%2F3e97d5cdc98f434b856826508d1628c7?width=1600 1600w, https://cdn.builder.io/api/v1/file/assets%2Fe9b9b01c41aa41ffb5a9c124b22fbbf4%2F3e97d5cdc98f434b856826508d1628c7?width=2000 2000w, https://cdn.builder.io/api/v1/file/assets%2Fe9b9b01c41aa41ffb5a9c124b22fbbf4%2F3e97d5cdc98f434b856826508d1628c7"
              src="https://cdn.builder.io/api/v1/file/assets%2Fe9b9b01c41aa41ffb5a9c124b22fbbf4%2F3e97d5cdc98f434b856826508d1628c7?width=800"
              alt="Setting up custom level"
              className="aspect-[1] object-cover object-center w-full mt-[1px] min-h-[20px] min-w-[20px] overflow-hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
