import React, { useState } from "react";
import { Search, Github, BookOpen, AlertCircle, CheckCircle2, Link2, Upload, Star } from "lucide-react";
import AppHeader from "../components/AppHeader";
import UsageGuideSidebar from "../components/UsageGuideSidebar";
import home2Img from "../assets/home2.png";

const F = "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif";
const TEAL = "#0CA5A0";

export default function UsageGuide_Portfolio() {
  const [openFaq, setOpenFaq] = useState(null);

  const FAQ = [
    { 
      q: "GitHub 연동 오류 해결 방법 (레포지토리/잔디 미업데이트)", 
      a: "레포지토리가 불러와지지 않는 경우 GitHub 설정에서 DevBridge 앱의 권한(Repository Access)을 확인해 주세요. Contribution Graph(잔디)가 업데이트되지 않는다면 이메일 주소가 GitHub 계정과 일치하는지 점검해야 합니다. 해결되지 않을 경우 연동을 해제한 후 재인증을 권장합니다." 
    },
    { 
      q: "기술 블로그 RSS 등록 방법 (벨로그, 티스토리, 워드프레스)", 
      a: "본인의 블로그 주소를 입력하면 RSS 피드를 통해 최신 포스팅을 자동으로 불러옵니다. 벨로그(velog.io/@유저ID), 티스토리(유저ID.tistory.com) 등 각 플랫폼별 형식을 확인하여 등록해 주세요. 동기화는 최대 1시간 간격으로 이루어집니다." 
    }
  ];

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
              <Star size={14} color="#2563EB" />
              <span style={{ fontSize: 13, color: "#1E3A8A", fontWeight: 700 }}>포트폴리오 관리 가이드</span>
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <h1 style={{ color: "#0F172A", fontSize: 34, fontWeight: 900, margin: 0, lineHeight: 1.3 }}>포트폴리오 관리 가이드</h1>
          </div>
          <div>
            <p style={{ color: "#334155", fontSize: 16, margin: 0, fontWeight: 600 }}>외부 플랫폼 연동 및 콘텐츠 최적화를 위한 종합 가이드</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 20px", display: "flex", gap: 32 }}>
        <UsageGuideSidebar />

        <main style={{ flex: 1, display: "flex", flexDirection: "column", gap: 64 }}>
          {/* Section 1: 외부 플랫폼 연동 */}
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 4, height: 24, background: TEAL, borderRadius: 2 }} />
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1E293B", margin: 0 }}>외부 플랫폼 연동 및 동기화</h2>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {FAQ.map((item, i) => (
                <div key={i} style={{ background: "white", borderRadius: 16, border: "1.5px solid #E5E7EB", overflow: "hidden" }}>
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: "100%", padding: "24px", textAlign: "left", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  >
                    <span style={{ fontSize: 16, fontWeight: 700, color: "#334155", fontFamily: F }}>{item.q}</span>
                    <span style={{ fontSize: 20, color: "#94A3B8" }}>{openFaq === i ? "−" : "+"}</span>
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: "0 24px 24px", fontSize: 14, color: "#64748B", lineHeight: 1.8 }}>
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: 콘텐츠 유지보수 */}
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 4, height: 24, background: TEAL, borderRadius: 2 }} />
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1E293B", margin: 0 }}>콘텐츠 업데이트 및 유지보수</h2>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {[
                { icon: <Star />, title: "대표 프로젝트 설정", desc: "자신 있는 결과물을 상단에 고정하여 클라이언트의 시선을 먼저 끌 수 있습니다." },
                { icon: <Link2 />, title: "링크 유효성 검사", desc: "등록된 데모/배포 링크가 깨졌을 때 시스템이 알림을 보내며 정기 점검을 권장합니다." },
                { icon: <Upload />, title: "업로드 제한", desc: "이미지는 5MB, PDF는 20MB로 제한됩니다. 로딩 속도를 위해 최적화를 권장합니다." }
              ].map((card, i) => (
                <div key={i} style={{ background: "white", padding: "32px", borderRadius: 20, border: "1.5px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                  <div style={{ width: 48, height: 48, background: "#F0FDFA", color: TEAL, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                    {card.icon}
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: "#1E293B", marginBottom: 10 }}>{card.title}</h3>
                  <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6, margin: 0 }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: 신뢰성 및 신고 */}
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 4, height: 24, background: TEAL, borderRadius: 2 }} />
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1E293B", margin: 0 }}>신뢰성 검증 및 신고 시스템</h2>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div style={{ background: "#FEF2F2", border: "1.5px solid #FECACA", borderRadius: 24, padding: "40px" }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#991B1B", marginBottom: 12 }}>도용 포트폴리오 신고</h3>
                <p style={{ fontSize: 14, color: "#B91C1C", lineHeight: 1.7, marginBottom: 24 }}>
                  타인의 결과물을 무단으로 도용한 경우를 발견하셨나요? 증빙 자료와 함께 신고하시면 운영진이 즉시 검토합니다.
                </p>
                <button style={{ background: "none", border: "none", color: "#991B1B", fontWeight: 700, fontSize: 14, cursor: "pointer", padding: 0 }}>신고 가이드 보기 →</button>
              </div>
              
              <div style={{ background: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: 24, padding: "32px", display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 44, height: 44, background: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
                    <CheckCircle2 color={TEAL} size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: 15, fontWeight: 700, color: "#1E293B", marginBottom: 2 }}>신뢰도 배지 부여</h4>
                    <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>본인 인증 및 성공적인 협업 완료 시 부여됩니다.</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 44, height: 44, background: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
                    <AlertCircle color="#EF4444" size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: 15, fontWeight: 700, color: "#EF4444", marginBottom: 2 }}>허위 사실 기재 시 불이익</h4>
                    <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>경력 위조 시 서비스 이용이 영구 제한될 수 있습니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
