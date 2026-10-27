import { Skill } from '../data/skills';

export interface GapFeedback {
  explanation: string;
  reference: string;
}

export function generateGapCopy(
  roleId: string,
  skillId: string,
  score: number,
  strongestSkill: string | null,
  skills: Skill[]
): GapFeedback {
  const skill = skills.find(s => s.id === skillId);
  const skillName = skill ? skill.name : 'this skill';

  const severity = score < 35
    ? "This is a priority, so start with the fundamentals."
    : "You have a base here. Sharpen it with focused practice.";

  let reference = `Focus on ${skillName} through real-world projects and industry certifications.`;

  if (strongestSkill && strongestSkill !== skillId) {
    const strongSkill = skills.find(s => s.id === strongestSkill);
    if (strongSkill) {
      reference = `Leverage your strength in ${strongSkill.name} to help you master ${skillName}.`;
    }
  }

  return {
    explanation: `${skillName}: ${severity}`,
    reference: reference
  };
}
