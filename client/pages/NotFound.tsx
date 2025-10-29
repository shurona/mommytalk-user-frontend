import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-[393px] flex flex-col items-center gap-6 sm:gap-8 text-center py-16 sm:py-[100px] px-[25px]">
        <div className="text-5xl sm:text-[64px] font-bold text-primary">404</div>
        <h1 className="text-xl sm:text-[22px] font-bold leading-[145%] text-foreground">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-base sm:text-[18px] font-medium leading-[145%] text-muted-foreground">
          요청하신 페이지가 존재하지 않거나<br />
          이동되었을 수 있습니다.
        </p>
        <a
          href="/"
          className="w-full h-[62px] bg-primary text-primary-foreground font-bold text-[16px] leading-[145%] tracking-[-0.64px] rounded-[20px] transition-all duration-200 hover:opacity-90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background flex items-center justify-center"
        >
          홈으로 돌아가기
        </a>
      </div>
    </div>
  );
};

export default NotFound;
