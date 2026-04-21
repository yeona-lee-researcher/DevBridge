import React from "react";
import { Search, Users, CheckCircle, Shield, ArrowRight, UserCheck, MessageCircle, FileCheck } from "lucide-react";
import AppHeader from "../components/AppHeader";
import UsageGuideSidebar from "../components/UsageGuideSidebar";
import home2Img from "../assets/home2.png";

const F = "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif";
const TEAL = "#0CA5A0";

export default function UsageGuide_Matching() {

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", fontFamily: F }}>
      <AppHeader />

      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.01) 100%), url(${home2Img}) center/cover no-repeat`,
        padding: "80px 40px 72px",
        textAlign: "center",
      }}>
        <div style={{
          maxWidth: 920,
          margin: "0 auto",
          background: "rgba(255,255,255,0.64)",
          border: "1px solid rgba(255,255,255,0.86)",
          borderRadius: 20,
          padding: "24px 24px 22px",
          boxShadow: "0 10px 30px rgba(15,23,42,0.10)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.72)", border: "1px solid rgba(148,163,184,0.35)", borderRadius: 20, padding: "6px 16px" }}>
              <Users size={14} color="#2563EB" />
              <span style={{ fontSize: 13, color: "#1E3A8A", fontWeight: 700 }}>파트너십 및 팀 매칭 가이드</span>
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <h1 style={{ color: "#0F172A", fontSize: 34, fontWeight: 900, margin: 0, lineHeight: 1.3 }}>매칭 성공 가이드</h1>
          </div>
          <div>
            <p style={{ color: "#334155", fontSize: 16, margin: 0, fontWeight: 600 }}>면접 없는 빠른 매칭을 위한 선발 및 지원 가이드</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 20px", display: "flex", gap: 32 }}>
        <UsageGuideSidebar />

        <main style={{ flex: 1, display: "flex", flexDirection: "column", gap: 64 }}>
          {/* Section 1: 선발 가이드 */}
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 4, height: 24, background: TEAL, borderRadius: 2 }} />
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1E293B", margin: 0 }}>[클라이언트용] 실패 없는 선발 가이드</h2>
            </div>
            
            <div style={{ background: "white", border: "1.5px solid #E5E7EB", borderRadius: 24, padding: "40px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.7, marginBottom: 32 }}>
                면접이 생략되는 매칭 방식 특성상, 프로필에서 다음 항목들을 중점적으로 확인해야 합니다.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {[
                  { title: "기술 스택 일치 여부", desc: "Java/Spring Boot 등 구체적인 기술 스택과 버전을 확인하세요." },
                  { title: "GitHub 활동성", desc: "최근 커밋 기록과 코드의 구조적 품질을 검토하는 것이 중요합니다." },
                  { title: "유사 프로젝트 경험", desc: "동종 업계나 유사한 기능을 구현한 경험이 있는지 체크하세요." },
                  { title: "포트폴리오 완성도", desc: "단순 나열이 아닌, 본인의 역할과 기여도가 명확한지 확인하세요." }
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, padding: "20px", background: "#F8FAFC", borderRadius: 16 }}>
                    <div style={{ color: TEAL, fontWeight: 800 }}>✔</div>
                    <div>
                      <h4 style={{ fontSize: 15, fontWeight: 700, color: "#1E293B", marginBottom: 4 }}>{item.title}</h4>
                      <p style={{ fontSize: 13, color: "#64748B", margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 2: 작성법 가이드 */}
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 4, height: 24, background: TEAL, borderRadius: 2 }} />
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1E293B", margin: 0 }}>[파트너용] 매칭률 높이는 프로필 작성법</h2>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {[
                { title: "포트폴리오 가독성", desc: "본인의 역할(Role)과 성과를 수치화하여 명확히 기재하세요." },
                { title: "기술 채널 연동", desc: "깔끔한 README와 블로그 기록은 전문성을 증명하는 가장 빠른 길입니다." },
                { title: "자기소개 전략", desc: "협업 스타일과 가용 가능한 시간을 구체적으로 명시하여 신뢰를 얻으세요." }
              ].map((card, i) => (
                <div key={i} style={{ background: "#F0FDFA", border: "1.5px solid #CCFBF1", padding: "32px", borderRadius: 24 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: "#134E4A", marginBottom: 12 }}>{card.title}</h3>
                  <p style={{ fontSize: 13, color: "#0F766E", lineHeight: 1.7, margin: 0 }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: 프로세스 */}
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 4, height: 24, background: TEAL, borderRadius: 2 }} />
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1E293B", margin: 0 }}>매칭 프로세스 안내</h2>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {[
                { step: "01", label: "지원", icon: <UserCheck /> },
                { step: "02", label: "검토", icon: <Search /> },
                { step: "03", label: "확정", icon: <FileCheck /> },
                { step: "04", label: "협업", icon: <MessageCircle /> }
              ].map((item, i) => (
                <React.Fragment key={i}>
                  <div style={{ flex: 1, background: "white", border: "1.5px solid #E5E7EB", borderRadius: 20, padding: "24px", textAlign: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.03)" }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: TEAL, marginBottom: 12 }}>STEP {item.step}</div>
                    <div style={{ color: "#475569", marginBottom: 8, display: "flex", justifyContent: "center" }}>{item.icon}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#1E293B" }}>{item.label}</div>
                  </div>
                  {i < 3 && <ArrowRight color="#CBD5E1" size={24} />}
                </React.Fragment>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
