import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Palette, Search } from "lucide-react";
import Header_home from "../components/Header_home";
import heroImg from "../assets/home.png";
import useStore from "../store/useStore";

const TEAL = "#0CA5A0";
const NAVY = "#0F2C52";
const BLUE = "#2563EB";

const CATEGORIES = [
  { emoji: "🖥️",  label: "IT 서비스",   dbValue: "SaaS",        bg: "#FFF8F8", color: "#E87A7A", glow: "#FFB3B3" },
  { Icon: Palette, label: "디자인/기획", dbValue: "디자인/기획", bg: "#FFFAF5", color: "#F5A623", glow: "#FFD699" },
  { emoji: "💳",  label: "핀테크",      dbValue: "핀테크",      bg: "#F7FFF2", color: "#7BC67E", glow: "#B8F0B0" },
  { emoji: "🌐",  label: "웹사이트",    dbValue: "웹사이트",    bg: "#F0F9FF", color: "#5BA8F5", glow: "#A8D4FF" },
  { emoji: "🤖",  label: "AI",          dbValue: "AI",          bg: "#F8F6FF", color: "#8B7BF5", glow: "#C4BBFF" },
  { emoji: "🛍️", label: "커머스",      dbValue: "커머스",      bg: "#F0FFF9", color: "#4DBBA0", glow: "#A0F0D8" },
  { emoji: "☁️",  label: "클라우드",    dbValue: "클라우드",    bg: "#F8F8FF", color: "#A0A0CC", glow: "#D0D0FF" },
  { emoji: "📱",  label: "앱 제작",     dbValue: "모바일",      bg: "#F5F0FF", color: "#8C6BF0", glow: "#C8B3FF" },
  { emoji: "🛠️",  label: "유지보수",    dbValue: "유지보수",    bg: "#FFF6FA", color: "#E873A0", glow: "#FFB3D1" },
];

const EXAMPLES = [
  "AI 챗봇으로 고객 문의를 자동화 하고 싶습니다.",
  "중개 플랫폼을 만들고 싶어요. 예약·결제 기능 통합 사례와 비용을 받고 싶습니다.",
  "AI 추천 시스템을 활용해 고객별 맞춤형 상품을 제안하고 싶습니다.",
];
const HIGHLIGHT_KEYWORDS = [["AI 챗봇", "자동화"], ["중개 플랫폼", "예약·결제"], ["AI 추천 시스템", "맞춤형"]];

const PROJECTS = [
  {
    badge: "금융/핀테크",
    title: "AI 기반 통합 자산 관리 대시보드 구축",
    desc: "복잡한 금융 데이터를 한눈에 파악할 수 있는 직관적인 UI와 실시간 알림 시스템을 포함한 웹 서비스입니다.",
    tags: ["#React", "#Node.js", "#AI"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
  },
  {
    badge: "커머스",
    title: "하이엔드 리빙 편집숍 모바일 앱 런칭",
    desc: "고감도 브랜딩이 적용된 커머스 플랫폼으로, AR 가구 배치 기능과 빠른 결제 모듈을 구현하였습니다.",
    tags: ["#Flutter", "#Firebase", "#UI/UX"],
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
  },
  {
    badge: "SaaS/업무",
    title: "엔터프라이즈 인사 관리 솔루션 현대화",
    desc: "노후화된 사내 ERP 시스템을 클라우드 기반의 최신 아키텍처로 전환하여 업무 효율을 40% 개선했습니다.",
    tags: ["#Vue.js", "#AWS", "#Spring"],
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
  },
];

const PARTNERS = ["Google", "Apple", "Microsoft", "Amazon", "Meta", "NVIDIA", "Tesla", "Samsung", "TSMC", "Oracle", "SAP", "Salesforce", "Adobe", "Intel", "IBM", "Cisco", "Qualcomm", "Netflix", "Spotify", "Shopify", "Stripe", "Uber", "Airbnb", "LinkedIn", "GitHub", "Slack", "Zoom", "Notion", "Figma", "Vercel", "TOSS", "Coupang", "HYPERCONNECT", "FASTFIVE", "yanolja", "SOCAR", "zigbang", "MyRealTrip"];

const BASE_FONT = "'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

function Home() {
  const navigate = useNavigate();
  const { loginUser, userRole } = useStore();
  const [searchValue, setSearchValue] = useState("");
  const [hoveredCat, setHoveredCat] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);

  const handleSearch = () => {
    if (!searchValue.trim()) return;
    const q = searchValue.trim();
    const partnerKw = ['파트너', '개발자', '디자이너', '프리랜서', '팀원', '엔지니어'];
    const clientKw = ['클라이언트', '발주', '고객사', '기업 찾', '회사 찾'];
    if (partnerKw.some(k => q.includes(k))) navigate(`/partner_search?q=${encodeURIComponent(q)}`);
    else if (clientKw.some(k => q.includes(k))) navigate(`/client_search?q=${encodeURIComponent(q)}`);
    else navigate(`/project_search?q=${encodeURIComponent(q)}`);
  };

  const handlePortfolio = () => {
    if (!loginUser) {
      sessionStorage.setItem("loginRedirect", "portfolio");
      navigate("/login");
    } else {
      navigate("/partner_portfolio");
    }
  };

  const handleProjectRegister = () => {
    if (!loginUser) {
      sessionStorage.setItem("loginRedirect", "project_register");
      navigate("/login");
    } else if (userRole === "client") {
      navigate("/project_register");
    } else {
      alert("프로젝트 등록은 클라이언트 회원만 이용 가능합니다.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fff", fontFamily: BASE_FONT }}>
      <Header_home />

      {/* ── HERO ── */}
      <section style={{ position: "relative", width: "100%", height: 520, overflow: "hidden" }}>
        <img
          src={heroImg}
          alt="hero"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
        />
        {/* 중앙 그라데이션 오버레이 */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.0001) 0%, rgba(0,0,0,0.0001) 50%, rgba(0,0,0,0.0001) 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "0 20px",
        }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <h1 style={{
              fontSize: 40, fontWeight: 900, color: "white",
              lineHeight: 1.25, marginBottom: 20,
              textShadow: "0 2px 16px rgba(0,0,0,0.25)",
              fontFamily: BASE_FONT,
            }}>
              좋은 포트폴리오가<br />좋은 기회를 만든다.
            </h1>
            {/* 반투명 배경 pill 부제목 */}
            <div style={{
              display: "inline-flex", alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: 999,
              padding: "8px 20px",
              marginBottom: 28,
            }}>
              <span style={{
                fontSize: 14, color: "rgba(255,255,255,0.95)",
                fontFamily: BASE_FONT, fontWeight: 500,
              }}>
                신뢰 데이터를 쌓으며 성장하는 IT 협업 라운지 🌿
              </span>
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button
                onClick={handlePortfolio}
                style={{
                  padding: "12px 26px", borderRadius: 8, border: "none",
                  backgroundColor: TEAL, color: "white",
                  fontWeight: 700, fontSize: 14, cursor: "pointer",
                  fontFamily: BASE_FONT, transition: "opacity 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                포트폴리오 업그레이드
              </button>
              <button
                onClick={handleProjectRegister}
                style={{
                  padding: "12px 26px", borderRadius: 8, border: "none",
                  backgroundColor: NAVY, color: "white",
                  fontWeight: 700, fontSize: 14, cursor: "pointer",
                  fontFamily: BASE_FONT, transition: "opacity 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                프로젝트 등록하기
              </button>
            </div>
          </div>
        </div>
      </section>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>

        {/* ── CATEGORIES ── */}
        <section style={{ padding: "64px 0 56px" }}>
          <p style={{
            textAlign: "center", fontWeight: 900,
            fontSize: 23, marginBottom: 44, letterSpacing: "-0.3px",
            background: "linear-gradient(135deg, #6366F1 0%, #2563EB 40%, #0CA5A0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            비즈니스에 필요한 모든 IT 프로젝트를 진행할 수 있어요
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(9, 1fr)",
            gap: 12,
          }}>
            {CATEGORIES.map((cat, i) => {
              const isHover = hoveredCat === i;
              return (
                <div
                  key={cat.label}
                  onMouseEnter={() => setHoveredCat(i)}
                  onMouseLeave={() => setHoveredCat(null)}
                  onClick={() => navigate(`/project_search?field=${encodeURIComponent(cat.dbValue)}`)}
                  style={{
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    gap: 10,
                    padding: "24px 8px 18px", borderRadius: 18,
                    border: "none",
                    backgroundColor: isHover ? "white" : cat.bg,
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    boxShadow: isHover
                      ? `0 0 24px 6px ${cat.glow}88, 0 4px 16px ${cat.glow}44`
                      : "none",
                    transform: isHover ? "translateY(-2px) scale(1.04)" : "none",
                  }}
                >
                  {cat.emoji
                    ? <span style={{ fontSize: 26, lineHeight: 1 }}>{cat.emoji}</span>
                    : <Palette size={26} color={cat.color} strokeWidth={1.6} />}
                  <span style={{
                    fontSize: 12, fontWeight: 600,
                    color: isHover ? cat.color : "#4B5563",
                    textAlign: "center", lineHeight: 1.3,
                    transition: "color 0.22s ease",
                  }}>
                    {cat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* ── AI SEARCH (full width) ── */}
      <section style={{
        backgroundColor: "#F0F9FF",
        padding: "56px 20px",
        marginBottom: 0,
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span style={{
            display: "inline-block",
            color: "#6366F1", fontWeight: 700, fontSize: 13,
            marginBottom: 14,
          }}>유사사례 검색 AI</span>
          <h2 style={{
            fontSize: 30, fontWeight: 900,
            marginBottom: 36, lineHeight: 1.35, fontFamily: BASE_FONT,
            background: "linear-gradient(90deg, #7DD3FC 0%, #38BDF8 25%, #818CF8 65%, #93C5FD 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            AI가 예상 견적부터 유사 사례까지 알려드려요
          </h2>

          {/* 검색창 */}
          <div style={{
            display: "flex", maxWidth: 560, margin: "0 auto 36px",
            borderRadius: 40, overflow: "hidden",
            boxShadow: "0 2px 16px rgba(0,0,0,0.09)",
            backgroundColor: "white",
          }}>
            <input
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
              placeholder="만들고 싶은 프로젝트 아이디어를 자유롭게 입력해 주세요..."
              style={{
                flex: 1, padding: "16px 24px",
                border: "none", outline: "none",
                fontSize: 14, backgroundColor: "transparent",
                fontFamily: BASE_FONT, color: "#374151",
              }}
            />
            <button onClick={handleSearch} style={{
              width: 48, height: 48, margin: "6px 6px 6px 0", borderRadius: 999,
              background: "linear-gradient(135deg, #3B82F6 0%, #6366F1 50%, #8B5CF6 100%)",
              border: "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", flexShrink: 0,
              boxShadow: "0 4px 14px rgba(99,102,241,0.4)",
              transition: "box-shadow 0.2s, transform 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 20px rgba(99,102,241,0.55)"; e.currentTarget.style.transform = "scale(1.05)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 14px rgba(99,102,241,0.4)"; e.currentTarget.style.transform = "scale(1)"; }}
            >
              <Search size={18} color="white" />
            </button>
          </div>

          {/* 예시 카드 3개 */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16,
            maxWidth: 880, margin: "0 auto",
          }}>
            {EXAMPLES.map((ex, i) => (
              <div
                key={i}
                onClick={() => setSearchValue(ex)}
                style={{ background: "white", borderRadius: 14, padding: "18px 20px", textAlign: "left", cursor: "pointer", border: "1.5px solid #E2E8F0", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", transition: "box-shadow 0.2s, border-color 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 20px rgba(59,130,246,0.18)"; e.currentTarget.style.borderColor = "#BFDBFE"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.06)"; e.currentTarget.style.borderColor = "#E2E8F0"; }}
              >
                <span style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600, background: "#F1F5F9", borderRadius: 5, padding: "2px 8px", display: "inline-block", marginBottom: 10, fontFamily: BASE_FONT }}>예시</span>
                <p style={{ fontSize: 13, color: "#334155", lineHeight: 1.7, margin: 0, fontFamily: BASE_FONT }}>
                  {(() => { let txt = ex; const parts = []; const kws = HIGHLIGHT_KEYWORDS[i] || [];
                    kws.forEach(kw => { const idx = txt.indexOf(kw); if (idx >= 0) { if (idx > 0) parts.push(txt.slice(0, idx)); parts.push(<span key={kw} style={{ color: "#3B82F6", fontWeight: 700 }}>{kw}</span>); txt = txt.slice(idx + kw.length); } });
                    if (txt) parts.push(txt); return parts; })()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>

        {/* ── PROJECTS ── */}
        <section style={{ marginBottom: 80, paddingTop: 96 }}>
          <p style={{ color: "#6366F1", fontWeight: 700, fontSize: 13, marginBottom: 6 }}>우수 프로젝트</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 }}>
            <div>
              <h2 style={{ fontSize: 23, fontWeight: 900, marginBottom: 8, fontFamily: BASE_FONT, color: "#1E293B" }}>
                <span style={{ background: "linear-gradient(90deg, #7DD3FC 0%, #38BDF8 25%, #818CF8 65%, #93C5FD 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>DevBridge</span>에서 진행한 프로젝트들을 확인해 보세요
              </h2>
              <p style={{ fontSize: 14, color: "#6B7280" }}>
                풍부한 경험을 가진 파트너들의 성공 사례를 통해 당신의 프로젝트 아이디어를 구체화하세요.
              </p>
            </div>
            <button
              onClick={() => navigate("/project_search")}
              style={{
                background: "none", border: "none",
                color: "#6B7280", fontSize: 14, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 2,
                whiteSpace: "nowrap", flexShrink: 0, marginLeft: 32,
                fontFamily: BASE_FONT,
              }}
            >
              전체 보기 <span style={{ fontSize: 16 }}>›</span>
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {PROJECTS.map((proj, i) => (
              <div
                key={i}
                style={{
                  borderRadius: 16, overflow: "hidden",
                  border: "1px solid #F3F4F6",
                  backgroundColor: "white",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  cursor: "pointer",
                  transform: hoveredProject === i ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: hoveredProject === i ? "0 10px 28px rgba(0,0,0,0.1)" : "0 1px 4px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={() => setHoveredProject(i)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
                  <img
                    src={proj.image}
                    alt={proj.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <span style={{
                    position: "absolute", top: 14, left: 14,
                    padding: "4px 12px", borderRadius: 6,
                    backgroundColor: "rgba(0,0,0,0.62)", color: "white",
                    fontSize: 11, fontWeight: 600,
                  }}>{proj.badge}</span>
                </div>
                <div style={{ padding: "20px 20px 24px" }}>
                  <h3 style={{
                    fontSize: 15, fontWeight: 800, color: "#111827",
                    marginBottom: 8, fontFamily: BASE_FONT, lineHeight: 1.4,
                  }}>
                    {proj.title}
                  </h3>
                  <p style={{
                    fontSize: 13, color: "#6B7280",
                    lineHeight: 1.7, marginBottom: 16,
                  }}>
                    {proj.desc}
                  </p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {proj.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: 12, color: TEAL, fontWeight: 600,
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* ── TRUST BAR ── */}
      <div style={{
        borderTop: "1px solid #F3F4F6",
        borderBottom: "1px solid #F3F4F6",
        padding: "36px 20px 14px",
      }}>
        <p style={{
          textAlign: "center", fontSize: 12, color: "#9CA3AF",
          marginBottom: 32, fontFamily: BASE_FONT,
        }}>
          100,000+ 기업이 믿고 사용 중인 세계 IT 성장 플랫폼
        </p>
        <style>{`@keyframes marquee-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
        <div style={{ overflow: "hidden", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 48, animation: "marquee-scroll 60s linear infinite", width: "max-content" }}>
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <span key={i} style={{
                fontSize: 15, fontWeight: 700,
                color: "#9CA3AF", letterSpacing: "-0.3px",
                fontFamily: BASE_FONT, whiteSpace: "nowrap",
              }}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
