import { describe, it, expect } from 'vitest';
import { calculateScore, getVerdict } from '../lib/scoring';
import { ROLES } from '../data/roles';
import { SKILLS } from '../data/skills';
import { QUESTIONS } from '../data/questions';

describe('Pathfinder Scoring Logic', () => {
  const roleId = 'sde';
  const skills = SKILLS[roleId];
  const questions = QUESTIONS[roleId];

  it('should calculate 100% for perfect answers', () => {
    const answers: Record<string, number> = {};
    questions.forEach(q => {
      answers[q.id] = q.type === 'likert' ? 5 : 5; // 5 is Yes/Expert
    });
    const result = calculateScore(roleId, answers, questions, skills);
    expect(result.overallScore).toBe(100);
  });

  it('should calculate 0% for minimum answers', () => {
    const answers: Record<string, number> = {};
    questions.forEach(q => {
      answers[q.id] = q.type === 'likert' ? 1 : 1; // 1 is No/Novice
    });
    const result = calculateScore(roleId, answers, questions, skills);
    expect(result.overallScore).toBe(0);
  });

  it('should handle mixed answers and weighted skill scores', () => {
    const answers: Record<string, number> = {};
    // Set one skill to 100%, others to 0%
    const firstSkillId = skills[0].id;
    questions.forEach(q => {
      answers[q.id] = q.skillId === firstSkillId ? 5 : 1;
    });
    const result = calculateScore(roleId, answers, questions, skills);

    expect(result.skillScores[firstSkillId]).toBe(100);
    // Overall score should be (100 * importance) / total importance
    const totalImportance = skills.reduce((sum, s) => sum + s.importance, 0);
    const expected = Math.round((100 * skills[0].importance) / totalImportance);
    expect(result.overallScore).toBe(expected);
  });

  it('should correctly identify top 3 gaps with tie-breaking', () => {
    const answers: Record<string, number> = {};
    // Set all to 0% to test tie-break (highest importance first)
    questions.forEach(q => {
      answers[q.id] = 1;
    });
    const result = calculateScore(roleId, answers, questions, skills);

    expect(result.topGaps.length).toBe(3);
    // The first gap should be the one with the highest importance among the 0s
    const topImportance = Math.max(...skills.map(s => s.importance));
    const firstGapSkill = skills.find(s => s.id === result.topGaps[0].skillId);
    expect(firstGapSkill?.importance).toBe(topImportance);
  });

  it('should return correct verdicts for boundaries', () => {
    expect(getVerdict(39).label).toBe('Just Starting');
    expect(getVerdict(40).label).toBe('Getting There');
    expect(getVerdict(64).label).toBe('Getting There');
    expect(getVerdict(65).label).toBe('Almost Ready');
    expect(getVerdict(84).label).toBe('Almost Ready');
    expect(getVerdict(85).label).toBe('Industry Ready');
  });
});
