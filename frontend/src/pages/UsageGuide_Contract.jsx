import React from "react";
import {
    CreditCard,
    ShieldCheck,
    FileText,
    AlertCircle,
    CheckCircle2,
    DollarSign,
    Scale,
    ArrowRight,
} from "lucide-react";
import AppHeader from "../components/AppHeader";
import UsageGuideSidebar from "../components/UsageGuideSidebar";
import home2Img from "../assets/home2.png";

const F = "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif";
const TEAL = "#0CA5A0";

export default function UsageGuide_Contract() {

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
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: 8,
                            background: "rgba(255,255,255,0.72)", border: "1px solid rgba(148,163,184,0.35)",
                            borderRadius: 20, padding: "6px 16px",
                        }}>
                            <CreditCard size={14} color="#2563EB" />
                            <span style={{ fontSize: 13, color: "#1E3A8A", fontWeight: 700 }}>외주 계약 및 결제 가이드</span>
                        </div>
                    </div>
                    <div style={{ marginBottom: 14 }}>
                        <h1 style={{ color: "#0F172A", fontSize: 34, fontWeight: 900, margin: 0, lineHeight: 1.3 }}>
                            안전한 계약과 투명한 결제
                        </h1>
                    </div>
                    <div>
                        <p style={{ color: "#334155", fontSize: 16, margin: 0, fontWeight: 600 }}>
                            금전적 보호와 법적 안전을 위한 DevBridge의 시스템 안내
                        </p>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 20px", display: "flex", gap: 32 }}>
                <UsageGuideSidebar />

                <main style={{ flex: 1, display: "flex", flexDirection: "column", gap: 64 }}>
                    {/* Section 1: 에스크로 결제 */}
                    <section>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                            <div style={{ width: 4, height: 24, background: TEAL, borderRadius: 2 }} />
                            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1E293B", margin: 0 }}>에스크로 대금 보호 시스템</h2>
                        </div>

                        <div style={{ background: "white", border: "1.5px solid #E5E7EB", borderRadius: 24, padding: "40px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                            <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: 18, fontWeight: 800, color: "#1E293B", marginBottom: 16 }}>왜 에스크로가 필요한가요?</h3>
                                    <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.8, margin: "0 0 24px" }}>
                                        클라이언트가 결제한 대금은 DevBridge가 안전하게 보관하며, 파트너가 결과물을 최종 납품하고 클라이언트가 승인한 후에 비로소 정산이 이루어집니다. 이는 대금 미지급이나 선금 먹튀 문제를 원천적으로 방지합니다.
                                    </p>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            <CheckCircle2 size={18} color={TEAL} />
                                            <span style={{ fontSize: 14, fontWeight: 600, color: "#475569" }}>선금 예치로 신뢰도 확보</span>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            <CheckCircle2 size={18} color={TEAL} />
                                            <span style={{ fontSize: 14, fontWeight: 600, color: "#475569" }}>최종 승인 시 자동 정산 시스템</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{
                                    width: 240, height: 240, background: "#F0FDFA", borderRadius: "50%",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                }}>
                                    <DollarSign size={80} color={TEAL} strokeWidth={1.5} />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: 표준 계약서 */}
                    <section>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                            <div style={{ width: 4, height: 24, background: TEAL, borderRadius: 2 }} />
                            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1E293B", margin: 0 }}>표준 계약서 작성 항목</h2>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                            {[
                                "작업 범위 및 산출물",
                                "최종 마감 기한",
                                "단계별 대금 지급",
                                "지체 상금 규정",
                                "하자 보수 범위",
                                "지식 재산권 귀속",
                            ].map((item, i) => (
                                <div key={i} style={{
                                    background: "white", padding: "20px", borderRadius: 12,
                                    border: "1.5px solid #F1F5F9", display: "flex", alignItems: "center", gap: 12,
                                }}>
                                    <FileText size={18} color="#94A3B8" />
                                    <span style={{ fontSize: 14, fontWeight: 700, color: "#475569" }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 3: 분쟁 조정 */}
                    <section>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                            <div style={{ width: 4, height: 24, background: TEAL, borderRadius: 2 }} />
                            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1E293B", margin: 0 }}>분쟁 조정 및 해결 정책</h2>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 24 }}>
                            <div style={{ background: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: 24, padding: "32px" }}>
                                <Scale size={32} color="#64748B" style={{ marginBottom: 16 }} />
                                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#1E293B", marginBottom: 12 }}>객관적 중재 시스템</h3>
                                <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7, margin: 0 }}>
                                    작업 결과물이 계약 내용과 상이할 경우, DevBridge 중재팀이 개입하여 계약서와 결과물을 대조합니다. 필요 시 외부 전문가 자문을 통해 공정한 해결책을 제시합니다.
                                </p>
                            </div>
                            <div style={{ background: "#FEF2F2", border: "1.5px solid #FECACA", borderRadius: 24, padding: "32px" }}>
                                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#991B1B", marginBottom: 12 }}>주의사항</h3>
                                <ul style={{ padding: 0, margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                                    {[
                                        "플랫폼 외부 직거래 시 보호가 불가능합니다.",
                                        "구두 합의가 아닌 반드시 '채팅/계약서'로 증거를 남기세요.",
                                        "작업 시작 전 계약 내용을 꼼꼼히 확인하세요.",
                                    ].map((text, i) => (
                                        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                                            <AlertCircle size={16} color="#EF4444" style={{ marginTop: 2 }} />
                                            <span style={{ fontSize: 13, color: "#B91C1C", lineHeight: 1.5, fontWeight: 500 }}>{text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
