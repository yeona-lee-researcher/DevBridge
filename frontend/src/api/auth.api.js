/**
 * 인증 관련 API.
 * - 백엔드: AuthController (/api/auth/**)
 */
import api from './axios';

export const authApi = {
  /**
   * 회원가입
   * @param {object} payload SignupRequest 형식
   * @returns {Promise<{email, username, userType, message}>}
   */
  signup: (payload) => api.post('/auth/signup', payload).then((r) => r.data),

  /**
   * 로그인
   * @param {{email: string, password: string}} payload
   */
  login: (payload) => api.post('/auth/login', payload).then((r) => r.data),

  /**
   * 소셜 로그인 (구글 등). OAuth 제공자에서 검증한 이메일을 BE 로 전달하여 JWT 발급.
   * 미가입 이메일은 400 응답 → 호출부에서 회원가입 안내.
   * @param {{email: string, provider?: string}} payload
   */
  socialLogin: (payload) => api.post('/auth/social-login', payload).then((r) => r.data),
};

