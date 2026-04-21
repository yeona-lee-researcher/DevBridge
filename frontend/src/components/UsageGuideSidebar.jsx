import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FileText, Users, BookOpen, CreditCard, ShieldCheck 
} from "lucide-react";

const F = "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif";

const MENU_ITEMS = [
  { path: "/usage_guide", label: "이용 방법", icon: BookOpen },
  { path: "/usage_guide/portfolio", label: "포트폴리오", icon: FileText },
  { path: "/usage_guide/matching", label: "매칭", icon: Users },
  { path: "/usage_guide/contract", label: "결제/계약", icon: CreditCard },
  { path: "/usage_guide/policy", label: "운영 정책", icon: ShieldCheck },
];

export default function UsageGuideSidebar() {
  const location = useLocation();

  return (
    <aside style={{ width: 240, flexShrink: 0, display: "block" }}>
      <div style={{ 
        background: "white", 
        borderRadius: 16, 
        padding: "24px 16px",
        border: "1.5px solid #E5E7EB",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        position: "sticky",
        top: 100,
      }}>
        <div style={{ marginBottom: 20, padding: "0 8px" }}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: "#1E293B", marginBottom: 4, fontFamily: F }}>카테고리</h3>
          <p style={{ fontSize: 11, color: "#94A3B8", margin: 0, fontFamily: F }}>Customer Support</p>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {MENU_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 16px",
                  borderRadius: 10,
                  textDecoration: "none",
                  transition: "all 0.2s",
                  background: isActive ? "#F0F9FF" : "transparent",
                  border: isActive ? "1.5px solid #3B82F6" : "1.5px solid transparent",
                }}
              >
                <Icon size={18} color={isActive ? "#3B82F6" : "#64748B"} />
                <span style={{ 
                  fontSize: 14, 
                  fontWeight: isActive ? 700 : 500, 
                  color: isActive ? "#1E40AF" : "#475569",
                  fontFamily: F 
                }}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
