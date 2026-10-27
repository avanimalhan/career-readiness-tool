import { Skill } from '../data/skills';
import { Question } from '../data/questions';

export interface ScoringResult {
  overallScore: number;
  skillScores: Record<string, number>; // skillId -> score (0-100)
  topGaps: { skillId: string; score: number }[];
}

/**
 * Normalizes Likert (1-5) to 0-1
 */
export function normalizeLikert(v: number): number {
  return (v - 1) / 4;
}

/**
 * Normalizes Binary (Yes=5, No=1) to 0-1
 * We use 5/1 to keep the store consistent with Likert
 */
export function normalizeBinary(v: number): number {
  return v === 5 ? 1 : 0;
}

export function calculateScore(
  roleId: string,
  answers: Record<string, number>,
  questions: Question[],
  skills: Skill[]
): ScoringResult {
  const skillStats: Record<string, { weightedSum: number; totalWeight: number }> = {};

  // 1. Calculate scores per skill
  questions.forEach((q) => {
    const val = answers[q.id];
    if (val === undefined) return;

    const normalized = q.type === 'likert' ? normalizeLikert(val) : normalizeBinary(val);

    if (!skillStats[q.skillId]) {
      skillStats[q.skillId] = { weightedSum: 0, totalWeight: 0 };
    }

    skillStats[q.skillId].weightedSum += normalized * q.weight;
    skillStats[q.skillId].totalWeight += q.weight;
  });

  const skillScores: Record<string, number> = {};
  let totalOverallWeightedScore = 0;
  let totalOverallWeight = 0;

  // 2. Finalize skill scores and prepare overall weighted average
  skills.forEach((skill) => {
    const stats = skillStats[skill.id];
    const score = stats
      ? (stats.weightedSum / stats.totalWeight) * 100
      : 0;

    skillScores[skill.id] = Math.round(score);

    // Overall score is weighted by skill importance
    totalOverallWeightedScore += score * skill.importance;
    totalOverallWeight += skill.importance;
  });

  const overallScore = totalOverallWeight > 0
    ? Math.round(totalOverallWeightedScore / totalOverallWeight)
    : 0;

  // 3. Identify top 3 gaps (lowest scores)
  // Tie-break: Higher importance weight first
  const gaps = skills
    .map(s => ({ skillId: s.id, score: skillScores[s.id], importance: s.importance }))
    .sort((a, b) => {
      if (a.score !== b.score) return a.score - b.score;
      return b.importance - a.importance;
    })
    .slice(0, 3);

  return {
    overallScore,
    skillScores,
    topGaps: gaps.map(({ skillId, score }) => ({ skillId, score })),
  };
}

export function getVerdict(score: number) {
  if (score >= 85) return { label: 'Industry Ready', emoji: '🏆', color: 'text-teal-500' };
  if (score >= 65) return { label: 'Almost Ready', emoji: '🔥', color: 'text-orange-500' };
  if (score >= 40) return { label: 'Getting There', emoji: '🚀', color: 'text-amber-500' };
  return { label: 'Just Starting', emoji: '🌱', color: 'text-slate-500' };
}
