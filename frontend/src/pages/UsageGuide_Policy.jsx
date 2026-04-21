import React from "react";
import { ShieldCheck, AlertCircle, Trash2, Info, CheckCircle2, UserX, Clock, ArrowRight } from "lucide-react";
import AppHeader from "../components/AppHeader";
import UsageGuideSidebar from "../components/UsageGuideSidebar";
import home2Img from "../assets/home2.png";

const F = "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif";
const TEAL = "#0CA5A0";

export default function UsageGuide_Policy() {

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
              <ShieldCheck size={14} color="#2563EB" />
              <span style={{ fontSize: 13, color: "#1E3A8A", fontWeight: 700 }}>계정 및 이용 정책</span>
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <h1 style={{ color: "#0F172A", fontSize: 34, fontWeight: 900, margin: 0, lineHeight: 1.3 }}>투명한 커뮤니티 정책</h1>
          </div>
          <div>
            <p style={{ color: "#334155", fontSize: 16, margin: 0, fontWeight: 600 }}>플랫폼 이용 규칙과 사용자 보호를 위한 필수 정책 안내</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 20px", display: "flex", gap: 32 }}>
        <UsageGuideSidebar />

        <main style={{ flex: 1, display: "flex", flexDirection: "column", gap: 64 }}>
          {/* Section 1: 수수료 정책 */}
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 4, height: 24, background: TEAL, borderRadius: 2 }} />
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1E293B", margin: 0 }}>수수료 및 정산 정책</h2>
            </div>
            
            <div style={{ background: "white", border: "1.5px solid #E5E7EB", borderRadius: 24, padding: "40px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "start", gap: 24 }}>
                <div style={{ width: 56, height: 56, background: "#F0FDFA", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Info color={TEAL} size={28} />
                </div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#1E293B", marginBottom: 12 }}>플랫폼 이용 수수료는 어떻게 되나요?</h3>
                  <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.8, margin: "0 0 24px" }}>
                    DevBridge는 투명한 수수료 정책을 지향합니다. 프로젝트 매칭 시 최종 계약 금액의 10%(VAT 별도)가 수수료로 부과됩니다. 이 수수료는 에스크로 대금 보호, 전자계약 시스템 제공, 전담 매니저 중재 서비스 운영에 전액 사용됩니다.
                  </p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span style={{ padding: "6px 14px", background: "#F0FDFA", color: TEAL, fontSize: 12, fontWeight: 700, borderRadius: 20 }}>FEE POLICY</span>
                    <span style={{ padding: "6px 14px", background: "#F1F5F9", color: "#64748B", fontSize: 12, fontWeight: 600, borderRadius: 20 }}>기본 10% (VAT 별도)</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: 신고 및 제재 */}
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 4, height: 24, background: TEAL, borderRadius: 2 }} />
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1E293B", margin: 0 }}>신고 제도 및 서비스 제한</h2>
            </div>
            
            <div style={{ background: "white", border: "1.5px solid #E5E7EB", borderRadius: 24, padding: "40px" }}>
              <div style={{ display: "flex", alignItems: "start", gap: 24 }}>
                <div style={{ width: 56, height: 56, background: "#FEF2F2", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <AlertCircle color="#EF4444" size={28} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#1E293B", marginBottom: 12 }}>비매너 행위 및 허위 정보 신고</h3>
                  <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.8, marginBottom: 24 }}>
                    허위 경력 기재, 무단 작업 중단, 결제 유도 직거래 제안 등 플랫폼 건전성을 해치는 행위 발견 시 즉시 신고해 주세요. 운영팀은 사실 확인 후 엄격한 제재를 가합니다.
                  </p>
                  <div style={{ background: "#F8FAFB", borderRadius: 16, padding: "24px", borderLeft: "4px solid #F87171" }}>
                    <h4 style={{ fontSize: 14, fontWeight: 800, color: "#1E293B", marginBottom: 8 }}>운영팀 대응 프로세스</h4>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 12, color: "#64748B" }}>신고 접수</span>
                      <ArrowRight size={12} color="#CBD5E1" />
                      <span style={{ fontSize: 12, color: "#64748B" }}>사실 확인 및 소명</span>
                      <ArrowRight size={12} color="#CBD5E1" />
                      <span style={{ fontSize: 12, color: "#64748B", fontWeight: 700 }}>정책 기반 제재 (48시간 내)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: 데이터 관리 */}
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 4, height: 24, background: TEAL, borderRadius: 2 }} />
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1E293B", margin: 0 }}>탈퇴 및 데이터 관리 정책</h2>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24 }}>
              <div style={{ background: "white", border: "1.5px solid #E5E7EB", borderRadius: 24, padding: "32px" }}>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: "#1E293B", marginBottom: 16 }}>계정 탈퇴 시 데이터 처리</h3>
                <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7, marginBottom: 24 }}>
                  탈퇴 시 개인정보와 포트폴리오 원본 데이터는 즉시 삭제되어 복구가 불가능합니다. 단, 협업 이력 및 익명화된 평가 데이터는 통계 목적으로 보관될 수 있습니다.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <CheckCircle2 size={18} color={TEAL} />
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#475569" }}>원본 데이터: 즉시 삭제</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <CheckCircle2 size={18} color={TEAL} />
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#475569" }}>협업 통계: 익명화 보관</span>
                  </div>
                </div>
              </div>
              <div style={{ background: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: 24, padding: "32px", position: "relative", overflow: "hidden" }}>
                <Trash2 size={80} color="#E2E8F0" style={{ position: "absolute", right: -10, bottom: -10 }} />
                <h3 style={{ fontSize: 17, fontWeight: 800, color: "#1E293B", marginBottom: 16 }}>데이터 파기 안내</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ background: "white", padding: "12px 16px", borderRadius: 10, boxShadow: "0 1px 2px rgba(0,0,0,0.05)", fontSize: 12, color: "#64748B" }}>개인정보 (이름, 연락처) - <span style={{ color: "#EF4444", fontWeight: 700 }}>삭제됨</span></div>
                  <div style={{ background: "white", padding: "12px 16px", borderRadius: 10, boxShadow: "0 1px 2px rgba(0,0,0,0.05)", fontSize: 12, color: "#64748B" }}>포트폴리오 파일 - <span style={{ color: "#EF4444", fontWeight: 700 }}>삭제됨</span></div>
                  <div style={{ background: "#F0FDFA", padding: "12px 16px", borderRadius: 10, border: "1px solid #CCFBF1", fontSize: 12, color: TEAL, fontWeight: 700 }}>평가 통계 - 익명화 보관</div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
