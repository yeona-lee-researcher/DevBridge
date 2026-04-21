/**
 * 글로벌 axios 인스턴스.
 * - baseURL: '/api'  → vite.config.js의 proxy로 http://localhost:8080 으로 전달.
 * - timeout: AI 매칭처럼 응답이 긴 요청을 위해 30초로 확장.
 * - 토큰 인터셉터 자리(현재 no-op). Phase 7 (JWT 도입)에서 활성화.
 */
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Request 인터셉터: 토큰 자리 ---
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 401 발생해도 자동 redirect 시키지 않을 URL 패턴.
// 사용자 액션 중(폼 제출 등)에 강제 redirect 되면 입력 내용이 사라지므로 호출부가 처리하게 함.
const SILENT_401_PATTERNS = [
  /\/bank\//,            // 계좌 인증 전체 (send-code, verify-code, account)
  /\/interests(\/|\?|$)/,
];

// --- Response 인터셉터: 공통 에러 처리 ---
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const reqUrl = error.config?.url || '';
      const silent = SILENT_401_PATTERNS.some(re => re.test(reqUrl));
      if (silent) {
        // 조용히 실패 — 호출부가 .catch 로 처리
        return Promise.reject(error);
      }
      console.warn('[api] 401 Unauthorized - 토큰 만료/무효, 로그인 페이지로 이동');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('dbId');     // 백엔드 User PK (숫자)
      localStorage.removeItem('userId');   // 구 키 정리 (마이그레이션)
      localStorage.removeItem('userType');
      // Zustand persist 상태도 같이 날려서 "토큰 없는데 로그인된 척" 상태 방지
      try {
        const raw = localStorage.getItem('devbridge-storage');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed?.state) {
            parsed.state.loginUser = null;
            parsed.state.loginType = null;
            parsed.state.userRole = null;
            localStorage.setItem('devbridge-storage', JSON.stringify(parsed));
          }
        }
      } catch { /* ignore */ }
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
        window.location.assign('/login');
      }
    }
    return Promise.reject(error);
  }
);

export default api;

