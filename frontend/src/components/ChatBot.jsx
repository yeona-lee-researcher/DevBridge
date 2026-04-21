import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Bell, ChevronLeft, Globe, Home, MessageCircle, Search, Send, Settings, X } from "lucide-react";
import heroDefaultImage from "../assets/hero_default.png";
import chatBotImage from "../assets/chatBot.png";
import { chatWithAI } from "../lib/aiClient";

const CHATBOT_SYSTEM_PROMPT = `너는 DevBridge 플랫폼의 AI 도우미 캐릭터 '행운이'야. 프리랜서 개발 프로젝트 상담(비용, 일정, 기술 스택, 매칭 등)을 도와줘. 친근한 한국어로, 핵심은 **굵게** 표시하고, 이모지도 적절히. 답변은 3~6줄 이내로 간결하게.`;

const F = "'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const PRIMARY_GRAD = "linear-gradient(135deg, #bae6fd 0%, #7dd3fc 48%, #c4b5fd 100%)";
const PRIMARY_GRAD_HOVER = "linear-gradient(135deg, #7dd3fc 0%, #60a5fa 48%, #a78bfa 100%)";

const LANG_LIST = [
  ["한국어", "Korean"],
  ["English", "English"],
  ["日本語", "Japanese"],
  ["العربية", "Arabic"],
  ["Català", "Catalan"],
  ["中文", "Chinese"],
  ["Français", "French"],
  ["Deutsch", "German"],
  ["Español", "Spanish"],
];

function KakaoIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#3C1E1E"
        d="M24 8c-9.94 0-18 6.27-18 14 0 5.02 3.2 9.4 8 11.9l-1.64 6.09c-.1.39.34.7.68.48l7.12-4.7c1.2.18 2.42.27 3.64.27 9.94 0 18-6.27 18-14S33.94 8 24 8z"
      />
    </svg>
  );
}

function Toggle({ on, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 50,
        height: 30,
        borderRadius: 999,
        border: "none",
        cursor: "pointer",
        background: on ? "#22C55E" : "#CBD5E1",
        position: "relative",
        transition: "all 0.2s ease",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 3,
          left: on ? 23 : 3,
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
          transition: "left 0.2s ease",
        }}
      />
    </button>
  );
}

export default function ChatBot() {
  const location = useLocation();
  const hiddenPages = ["/loading", "/login", "/signup"];
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [showLangSheet, setShowLangSheet] = useState(false);
  const [translateOn, setTranslateOn] = useState(true);
  const [notiOn, setNotiOn] = useState(true);
  const [currentLang, setCurrentLang] = useState("한국어");
  const [ctaHover, setCtaHover] = useState(false);
  const [newCtaHover, setNewCtaHover] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [sendPressed, setSendPressed] = useState(false);

  const initialMessages = [
    {
      id: 1,
      name: "행운이",
      time: "방금",
      text: "궁금한 내용이 있다면 아래 버튼을 클릭해 주세요.\n자주 묻는 질문들을 모아두었어요.",
    },
    {
      id: 2,
      name: "행운이",
      time: "1분 전",
      text: "[품: 문제 이름 또는 링크]",
    },
    {
      id: 3,
      name: "행운이",
      time: "2분 전",
      text: "DevBridge 프로젝트 상담 OPEN\n비용/일정/기술스택 고민을 빠르게 도와드릴게요.",
    },
  ];
  const [chatThreads, setChatThreads] = useState(initialMessages);
  const [detailMessages, setDetailMessages] = useState([]);

  if (hiddenPages.includes(location.pathname)) return null;

  const openChatDetail = (msg) => {
    setSelectedChat(msg);
    setDetailMessages([
      { role: "bot", text: msg.text },
      { role: "assistant", text: "네, 문의 내용 전달해주시면 행운이가 바로 도와드릴게요." },
    ]);
    setChatInput("");
  };

  const sendMessage = async () => {
    const text = chatInput.trim();
    if (!text) return;
    setSendPressed(true);
    setTimeout(() => setSendPressed(false), 170);

    const userMsg = { role: "user", text };
    const nextMessages = [...detailMessages, userMsg];
    setDetailMessages(nextMessages);
    setChatInput("");

    try {
      // assistant/bot 의 인트로 메시지는 시스템 프롬프트가 대신하므로 제외
      const history = nextMessages
        .filter((m) => m.role === "user" || m.role === "bot")
        .map((m) => ({ role: m.role === "user" ? "user" : "bot", text: m.text }));
      const reply = await chatWithAI(history, CHATBOT_SYSTEM_PROMPT);
      // 챗봇은 마크다운 렌더를 안 하므로 ** 굵게 마커 제거 (가독성)
      const cleaned = (reply || "").replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1");
      setDetailMessages((prev) => [...prev, { role: "bot", text: cleaned }]);
    } catch (err) {
      console.error("[ChatBot] AI 호출 실패:", err);
      setDetailMessages((prev) => [
        ...prev,
        { role: "bot", text: `죄송해요, 응답 중 오류가 발생했어요 🙇 (${err.message})` },
      ]);
    }
  };

  const handleHomeInquiry = () => {
    const nextId = (chatThreads.at(-1)?.id || 0) + 1;
    const newThread = {
      id: nextId,
      name: "행운이",
      time: "방금",
      text: "새 문의가 시작되었습니다.\n문의 내용을 입력해 주세요.",
    };
    setChatThreads((prev) => [...prev, newThread]);
    setActiveTab("chat");
    openChatDetail(newThread);
  };

  return (
    <>
      {!open && (
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            width: 78,
            height: 78,
            zIndex: 9999,
          }}
        >
          {isHovered && (
            <div
              style={{
                position: "absolute",
                right: 0,
                bottom: 102,
                background: "#E0F2FE",
                color: "#0369A1",
                border: "1px solid #BAE6FD",
                borderRadius: 14,
                fontSize: 13,
                fontWeight: 600,
                padding: "10px 14px",
                whiteSpace: "nowrap",
                fontFamily: F,
                boxShadow: "0 10px 26px rgba(14,165,233,0.18)",
              }}
            >
              도움이 필요하신가요? 불러주세요😊
            </div>
          )}
          <button
            onClick={() => {
              setOpen(true);
              setActiveTab("home");
              setSelectedChat(null);
            }}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              borderRadius: "50%",
              background: "transparent",
              cursor: "pointer",
              padding: 0,
              position: "relative",
            }}
          >
            <img
              src={chatBotImage}
              alt="행운이 챗봇"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
                boxShadow: "0 10px 24px rgba(59,130,246,0.28)",
              }}
            />
          </button>
        </div>
      )}

      {open && (
        <div
          style={{
            position: "fixed",
            right: 16,
            bottom: 16,
            width: "min(390px, calc(100vw - 24px))",
            height: "min(740px, calc(100vh - 24px))",
            background: "#F3F4F6",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 20px 48px rgba(2,6,23,0.28)",
            zIndex: 10000,
            display: "flex",
            flexDirection: "column",
            fontFamily: F,
          }}
        >
          {activeTab === "home" && (
            <div style={{ flex: 1, minHeight: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  position: "relative",
                  padding: "20px 18px 16px",
                  background: "linear-gradient(145deg, #cde7ff 0%, #dbeafe 52%, #eef2ff 100%)",
                }}
              >
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: "none",
                    background: "rgba(15,23,42,0.22)",
                    color: "#fff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <X size={22} />
                </button>
                <div style={{ fontSize: 26, fontWeight: 900, marginTop: 70, lineHeight: 1.15, color: "#111827" }}>
                  DevBridge | 행운이🤞
                </div>
              </div>

              <div style={{ padding: 14, overflowY: "auto", flex: 1 }}>
                <div style={{ background: "#fff", borderRadius: 24, padding: "16px 14px", marginBottom: 14 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <img src={heroDefaultImage} alt="행운이" style={{ width: 62, height: 62, borderRadius: "50%" }} />
                    <div>
                      <div style={{ fontSize: 24, fontWeight: 800, color: "#171717", lineHeight: 1.1 }}>행운이</div>
                      <div style={{ fontSize: 18, color: "#1f2937", lineHeight: 1.35, marginTop: 4 }}>
                        안녕하세요!😊
                        <br />
                        궁금한 내용이 있으신가요?
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleHomeInquiry}
                    onMouseEnter={() => setCtaHover(true)}
                    onMouseLeave={() => setCtaHover(false)}
                    style={{
                      marginTop: 14,
                      display: "block",
                      width: 244,
                      marginLeft: "auto",
                      marginRight: "auto",
                      border: "none",
                      borderRadius: 24,
                      padding: "11px 0",
                      fontSize: 16,
                      fontWeight: 800,
                      color: "#0F172A",
                      background: ctaHover ? PRIMARY_GRAD_HOVER : PRIMARY_GRAD,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      boxShadow: ctaHover
                        ? "0 10px 24px rgba(99,102,241,0.35)"
                        : "0 6px 16px rgba(59,130,246,0.25)",
                    }}
                  >
                    문의하기 ➤
                  </button>
                </div>

                <div
                  style={{
                    background: "#fff",
                    borderRadius: 24,
                    padding: "16px 18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: 16, fontWeight: 600, color: "#9CA3AF" }}>다른 방법으로 문의</span>
                  <span
                    onClick={() => window.open("https://pf.kakao.com/_xDEVBRIDGE", "_blank")}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#FEE500",
                      cursor: "pointer",
                    }}
                  >
                    <KakaoIcon size={24} />
                  </span>
                </div>

                <div style={{ background: "#F9FAFB", borderRadius: 14, padding: "12px 16px", marginTop: 10 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 4 }}>
                    📞 02-1234-5678
                  </div>
                  <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.7 }}>
                    평일 09:00 ~ 18:00<br />
                    토·일·공휴일 휴무
                  </div>
                </div>

                <div style={{ textAlign: "center", marginTop: 18, color: "#A3A3A3", fontWeight: 700, fontSize: 14 }}>
                  ⓒ 채널톡 이용중
                </div>
              </div>
            </div>
          )}

          {activeTab === "chat" && (
            <div style={{ flex: 1, minHeight: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ padding: "18px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {selectedChat && (
                    <button
                      onClick={() => setSelectedChat(null)}
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        border: "none",
                        background: "#E5E7EB",
                        color: "#71717A",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ChevronLeft size={20} />
                    </button>
                  )}
                  <h3 style={{ fontSize: 26, margin: 0, fontWeight: 900, color: "#111827" }}>{selectedChat ? "대화" : "대화"}</h3>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  style={{ width: 36, height: 36, borderRadius: "50%", border: "none", background: "#E5E7EB", color: "#71717A", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <X size={22} />
                </button>
              </div>

              <div style={{ padding: "0 14px", overflowY: "auto", flex: 1, minHeight: 0 }}>
                {!selectedChat && chatThreads.map((msg, idx) => (
                  <button
                    key={`${msg.id}-${idx}`}
                    onClick={() => openChatDetail(msg)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#FFFFFF";
                      e.currentTarget.style.borderColor = "#CBD5E1";
                      e.currentTarget.style.boxShadow = "0 8px 18px rgba(15,23,42,0.10)";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#FFFFFF";
                      e.currentTarget.style.borderColor = "#E5E7EB";
                      e.currentTarget.style.boxShadow = "0 2px 8px rgba(15,23,42,0.05)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                    style={{
                      width: "100%",
                      border: "1px solid #E5E7EB",
                      background: "#FFFFFF",
                      borderRadius: 16,
                      textAlign: "left",
                      padding: "12px 12px",
                      display: "flex",
                      gap: 12,
                      marginBottom: 8,
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(15,23,42,0.05)",
                      transition: "all 0.18s ease",
                    }}
                  >
                    <img src={heroDefaultImage} alt="행운이" style={{ width: 58, height: 58, borderRadius: "50%", flexShrink: 0 }} />
                    <div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                        <span style={{ fontSize: 18, fontWeight: 800, color: "#18181B" }}>행운이</span>
                        <span style={{ fontSize: 14, color: "#9CA3AF" }}>{msg.time}</span>
                      </div>
                      <div style={{ fontSize: 15, color: "#27272A", lineHeight: 1.35, whiteSpace: "pre-line" }}>{msg.text}</div>
                    </div>
                  </button>
                ))}

                {selectedChat && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 8 }}>
                    {detailMessages.map((m, i) => (
                      <div key={`${m.role}-${i}`} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                        {m.role === "bot" && (
                          <img src={heroDefaultImage} alt="행운이" style={{ width: 48, height: 48, borderRadius: "50%", flexShrink: 0, marginRight: 10 }} />
                        )}
                        <div
                          style={{
                            background: m.role === "user" ? "#E9F2FF" : m.role === "assistant" ? "#DBEAFE" : "#FFFFFF",
                            borderRadius: 14,
                            padding: "10px 12px",
                            color: m.role === "assistant" ? "#1E3A8A" : "#1F2937",
                            fontSize: 14,
                            lineHeight: 1.45,
                            maxWidth: "84%",
                            boxShadow: m.role === "bot" ? "0 1px 6px rgba(15,23,42,0.08)" : "none",
                            whiteSpace: "pre-line",
                          }}
                        >
                          {m.text}
                        </div>
                        {m.role === "user" && (
                          <img src={heroDefaultImage} alt="내 프로필" style={{ width: 40, height: 40, borderRadius: "50%", flexShrink: 0, marginLeft: 8, objectFit: "cover", border: "1px solid #BFDBFE" }} />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {selectedChat && (
                <div style={{ padding: "8px 14px 10px", borderTop: "1px solid #E5E7EB", background: "#F3F4F6" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          if (e.nativeEvent.isComposing) return;
                          sendMessage();
                        }
                      }}                      placeholder="메시지를 입력하세요"
                      style={{
                        flex: 1,
                        height: 46,
                        borderRadius: 14,
                        border: "1.5px solid #CBD5E1",
                        background: "#FFFFFF",
                        padding: "0 14px",
                        outline: "none",
                        fontSize: 14,
                        color: "#1F2937",
                      }}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!chatInput.trim()}
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        border: "none",
                        background: !chatInput.trim()
                          ? "#D1D5DB"
                          : sendPressed
                            ? "linear-gradient(135deg, #60A5FA 0%, #818CF8 52%, #8B5CF6 100%)"
                            : "linear-gradient(135deg, #BAE6FD 0%, #7DD3FC 52%, #C4B5FD 100%)",
                        color: "#FFFFFF",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: !chatInput.trim() ? "not-allowed" : "pointer",
                        transition: "all 0.15s ease",
                        boxShadow: !chatInput.trim()
                          ? "none"
                          : sendPressed
                            ? "0 6px 14px rgba(99,102,241,0.35)"
                            : "0 4px 12px rgba(125,211,252,0.30)",
                      }}
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              )}

              {!selectedChat && (
                <div style={{ padding: "10px 0 16px", display: "flex", justifyContent: "center" }}>
                  <button
                    onClick={handleHomeInquiry}
                    onMouseEnter={() => setNewCtaHover(true)}
                    onMouseLeave={() => setNewCtaHover(false)}
                    style={{
                      border: "none",
                      borderRadius: 24,
                      padding: "11px 30px",
                      fontSize: 16,
                      fontWeight: 800,
                      color: "#0F172A",
                      background: newCtaHover ? PRIMARY_GRAD_HOVER : PRIMARY_GRAD,
                      cursor: "pointer",
                      boxShadow: newCtaHover
                        ? "0 10px 24px rgba(99,102,241,0.35)"
                        : "0 6px 16px rgba(59,130,246,0.25)",
                    }}
                  >
                    새 문의하기 ➤
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "settings" && (
            <div style={{ flex: 1, minHeight: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ padding: "18px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h3 style={{ fontSize: 26, margin: 0, fontWeight: 900, color: "#111827" }}>설정</h3>
                <button
                  onClick={() => setOpen(false)}
                  style={{ width: 36, height: 36, borderRadius: "50%", border: "none", background: "#E5E7EB", color: "#71717A", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <X size={22} />
                </button>
              </div>

              <div style={{ padding: "8px 16px", overflowY: "auto", flex: 1 }}>
                <div style={{ textAlign: "center", padding: "4px 0 18px" }}>
                  <img src={heroDefaultImage} alt="행운이" style={{ width: 92, height: 92, borderRadius: 28, objectFit: "cover" }} />
                  <div style={{ marginTop: 10, fontSize: 28, fontWeight: 900, color: "#111827" }}>DevBridge | 행운이🤞</div>
                  <div style={{ marginTop: 6, fontSize: 16, color: "#9CA3AF" }}>https://devbridge.kr</div>
                </div>

                <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: 16 }}>
                  <div style={{ fontSize: 18, color: "#A3A3A3", fontWeight: 700, marginBottom: 16 }}>상담 환경</div>

                  <button
                    onClick={() => setShowLangSheet(true)}
                    style={{
                      width: "100%",
                      border: "none",
                      background: "transparent",
                      padding: "10px 4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 18, color: "#18181B" }}>
                      <Globe size={24} color="#737373" /> 언어
                    </span>
                    <span style={{ fontSize: 18, color: "#737373" }}>{currentLang} &gt;</span>
                  </button>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 4px" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 18, color: "#18181B" }}>
                      <MessageCircle size={24} color="#737373" /> 메시지 번역 표시
                    </span>
                    <Toggle on={translateOn} onClick={() => setTranslateOn((p) => !p)} />
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 4px" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 18, color: "#18181B" }}>
                      <Bell size={24} color="#737373" /> 알림음
                    </span>
                    <Toggle on={notiOn} onClick={() => setNotiOn((p) => !p)} />
                  </div>
                </div>

                <div style={{ marginTop: 12, textAlign: "right", color: "#A3A3A3", fontSize: 14 }}>v17.1.1</div>
              </div>
            </div>
          )}

          <div
            style={{
              borderTop: "1px solid #E5E7EB",
              background: "#fff",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              padding: "9px 6px 10px",
              gap: 2,
              flexShrink: 0,
            }}
          >
            {[
              { key: "home", label: "홈", icon: Home },
              { key: "chat", label: "대화", icon: MessageCircle },
              { key: "settings", label: "설정", icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key);
                    if (tab.key !== "chat") setSelectedChat(null);
                  }}
                  style={{
                    border: "none",
                    background: "transparent",
                    padding: "8px 0 2px",
                    cursor: "pointer",
                    color: active ? "#1E293B" : "#A1A1AA",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 16,
                    fontWeight: active ? 800 : 600,
                  }}
                >
                  <Icon size={26} strokeWidth={active ? 2.5 : 2.2} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {showLangSheet && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(15,23,42,0.24)",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "78%",
                  background: "#fff",
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 18px 10px" }}>
                  <h4 style={{ margin: 0, fontSize: 28, fontWeight: 900, color: "#111827" }}>언어</h4>
                  <button
                    onClick={() => setShowLangSheet(false)}
                    style={{ width: 40, height: 40, borderRadius: "50%", border: "none", background: "#E5E7EB", color: "#71717A", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <X size={24} />
                  </button>
                </div>

                <div style={{ padding: "0 12px 12px" }}>
                  <div style={{ height: 50, borderRadius: 12, background: "#F3F4F6", display: "flex", alignItems: "center", padding: "0 14px", color: "#A3A3A3", fontSize: 18 }}>
                    <Search size={20} color="#A3A3A3" style={{ marginRight: 10 }} /> 검색어를 입력해주세요
                  </div>
                </div>

                <div style={{ overflowY: "auto", padding: "0 14px 18px" }}>
                  <div style={{ fontSize: 16, color: "#9CA3AF", fontWeight: 700, marginBottom: 10 }}>모든 번역 지원</div>
                  {LANG_LIST.map(([name, en], idx) => {
                    const selected = name === currentLang;
                    return (
                      <button
                        key={`${name}-${idx}`}
                        onClick={() => {
                          setCurrentLang(name);
                          setShowLangSheet(false);
                        }}
                        style={{
                          width: "100%",
                          border: "none",
                          background: "transparent",
                          textAlign: "left",
                          padding: "10px 0",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <span style={{ fontSize: 17, color: "#1F2937" }}>
                          {name} <span style={{ color: "#A3A3A3" }}>· {en}</span>
                        </span>
                        {selected && <span style={{ fontSize: 24, color: "#111827" }}>✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
