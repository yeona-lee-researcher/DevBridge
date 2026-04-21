/**
 * 파트너 관련 API.
 * - 백엔드: PartnerController (/api/partners/**)
 */
import api from './axios';

// 로딩 속도 위해 표시 개수 제한 (DB는 그대로 1000개 유지). 복원하려면 SAMPLE_SIZE를 늘리거나 slice 제거.
const SAMPLE_SIZE = 500;

export const partnersApi = {
  /** 파트너 전체 목록 (PartnerSummaryResponse[]) — 프론트 표시는 SAMPLE_SIZE개로 제한 (신규 우선) */
  list: () => api.get('/partners').then((r) => [...r.data].sort((a, b) => b.id - a.id).slice(0, SAMPLE_SIZE)),

  /** 파트너 상세 */
  detail: (id) => api.get(`/partners/${id}`).then((r) => r.data),
};

