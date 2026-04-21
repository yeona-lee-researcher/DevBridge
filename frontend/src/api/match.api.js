/**
 * AI 매칭 점수 API.
 * - 백엔드: MatchController (/api/match/**)
 * - 사용 흐름: 프론트에서 1차 필터링한 후보 id 배열 + 자연어 query를 전송하면
 *   [{ id, matchScore, reasons[] }] 배열을 반환.
 */
import api from './axios';

export const matchApi = {
  /**
   * 파트너 매칭 점수.
   * @param {string} query
   * @param {number[]} candidateIds
   */
  partners: (query, candidateIds) =>
    api.post('/match/partners', { query, candidateIds }).then((r) => r.data),

  /** 클라이언트 매칭 점수. */
  clients: (query, candidateIds) =>
    api.post('/match/clients', { query, candidateIds }).then((r) => r.data),

  /** 프로젝트 매칭 점수. */
  projects: (query, candidateIds) =>
    api.post('/match/projects', { query, candidateIds }).then((r) => r.data),
};
