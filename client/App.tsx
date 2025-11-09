import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OnboardingProvider } from "./contexts/OnboardingContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import LineCallback from "./pages/LineCallback";
import KakaoCallback from "./pages/KakaoCallback";
import Onboarding1 from "./pages/Onboarding1";
import Onboarding2 from "./pages/Onboarding2";
import Onboarding3 from "./pages/Onboarding3";
import Onboarding4 from "./pages/Onboarding4";
import Onboarding5 from "./pages/Onboarding5";
import Onboarding6 from "./pages/Onboarding6";
import OnboardingFail from "./pages/OnboardingFail";
import ContentCreation from "./pages/ContentCreation";
import ContentCreationResult from "./pages/ContentCreationResult";
import SentenceDetail from "./pages/SentenceDetail";
import ListOption1Detail from "./pages/ListOption1Detail";
import Mommytalk365Detail from "./pages/Mommytalk365Detail";
import Records from "./pages/Records";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <OnboardingProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
          {/* Auth Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/line-callback" element={<LineCallback />} />
          <Route path="/kakao-callback" element={<KakaoCallback />} />

          {/* Onboarding Routes */}
          <Route path="/onboarding1" element={<ProtectedRoute><Onboarding1 /></ProtectedRoute>} />
          <Route path="/onboarding2" element={<ProtectedRoute><Onboarding2 /></ProtectedRoute>} />
          <Route path="/onboarding3" element={<ProtectedRoute><Onboarding3 /></ProtectedRoute>} />
          <Route path="/onboarding4" element={<ProtectedRoute><Onboarding4 /></ProtectedRoute>} />
          <Route path="/onboarding5" element={<ProtectedRoute><Onboarding5 /></ProtectedRoute>} />
          <Route path="/onboarding6" element={<ProtectedRoute><Onboarding6 /></ProtectedRoute>} />
          <Route path="/onboarding-fail" element={<ProtectedRoute><OnboardingFail /></ProtectedRoute>} />

          {/* App Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><ContentCreation /></ProtectedRoute>} />
          <Route path="/content-result" element={<ProtectedRoute><ContentCreationResult /></ProtectedRoute>} />
          <Route path="/sentence/:id" element={<ProtectedRoute><SentenceDetail /></ProtectedRoute>} />
          <Route path="/list-detail/:id" element={<ProtectedRoute><ListOption1Detail /></ProtectedRoute>} />
          <Route path="/mommytalk365/:id" element={<ProtectedRoute><Mommytalk365Detail /></ProtectedRoute>} />
          <Route path="/records" element={<ProtectedRoute><Records /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </OnboardingProvider>
  </QueryClientProvider>
);

const container = document.getElementById("root")! as HTMLElement & {
  __root?: ReturnType<typeof createRoot>;
};
if (container.__root) {
  container.__root.render(<App />);
} else {
  const root = createRoot(container);
  container.__root = root;
  root.render(<App />);
}
