import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { projectsApi } from "../../api";

/**
 * 대시보드 "시작 전 프로젝트" 탭.
 * - GET /api/projects/me 호출 → 본인이 등록한 프로젝트 중 RECRUITING/모집중/시작 예정 카드 노출
 * - 상세보기: 모달로 프로젝트 상세 정보 (예상 견적/기간/스택/모집 요건 등) 표시
 * - 수정: ProjectRegister 페이지로 ?id={id}&edit=1 진입 → 기존 데이터 로드 후 편집
 * - 새 프로젝트 등록하기: 상단 네비 "프로젝트 등록" 탭(/project_register)으로 이동
 */

const F = "'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const PRIMARY_GRAD = "linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #6366f1 100%)";
const SECONDARY_BG = "#DBEAFE";
const SECONDARY_HOVER = "#BFDBFE";

export default function StartingProjectsTab({ role = "partner" }) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detailTarget, setDetailTarget] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    projectsApi
      .myList()
      .then((list) => {
        if (!mounted) return;
        const filtered = (list || []).filter((p) => {
          const s = (p.status || "").toString();
          return s === "모집중" || s === "RECRUITING" || s === "시작 예정";
        });
        setProjects(filtered);
      })
      .catch((e) => {
        if (!mounted) return;
        setError(e?.response?.data?.message || e?.message || "불러오기 실패");
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const handleNewProject = () => {
    navigate("/project_register");
  };

  return (
    <div>
      {/* ── 그라데이션 타이틀 헤더 (대시보드 통일 디자인) ── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24, gap: 16 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1
            style={{
              fontSize: 34,
              fontWeight: 900,
              margin: "0 0 8px",
              fontFamily: F,
              background: PRIMARY_GRAD,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.5px",
              lineHeight: 1.2,
            }}
          >
            시작 전 프로젝트
          </h1>
          <p style={{ fontSize: 14, color: "#64748B", margin: 0, fontFamily: F, lineHeight: 1.6 }}>
            직접 등록하신 프로젝트 중 모집/시작 전 단계의 프로젝트입니다.
          </p>
        </div>
        <button
          onClick={handleNewProject}
          style={{
            padding: "12px 22px",
            borderRadius: 999,
            border: "none",
            background: PRIMARY_GRAD,
            color: "white",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: F,
            boxShadow: "0 4px 14px rgba(99,102,241,0.30)",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          + 새 프로젝트 등록하기
        </button>
      </div>

      {loading && (
        <div style={{ padding: 60, textAlign: "center", color: "#94A3B8", fontFamily: F, fontSize: 14 }}>
          불러오는 중…
        </div>
      )}

      {error && !loading && (
        <div
          style={{
            padding: 24,
            borderRadius: 12,
            background: "#FEF2F2",
            border: "1px solid #FECACA",
            color: "#B91C1C",
            fontFamily: F,
            fontSize: 13,
          }}
        >
          프로젝트 목록을 불러오지 못했습니다: {error}
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <EmptyState role={role} onCreate={handleNewProject} />
      )}

      {!loading && projects.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {projects.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              onOpenDetail={() => setDetailTarget(p.id)}
              onEdit={() => navigate(`/project_register?id=${p.id}&edit=1`)}
              onDelete={async () => {
                if (!window.confirm(`'${p.title || "(제목 없음)"}' 프로젝트를 삭제할까요?\n이 작업은 되돌릴 수 없습니다.`)) return;
                try {
                  await projectsApi.remove(p.id);
                  setProjects((prev) => prev.filter((x) => x.id !== p.id));
                } catch (e) {
                  alert(e?.response?.data?.message || "삭제에 실패했습니다.");
                }
              }}
            />
          ))}
        </div>
      )}

      {detailTarget != null && (
        <ProjectDetailModal projectId={detailTarget} onClose={() => setDetailTarget(null)} />
      )}
    </div>
  );
}

function EmptyState({ role, onCreate }) {
  return (
    <div
      style={{
        padding: "60px 24px",
        borderRadius: 16,
        border: "1.5px dashed #CBD5E1",
        background: "white",
        textAlign: "center",
        fontFamily: F,
      }}
    >
      <div style={{ fontSize: 42, marginBottom: 10 }}>📂</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: "#1E293B", marginBottom: 6 }}>
        아직 등록된 시작 전 프로젝트가 없어요
      </div>
      <div style={{ fontSize: 13, color: "#64748B", lineHeight: 1.7, marginBottom: 18 }}>
        {role === "client"
          ? "AI 행운이와 대화하거나 직접 등록 폼에서 새 프로젝트를 만들어 보세요."
          : "포트폴리오성 프로젝트나 직접 진행할 프로젝트를 등록해 보세요."}
      </div>
      <button
        onClick={onCreate}
        style={{
          padding: "11px 22px",
          borderRadius: 999,
          border: "none",
          background: PRIMARY_GRAD,
          color: "white",
          fontSize: 13,
          fontWeight: 700,
          cursor: "pointer",
          fontFamily: F,
          boxShadow: "0 4px 14px rgba(99,102,241,0.30)",
        }}
      >
        + 새 프로젝트 등록하기
      </button>
    </div>
  );
}

function ProjectCard({ project, onOpenDetail, onEdit, onDelete }) {
  const status = project.status || "모집중";
  const tags = (project.tags || project.skillSet || []).slice(0, 4);
  const period = project.period || (project.durationDays ? `${Math.round(project.durationDays / 30)}개월` : "협의");

  return (
    <div
      style={{
        background: "white",
        border: "1px solid #E5E7EB",
        borderRadius: 16,
        padding: "18px 20px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.15s, transform 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <span
          style={{
            padding: "3px 10px",
            borderRadius: 999,
            background: "#DBEAFE",
            color: "#2563EB",
            fontSize: 11,
            fontWeight: 700,
            fontFamily: F,
          }}
        >
          {status}
        </span>
        {project.deadline && (
          <span style={{ fontSize: 11, color: "#94A3B8", fontFamily: F }}>
            마감 {String(project.deadline).slice(0, 10)}
          </span>
        )}
      </div>

      <div>
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#1E293B",
            fontFamily: F,
            lineHeight: 1.4,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.title || "(제목 없음)"}
        </div>
        {project.slogan && (
          <div
            style={{
              fontSize: 12,
              color: "#64748B",
              fontFamily: F,
              marginTop: 4,
              lineHeight: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.slogan}
          </div>
        )}
      </div>

      {tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {tags.map((t, i) => (
            <span
              key={i}
              style={{
                padding: "3px 9px",
                borderRadius: 999,
                background: "#F1F5F9",
                color: "#475569",
                fontSize: 11,
                fontWeight: 600,
                fontFamily: F,
              }}
            >
              {String(t).replace(/^#/, "")}
            </span>
          ))}
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 10,
          borderTop: "1px solid #F1F5F9",
          fontSize: 12,
          color: "#64748B",
          fontFamily: F,
        }}
      >
        <span>📅 {period}</span>
        <span style={{ color: "#1E293B", fontWeight: 700 }}>{project.price || "협의"}</span>
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        <button
          onClick={onDelete}
          aria-label="삭제"
          title="삭제"
          style={{
            width: 38,
            padding: "9px 0",
            borderRadius: 10,
            border: "1px solid #FECACA",
            background: "white",
            color: "#DC2626",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: F,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.15s, color 0.15s, border-color 0.15s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#FEE2E2";
            e.currentTarget.style.color = "#B91C1C";
            e.currentTarget.style.borderColor = "#FCA5A5";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "white";
            e.currentTarget.style.color = "#DC2626";
            e.currentTarget.style.borderColor = "#FECACA";
          }}
        >
          🗑
        </button>
        <button
          onClick={onEdit}
          style={{
            flex: 1,
            padding: "9px 0",
            borderRadius: 10,
            border: "1px solid #E5E7EB",
            background: "white",
            color: "#374151",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: F,
            transition: "background 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#FEF9C3";
            e.currentTarget.style.color = "#713f12";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "white";
            e.currentTarget.style.color = "#374151";
          }}
        >
          수정
        </button>
        <button
          onClick={onOpenDetail}
          style={{
            flex: 1,
            padding: "9px 0",
            borderRadius: 10,
            border: "none",
            background: SECONDARY_BG,
            color: "#1e3a5f",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: F,
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = SECONDARY_HOVER)}
          onMouseLeave={(e) => (e.currentTarget.style.background = SECONDARY_BG)}
        >
          상세보기
        </button>
      </div>
    </div>
  );
}

/* ─── 프로젝트 상세 모달 ───────────────────────── */
function ProjectDetailModal({ projectId, onClose }) {
  const [proj, setProj] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    projectsApi
      .detail(projectId)
      .then((p) => mounted && setProj(p))
      .catch((e) => mounted && setError(e?.response?.data?.message || e?.message || "불러오기 실패"))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [projectId]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(15, 23, 42, 0.55)",
        zIndex: 1000,
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        padding: "60px 20px",
        overflowY: "auto",
        fontFamily: F,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          borderRadius: 20,
          maxWidth: 760,
          width: "100%",
          padding: "32px 36px 28px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 18, right: 18,
            width: 34, height: 34, borderRadius: "50%",
            border: "none", background: "#F3F4F6", color: "#6B7280",
            fontSize: 20, cursor: "pointer",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#E5E7EB"; e.currentTarget.style.color = "#111827"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#F3F4F6"; e.currentTarget.style.color = "#6B7280"; }}
        >×</button>

        {loading && (
          <div style={{ padding: "60px 0", textAlign: "center", color: "#94A3B8", fontSize: 14 }}>
            불러오는 중…
          </div>
        )}
        {error && !loading && (
          <div style={{ padding: 24, color: "#B91C1C", fontSize: 13 }}>
            프로젝트 정보를 불러오지 못했습니다: {error}
          </div>
        )}

        {!loading && !error && proj && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{
                padding: "3px 10px", borderRadius: 999,
                background: "#DBEAFE", color: "#2563EB",
                fontSize: 11, fontWeight: 700,
              }}>
                {proj.status || "모집중"}
              </span>
              {proj.serviceField && (
                <span style={{ fontSize: 12, color: "#64748B" }}>{proj.serviceField}</span>
              )}
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1E293B", margin: "0 0 20px", lineHeight: 1.4 }}>
              {proj.title}
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
              <InfoBox label="예상 견적" value={proj.price || "협의"} />
              <InfoBox label="예상 기간" value={proj.period || "협의"} />
            </div>

            {proj.slogan && (
              <Section title="프로젝트 개요">
                <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: 0 }}>{proj.slogan}</p>
              </Section>
            )}

            {proj.desc && proj.desc !== proj.slogan && (
              <Section title="상세 내용">
                <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: 0, whiteSpace: "pre-line" }}>
                  {proj.desc}
                </p>
              </Section>
            )}

            {proj.tags && proj.tags.length > 0 && (
              <Section title="필요 기술 스택">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {proj.tags.map((t, i) => (
                    <span key={i} style={{
                      padding: "5px 12px", borderRadius: 999,
                      background: "#EFF6FF", color: "#2563EB",
                      fontSize: 12, fontWeight: 600,
                    }}>
                      {String(t).startsWith("#") ? t : `#${t}`}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            <Section title="모집 정보">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, fontSize: 13 }}>
                <FieldRow label="근무 형태" value={proj.workPref} />
                <FieldRow label="비용 유형" value={proj.priceType} />
                <FieldRow label="등급" value={proj.grade} />
                {proj.deadline && (
                  <FieldRow label="모집 마감" value={String(proj.deadline).slice(0, 10)} />
                )}
              </div>
            </Section>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 28 }}>
              <button
                onClick={onClose}
                style={{
                  padding: "10px 22px", borderRadius: 10,
                  border: "1px solid #E5E7EB", background: "white", color: "#374151",
                  fontSize: 13, fontWeight: 600, cursor: "pointer",
                }}
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoBox({ label, value }) {
  return (
    <div style={{
      padding: "16px 18px", borderRadius: 12,
      background: "#F8FAFC", border: "1px solid #E2E8F0",
    }}>
      <div style={{ fontSize: 12, color: "#64748B", marginBottom: 6, fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 800, color: "#1E293B" }}>{value}</div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{
        fontSize: 13, fontWeight: 800, color: "#1E293B",
        marginBottom: 10, paddingLeft: 10,
        borderLeft: "3px solid #3B82F6",
      }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function FieldRow({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 3, fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 13, color: "#1E293B", fontWeight: 600 }}>{value}</div>
    </div>
  );
}
