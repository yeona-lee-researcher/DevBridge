package com.DevBridge.devbridge.service;

import com.DevBridge.devbridge.entity.Project;
import com.DevBridge.devbridge.entity.ProjectMilestone;
import com.DevBridge.devbridge.entity.ProjectModule;
import com.DevBridge.devbridge.repository.ProjectMilestoneRepository;
import com.DevBridge.devbridge.repository.ProjectModuleRepository;
import com.DevBridge.devbridge.repository.ProjectRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 7개 협의 모듈(scope/deliverable/schedule/payment/...)이 모두 협의완료된 상태에서
 * 마일스톤을 자동 생성하는 단일 책임 서비스.
 * 멱등: 마일스톤이 1건이라도 존재하면 skip.
 *
 *  - schedule.phases[]            → 마일스톤 1:1 (제목/설명/날짜)
 *  - payment.stages[*].amount     → 금액 분배 (개수가 일치하지 않으면 비율/균등)
 *  - deliverable.deliverables[]   → 모든 마일스톤의 completion_criteria
 *  - payment.total / project.budgetAmount(만원) → 총액 fallback
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class MilestoneSeedingService {

    private final ProjectMilestoneRepository projectMilestoneRepository;
    private final ProjectModuleRepository projectModuleRepository;
    private final ProjectRepository projectRepository;
    private final ContractModuleSeeder contractModuleSeeder;
    private final ObjectMapper om = new ObjectMapper();

    @Transactional
    public int seedIfNeeded(Long projectId) {
        if (projectId == null) return 0;

        Project project = projectRepository.findById(projectId).orElse(null);
        if (project == null) return 0;

        // 1) payment 모듈에 단위 오해석 버그(budgetAmount 만원→원 미변환)로 저장된 데이터가 있으면 자동 보정.
        //    보정되면 마일스톤도 잘못된 금액으로 시드되어 있으므로 함께 삭제 → 아래 재시드로 복구.
        boolean repaired = false;
        try { repaired = contractModuleSeeder.repairPaymentIfStale(project); }
        catch (Exception e) { /* 보정 실패는 시드 진행 막지 않음 */ }
        if (repaired) {
            List<ProjectMilestone> existing = projectMilestoneRepository.findByProjectIdOrderBySeqAsc(projectId);
            if (!existing.isEmpty()) projectMilestoneRepository.deleteAll(existing);
        }

        // 2) 기존 마일스톤이 모두 과거 (D+ 표시 원인) + 진척 없음 → 오늘 기준으로 일괄 시프트.
        try { rebaseStaleMilestones(projectId); } catch (Exception ignore) {}

        if (!projectMilestoneRepository.findByProjectIdOrderBySeqAsc(projectId).isEmpty()) return 0;

        List<ProjectModule> modules = projectModuleRepository.findByProjectId(projectId);
        if (modules.size() < 7) return 0;
        long agreed = modules.stream().filter(m -> "협의완료".equals(m.getStatus())).count();
        if (agreed < 7) return 0;

        return seedFromModules(project, modules);
    }

    @Transactional
    public int seedFromModules(Project project, List<ProjectModule> modules) {
        if (project == null || project.getId() == null) return 0;
        Long projectId = project.getId();
        if (!projectMilestoneRepository.findByProjectIdOrderBySeqAsc(projectId).isEmpty()) return 0;

        Map<String, ProjectModule> byKey = new HashMap<>();
        for (ProjectModule m : modules) byKey.put(m.getModuleKey(), m);

        ProjectModule scheduleMod = byKey.get("schedule");
        if (scheduleMod == null || scheduleMod.getData() == null) {
            log.warn("[seedMilestones] schedule 모듈 없음 projectId={}", projectId);
            return 0;
        }
        JsonNode schedule = readJson(scheduleMod.getData());
        JsonNode phases = schedule != null ? schedule.path("phases") : null;
        if (phases == null || !phases.isArray() || phases.size() == 0) {
            log.warn("[seedMilestones] phases 비어있음 projectId={}", projectId);
            return 0;
        }

        long totalWon = computeTotalBudgetWon(byKey.get("payment"), project);
        JsonNode payment = byKey.get("payment") != null ? readJson(byKey.get("payment").getData()) : null;
        long[] amounts = distributeAmounts(totalWon, phases.size(), payment);

        String deliverableText = buildDeliverableText(byKey.get("deliverable"));

        LocalDate scheduleStart = parseDate(schedule.path("startDate").asText(null));
        if (scheduleStart == null) {
            scheduleStart = project.getStartDate() != null ? project.getStartDate() : LocalDate.now();
        }
        // 시드 데이터가 오래되어 scheduleStart 가 이미 과거 (D+ 표시 원인) 이면 오늘로 앵커링.
        // → 마일스톤 endDate 도 phase.date - scheduleStart 차이만큼 미래로 시프트.
        LocalDate today = LocalDate.now();
        long shiftDays = 0L;
        if (scheduleStart.isBefore(today.minusDays(7))) {
            shiftDays = java.time.temporal.ChronoUnit.DAYS.between(scheduleStart, today);
            scheduleStart = today;
        }

        LocalDate prevEnd = scheduleStart;
        int seq = 1;
        for (JsonNode ph : phases) {
            String num = ph.path("num").asText("");
            String title = ph.path("title").asText("");
            if (title.isBlank()) title = num.isBlank() ? "마일스톤 " + seq : num;
            String desc = ph.path("desc").asText("");
            LocalDate end = parseDate(ph.path("date").asText(null));
            if (end == null) end = prevEnd.plusWeeks(2);
            else if (shiftDays > 0) end = end.plusDays(shiftDays);
            LocalDate start = (seq == 1) ? scheduleStart : prevEnd;

            ProjectMilestone m = ProjectMilestone.builder()
                    .projectId(projectId)
                    .seq(seq)
                    .title(num.isBlank() ? title : (num + " " + title))
                    .description(desc.isBlank() ? null : desc)
                    .completionCriteria(deliverableText)
                    .amount(amounts[seq - 1])
                    .startDate(start)
                    .endDate(end)
                    .status(ProjectMilestone.MilestoneStatus.PENDING)
                    .build();
            projectMilestoneRepository.save(m);

            prevEnd = end;
            seq++;
        }
        log.info("[seedMilestones] {} 개 마일스톤 자동 생성 projectId={}", phases.size(), projectId);
        return phases.size();
    }

    private JsonNode readJson(String json) {
        if (json == null || json.isBlank()) return null;
        try { return om.readTree(json); } catch (Exception e) { return null; }
    }

    private long computeTotalBudgetWon(ProjectModule paymentModule, Project p) {
        if (paymentModule != null) {
            JsonNode root = readJson(paymentModule.getData());
            if (root != null) {
                long parsed = parseWonAmount(root.path("total").asText(""));
                if (parsed > 0) return parsed;
            }
        }
        if (p.getBudgetAmount() != null && p.getBudgetAmount() > 0) {
            return (long) p.getBudgetAmount() * 10_000L;
        }
        return 10_000_000L;
    }

    private long parseWonAmount(String s) {
        if (s == null) return 0L;
        String digits = s.replaceAll("[^0-9]", "");
        if (digits.isEmpty()) return 0L;
        try { return Long.parseLong(digits); } catch (NumberFormatException e) { return 0L; }
    }

    private long[] distributeAmounts(long totalWon, int phaseCount, JsonNode payment) {
        long[] out = new long[phaseCount];
        // stages 와 phase 수가 정확히 일치할 때만 stage 금액 1:1 매핑.
        // 그 외(개수 불일치)에는 phase 균등 분배. (예: 4 phase × 3 stages 의 잘못된 비율 매핑 회피)
        if (payment != null) {
            JsonNode stages = payment.path("stages");
            if (stages.isArray() && stages.size() == phaseCount) {
                long sum = 0;
                for (int i = 0; i < phaseCount; i++) {
                    out[i] = parseWonAmount(stages.get(i).path("amount").asText(""));
                    sum += out[i];
                }
                if (sum > 0) {
                    if (sum != totalWon && totalWon > 0) out[phaseCount - 1] += (totalWon - sum);
                    return out;
                }
            }
        }
        long each = totalWon / Math.max(1, phaseCount);
        long acc = 0;
        for (int i = 0; i < phaseCount - 1; i++) { out[i] = each; acc += each; }
        out[phaseCount - 1] = totalWon - acc;
        return out;
    }

    private String buildDeliverableText(ProjectModule deliverableModule) {
        if (deliverableModule == null) return null;
        JsonNode root = readJson(deliverableModule.getData());
        if (root == null) return null;
        JsonNode arr = root.path("deliverables");
        if (!arr.isArray() || arr.size() == 0) return null;
        StringBuilder sb = new StringBuilder("필수 제출물:\n");
        for (JsonNode item : arr) {
            String icon = item.path("icon").asText("•");
            String label = item.path("label").asText("");
            if (label.isBlank()) continue;
            sb.append(icon).append(" ").append(label).append("\n");
        }
        return sb.toString().trim();
    }

    /**
     * 기존 마일스톤이 모두 과거이고 진척 (APPROVED/COMPLETED) 없으면
     * 마지막 endDate 가 today + 30일이 되도록 일괄 시프트.
     * 진척이 있는 프로젝트는 건드리지 않음.
     */
    private void rebaseStaleMilestones(Long projectId) {
        List<ProjectMilestone> list = projectMilestoneRepository.findByProjectIdOrderBySeqAsc(projectId);
        if (list.isEmpty()) return;
        boolean anyDone = list.stream().anyMatch(m ->
            m.getStatus() == ProjectMilestone.MilestoneStatus.APPROVED
            || m.getStatus() == ProjectMilestone.MilestoneStatus.COMPLETED);
        if (anyDone) return;

        LocalDate today = LocalDate.now();
        LocalDate lastEnd = list.stream().map(ProjectMilestone::getEndDate).filter(java.util.Objects::nonNull)
                .max(LocalDate::compareTo).orElse(null);
        if (lastEnd == null || !lastEnd.isBefore(today)) return;

        long shift = java.time.temporal.ChronoUnit.DAYS.between(lastEnd, today) + 30L;
        for (ProjectMilestone m : list) {
            if (m.getStartDate() != null) m.setStartDate(m.getStartDate().plusDays(shift));
            if (m.getEndDate() != null)   m.setEndDate(m.getEndDate().plusDays(shift));
        }
        projectMilestoneRepository.saveAll(list);
    }

    private LocalDate parseDate(String s) {
        if (s == null || s.isBlank()) return null;
        String norm = s.replace('.', '-').replaceAll("-+$", "").trim();
        try { return LocalDate.parse(norm); } catch (Exception e) { return null; }
    }
}
