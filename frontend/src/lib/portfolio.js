export function normalizeSourceKey(rawKey, fallbackProjectId) {
  if (rawKey) return String(rawKey);
  if (fallbackProjectId != null) return `project-${fallbackProjectId}`;
  return `free-${Date.now()}`;
}

export function toPortfolioEditorSeed(project, overrides = {}) {
  const sourceProjectId = project?.sourceProjectId ?? project?.projectId ?? project?.id ?? null;
  const sourceKey = normalizeSourceKey(project?.sourceKey, sourceProjectId);

  return {
    id: sourceKey,
    sourceKey,
    sourceProjectId,
    group: project?.group || "완료",
    badge: project?.badge || (project?.isAdded ? "포트폴리오 등록" : "프로젝트"),
    badgeBg: project?.badgeBg || "#EFF6FF",
    badgeColor: project?.badgeColor || "#3B82F6",
    title: project?.title || project?.slogan || "제목 없음",
    desc: project?.desc || project?.workContent || project?.vision || "설명이 아직 없습니다.",
    tags: Array.isArray(project?.tags)
      ? project.tags
      : Array.isArray(project?.techTags)
      ? project.techTags.map((tag) => (String(tag).startsWith("#") ? String(tag) : `#${tag}`))
      : [],
    period: project?.period || "협의",
    endDate: project?.endDate || project?.deadline || null,
    added: project?.isAdded ?? true,
    ...overrides,
  };
}

export function toPortfolioRequest(item) {
  return {
    sourceKey: item.sourceKey,
    sourceProjectId: item.sourceProjectId ?? null,
    title: item.title || "",
    period: item.period || "",
    role: item.role || "",
    thumbnailUrl: item.thumbnailUrl || item.thumbnailPreview || "",
    workContent: item.workContent || "",
    vision: item.vision || "",
    coreFeatures: Array.isArray(item.coreFeatures) ? item.coreFeatures : [],
    technicalChallenge: item.technicalChallenge || "",
    solution: item.solution || "",
    techTags: Array.isArray(item.techTags)
      ? item.techTags
      : Array.isArray(item.tags)
      ? item.tags.map((tag) => String(tag).replace(/^#/, ""))
      : [],
    githubUrl: item.githubUrl || "",
    liveUrl: item.liveUrl || "",
    videoUrl: item.videoUrl || "",
    sections: item.sections || {},
    isAdded: item.isAdded ?? item.added ?? true,
    isPublic: item.isPublic ?? true,
  };
}

export function toPortfolioCard(item, index = 0) {
  const fallbackColors = ["#F97316", "#3B82F6", "#10B981", "#6366F1"];
  return {
    id: item.id || item.sourceKey,
    title: item.title || "제목 없음",
    titleColor: fallbackColors[index % fallbackColors.length],
    company: item.role || "",
    desc: item.workContent || item.vision || "포트폴리오 설명이 아직 없습니다.",
    tags: Array.isArray(item.techTags) ? item.techTags : [],
  };
}