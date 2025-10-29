import { useNavigate } from "react-router-dom";
import { Hero } from "@/components";

export default function Onboarding1() {
  const navigate = useNavigate();
  return (
    <Hero
      logoSrc="https://cdn.builder.io/api/v1/image/assets%2Fe9b9b01c41aa41ffb5a9c124b22fbbf4%2Fbdfca41c901a4c89a48d6eb0577fdc27"
      logoAlt="Mommy Talk English"
      illustrationSrc="https://cdn.builder.io/api/v1/image/assets%2Fe9b9b01c41aa41ffb5a9c124b22fbbf4%2F5ef8d5d724b04f5aa24d9690fa3df549"
      illustrationAlt="Cute owls illustration"
      title="우리집 맞춤 레벨 설정을 시작할게요!"
      description={
        <>
          단 3개의 질문에
          <br />
          간단하게 답을 선택해 주시면 됩니다.
          <br />
          설정 완료까지 2분이면 충분해요
        </>
      }
      ctaLabel="시작하기"
      onCta={() => navigate("/onboarding2")}
    />
  );
}
