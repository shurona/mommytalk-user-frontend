import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import LineCallback from "./pages/LineCallback";
import Onboarding1 from "./pages/Onboarding1";
import Onboarding2 from "./pages/Onboarding2";
import Onboarding3 from "./pages/Onboarding3";
import Onboarding4 from "./pages/Onboarding4";
import Onboarding5 from "./pages/Onboarding5";
import Onboarding6 from "./pages/Onboarding6";
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
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/line-callback" element={<LineCallback />} />

          {/* Onboarding Routes */}
          <Route path="/onboarding1" element={<Onboarding1 />} />
          <Route path="/onboarding2" element={<Onboarding2 />} />
          <Route path="/onboarding3" element={<Onboarding3 />} />
          <Route path="/onboarding4" element={<Onboarding4 />} />
          <Route path="/onboarding5" element={<Onboarding5 />} />
          <Route path="/onboarding6" element={<Onboarding6 />} />

          {/* App Routes */}
          <Route path="/dashboard" element={<ContentCreation />} />
          <Route path="/content-result" element={<ContentCreationResult />} />
          <Route path="/sentence/:id" element={<SentenceDetail />} />
          <Route path="/list-detail/:id" element={<ListOption1Detail />} />
          <Route path="/mommytalk365/:id" element={<Mommytalk365Detail />} />
          <Route path="/records" element={<Records />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
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
