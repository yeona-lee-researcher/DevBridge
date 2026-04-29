import { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ChatBot from "./components/ChatBot";
import Footer from "./components/ui/Footer";

// 페이지 컴포넌트를 lazy load → 라우트별 청크 분리, 초기 번들 최소화
const LandingPage           = lazy(() => import("./pages/LandingPage"));
const Partner_Home          = lazy(() => import("./pages/Partner_Home"));
const Home                  = lazy(() => import("./pages/Home"));
const Login                 = lazy(() => import("./pages/Login"));
const SolutionMarket        = lazy(() => import("./pages/SolutionMarket"));
const UsageGuide            = lazy(() => import("./pages/UsageGuide"));
const Signup                = lazy(() => import("./pages/Signup"));
const OAuthKakaoCallback    = lazy(() => import("./pages/OAuthKakaoCallback"));
const Mypage                = lazy(() => import("./pages/Mypage"));
const Loading               = lazy(() => import("./pages/Loading"));
const PartnerRegister       = lazy(() => import("./pages/PartnerRegister"));
const ClientRegister        = lazy(() => import("./pages/ClientRegister"));
const Client_Home           = lazy(() => import("./pages/Client_Home"));
const PartnerSearch         = lazy(() => import("./pages/PartnerSearch"));
const ClientSearch          = lazy(() => import("./pages/ClientSearch"));
const ProjectSearch         = lazy(() => import("./pages/ProjectSearch"));
const PartnerProfile        = lazy(() => import("./pages/PartnerProfile"));
const Client_Profile        = lazy(() => import("./pages/Client_Profile"));
const Partner_Portfolio     = lazy(() => import("./pages/Partner_Portfolio"));
const Client_Portfolio      = lazy(() => import("./pages/Client_Portfolio"));
const PortfolioDetailEditor = lazy(() => import("./pages/PortfolioDetailEditor"));
const PortfolioProjectPreview = lazy(() => import("./pages/PortfolioProjectPreview"));
const ProjectRegister       = lazy(() => import("./pages/ProjectRegister"));
const AIchatProject         = lazy(() => import("./pages/AIchatProject"));
const AIchatProfile         = lazy(() => import("./pages/AIchatProfile"));
const AIchatPortfolio       = lazy(() => import("./pages/AIchatPortfolio"));
const PartnerDashboard      = lazy(() => import("./pages/PartnerDashboard"));
const ClientDashboard       = lazy(() => import("./pages/ClientDashboard"));
const SolutionDetail        = lazy(() => import("./pages/SolutionDetail"));
const FindPassword          = lazy(() => import("./pages/FindPassword"));
const UsageGuide_Portfolio  = lazy(() => import("./pages/UsageGuide_Portfolio"));
const PartnerProfileView    = lazy(() => import("./pages/PartnerProfileView"));
const ClientProfileView     = lazy(() => import("./pages/ClientProfileView"));
const UsageGuide_Matching   = lazy(() => import("./pages/UsageGuide_Matching"));
const UsageGuide_Contract   = lazy(() => import("./pages/UsageGuide_Contract"));
const UsageGuide_Policy     = lazy(() => import("./pages/UsageGuide_Policy"));
const Onboarding            = lazy(() => import("./pages/Onboarding"));
const StreamChatPage        = lazy(() => import("./pages/StreamChatPage"));


function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const noFooterPaths = ["/", "/loading", "/oauth/kakao/callback"];
  const showFooter = !noFooterPaths.includes(location.pathname);

  return (
    <>
      <Suspense fallback={<div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", fontSize:14, color:"#6B7280" }}>Loading...</div>}>
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/partner_home" element={<Partner_Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/solution_market" element={<SolutionMarket />} />
        <Route path="/solution_detail" element={<SolutionDetail />} />
        <Route path="/usage_guide" element={<UsageGuide />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/oauth/kakao/callback" element={<OAuthKakaoCallback />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/partner_register" element={<PartnerRegister />} />
        <Route path="/client_register" element={<ClientRegister />} />
        <Route path="/client_home" element={<Client_Home />} />
        <Route path="/partner_search" element={<PartnerSearch />} />
        <Route path="/client_search" element={<ClientSearch />} />
        <Route path="/partner_profile_view" element={<PartnerProfileView />} />
        <Route path="/client_profile_view" element={<ClientProfileView />} />
        <Route path="/project_search" element={<ProjectSearch />} />
        <Route path="/partner_profile" element={<PartnerProfile />} />
        <Route path="/client_profile" element={<Client_Profile />} />
        <Route path="/partner_portfolio" element={<Partner_Portfolio />} />
        <Route path="/client_portfolio" element={<Client_Portfolio />} />
        <Route path="/portfolio_detail_editor" element={<PortfolioDetailEditor />} />
        <Route path="/portfolio_project_preview" element={<PortfolioProjectPreview />} />
        <Route path="/project_register" element={<ProjectRegister />} />
        <Route path="/ai_chat_project" element={<AIchatProject />} />
        <Route path="/ai_chat_profile" element={<AIchatProfile />} />
        <Route path="/aichat_portfolio" element={<AIchatPortfolio />} />
        <Route path="/partner_dashboard" element={<PartnerDashboard />} />
        <Route path="/client_dashboard" element={<ClientDashboard />} />
        <Route path="/find-password" element={<FindPassword />} />
        <Route path="/usage_guide/portfolio" element={<UsageGuide_Portfolio />} />
        <Route path="/usage_guide/matching" element={<UsageGuide_Matching />} />
        <Route path="/usage_guide/contract" element={<UsageGuide_Contract />} />
        <Route path="/usage_guide/policy" element={<UsageGuide_Policy />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/chat" element={<StreamChatPage />} />
        </Routes>
      </Suspense>
      {showFooter && <Footer />}
      {!isLandingPage && <ChatBot />}
    </>
  );
}

export default App;
