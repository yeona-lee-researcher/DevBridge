/**
 * 진행 프로젝트 대시보드 통합 API.
 * 백엔드: ProgressDashboardController (/api/projects/{pid}/**)
 */
import api from './axios';

export const dashboardApi = {
  fetch: (projectId) =>
    api.get(`/projects/${projectId}/dashboard`).then((r) => r.data),
};

export const milestonesApi = {
  list: (projectId) =>
    api.get(`/projects/${projectId}/milestones`).then((r) => r.data),
  create: (projectId, payload) =>
    api.post(`/projects/${projectId}/milestones`, payload).then((r) => r.data),
  submit: (projectId, milestoneId, payload) =>
    api.post(`/projects/${projectId}/milestones/${milestoneId}/submit`, payload).then((r) => r.data),
  approve: (projectId, milestoneId) =>
    api.post(`/projects/${projectId}/milestones/${milestoneId}/approve`).then((r) => r.data),
  requestRevision: (projectId, milestoneId, reason) =>
    api.post(`/projects/${projectId}/milestones/${milestoneId}/request-revision`, { reason }).then((r) => r.data),
  cancelRevision: (projectId, milestoneId) =>
    api.post(`/projects/${projectId}/milestones/${milestoneId}/cancel-revision`).then((r) => r.data),
};

export const escrowsApi = {
  list: (projectId) =>
    api.get(`/projects/${projectId}/escrows`).then((r) => r.data),
  create: (projectId, payload) =>
    api.post(`/projects/${projectId}/escrows`, payload).then((r) => r.data),
  payMock: (projectId, escrowId, payload) =>
    api.post(`/projects/${projectId}/escrows/${escrowId}/pay-mock`, payload).then((r) => r.data),
};

export const projectAttachmentsApi = {
  list: (projectId) =>
    api.get(`/projects/${projectId}/attachments`).then((r) => r.data),
  create: (projectId, payload) =>
    api.post(`/projects/${projectId}/attachments`, payload).then((r) => r.data),
  remove: (projectId, attachmentId) =>
    api.delete(`/projects/${projectId}/attachments/${attachmentId}`).then((r) => r.data),
};

export const meetingApi = {
  get: (projectId) =>
    api.get(`/projects/${projectId}/meeting`).then((r) => r.data),
  upsert: (projectId, payload) =>
    api.put(`/projects/${projectId}/meeting`, payload).then((r) => r.data),
};
