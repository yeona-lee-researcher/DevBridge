INSERT INTO projects (
  user_id, project_type, title, slogan, slogan_sub, `desc`,
  service_field, visibility,
  budget_amount, is_partner_free,
  start_date_negotiable, start_date, duration_months, schedule_negotiable,
  detail_content,
  meeting_type, meeting_freq, meeting_tools,
  deadline, gov_support, status,
  outsource_project_type, ready_status,
  questions,
  created_at, updated_at
) VALUES (
  3044, 'OUTSOURCE',
  'AI 회의 요약 & 액션 아이템 자동 생성 플랫폼',
  'AI가 회의를 정리합니다',
  '회의 음성/텍스트 → 요약·결정사항·Action Item 자동 생성',
  'AI 기반으로 회의 음성/텍스트를 분석하여 회의 요약, 결정사항, Action Item을 자동으로 생성하는 웹서비스입니다.',
  'AI/NLP', 'APPLICANTS',
  50000000, 0,
  0, '2026-05-01', 4, 0,
  '## 서비스 개요\nAI 기반 회의 음성/텍스트를 분석하여 회의 요약, 결정사항, Action Item을 자동으로 생성하는 웹서비스를 신규 구축합니다. 스타트업 및 소규모 IT 팀의 회의록 작성 및 액션 아이템 추적 효율성을 극대화하는 것을 목표로 합니다.\n\n## 주요 기능\n- 회의 음성 녹음 또는 파일 업로드 및 텍스트 자동 변환\n- 회의 전체 요약 / 핵심 결정사항 / Action Item 자동 추출\n- 담당자 / 마감일 / 우선순위 자동 분류\n- 회의록 템플릿 자동 생성 및 회의별 프로젝트/팀 단위 관리\n- 키워드 검색 및 회의 히스토리 조회\n- Slack 채널로 요약본 자동 공유 / Notion 페이지로 회의록 자동 저장\n- 카카오·구글 소셜 로그인 / 관리자 페이지\n\n## 대상 사용자\n스타트업 팀, 소규모 IT 팀, 프로젝트 매니저, 기획자, 개발팀, 원격 협업 팀. 예상 DAU 500 이하, MAU 5,000 수준.\n\n## 외부 연동\n- **음성 인식**: OpenAI Whisper API 또는 whisper.cpp\n- **AI 분석 (요약·할일 추출·결정사항 분류)**: OpenAI API\n- **협업 툴 연동**: Slack API (요약 공유, 알림), Notion API (회의록 저장)\n- **파일 저장**: AWS S3 (음성 파일)\n- **사용자 인증**: Google/Kakao OAuth (소셜 로그인)\n\n## 설계 고려사항\nAI 처리 흐름: 음성 파일 업로드 → 텍스트 변환 → AI 분석 (회의 제목, 참석자, 핵심 요약, 주요 논의 내용, 결정사항, Action Item, 담당자, 마감일, 리스크 등 구조화) → Slack/Notion 공유. 디자인은 SaaS 대시보드 스타일로 깔끔하고 직관적인 B2B 분위기. Notion / Linear / Slack 느낌으로 카드형 UI, 모바일 반응형 지원.\n\n## 협업 방식\n온라인 화상 미팅 주 1회 (Slack, Notion, Google Meet). 주간 스프린트 방식, Notion에 요구사항/회의록 정리, GitHub로 코드 관리.\n\n## 자격 요건\n- 경력 2년 이상, 포트폴리오 필수\n- React 또는 Node.js 실무 경험\n- OpenAI API 또는 LLM API 연동 경험 우대\n- 음성 인식 / NLP / 텍스트 요약 프로젝트 경험 우대\n- Slack API 또는 Notion API 연동 경험 우대\n- SaaS 대시보드 UI 경험 우대',
  'ONLINE', 'WEEKLY', '[\"Slack\",\"Notion\",\"Google Meet\"]',
  '2026-05-11', 0, 'RECRUITING',
  'NEW', 'IDEA',
  '[\"음성 인식 결과에 오타나 누락이 있을 때, 요약 품질을 어떻게 보완하시나요?\",\"회의록에서 단순 논의 내용과 실제 Action Item을 구분하기 위한 설계 경험이 있으신가요?\",\"4개월 안에 MVP를 완성해야 한다면, 어떤 기능을 1순위로 두고 개발하시겠습니까?\"]',
  NOW(), NOW()
);
SET @pid = LAST_INSERT_ID();
INSERT INTO project_tags (project_id, tag) VALUES
  (@pid,'#React'),(@pid,'#Node.js'),(@pid,'#Express'),(@pid,'#PostgreSQL'),
  (@pid,'#OpenAI API'),(@pid,'#AWS S3'),(@pid,'#Slack API'),(@pid,'#Notion API'),(@pid,'#Whisper API');
INSERT INTO project_skill_mapping (project_id, skill_id, is_required) VALUES
  (@pid,1,1),(@pid,10,1),(@pid,11,1),(@pid,26,1),
  (@pid,69,1),(@pid,71,1),(@pid,73,1),(@pid,74,1);
SELECT @pid as new_project_id;