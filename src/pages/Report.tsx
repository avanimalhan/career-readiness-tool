import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { useAssessmentStore } from '../store/assessmentStore';
import { calculateScore, getVerdict } from '../lib/scoring';
import { QUESTIONS } from '../data/questions';
import { SKILLS } from '../data/skills';
import { generateGapCopy } from '../lib/gapCopy';

const Gauge = ({ score }: { score: number }) => {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          fill="transparent"
          className="text-slate-200 dark:text-slate-700"
        />
        <motion.circle
          cx="96"
          cy="96"
          r={radius}
          stroke="url(#gaugeGradient)"
          strokeWidth="12"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2, ease: "easeOut" }}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--ok)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-5xl font-extrabold text-[var(--fg)]"
        >
          {score}%
        </motion.span>
      </div>
    </div>
  );
};

const RadarChart = ({ scores, skills }: { scores: Record<string, number>, skills: any[] }) => {
  const center = 100;
  const radius = 70;
  const angleStep = (2 * Math.PI) / skills.length;

  const points = skills.map((s, i) => {
    const score = (scores[s.id] || 0) / 100;
    const x = center + radius * score * Math.cos(i * angleStep - Math.PI / 2);
    const y = center + radius * score * Math.sin(i * angleStep - Math.PI / 2);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="relative w-64 h-64 mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
        {/* Background Hexagon/Polygon */}
        <polygon
          points={skills.map((_, i) => {
            const x = center + radius * Math.cos(i * angleStep - Math.PI / 2);
            const y = center + radius * Math.sin(i * angleStep - Math.PI / 2);
            return `${x},${y}`;
          }).join(' ')}
          fill="var(--tint)"
          stroke="var(--border)"
          strokeWidth="1"
        />
        {/* Score Polygon */}
        <motion.polygon
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          points={points}
          fill="rgba(99, 102, 241, 0.4)"
          stroke="var(--accent)"
          strokeWidth="2"
        />
        {/* Axis Labels */}
        {skills.map((s, i) => {
          const x = center + (radius + 20) * Math.cos(i * angleStep - Math.PI / 2);
          const y = center + (radius + 20) * Math.sin(i * angleStep - Math.PI / 2);
          return (
            <text
              key={s.id}
              x={x}
              y={y}
              textAnchor="middle"
              fontSize="10"
              className="fill-[var(--muted)] font-bold"
            >
              {s.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export const Report: React.FC = () => {
  const navigate = useNavigate();
  const { role, answers, clearAssessment } = useAssessmentStore();
  const [showConfetti, setShowConfetti] = useState(false);

  const roleSkills = SKILLS[role || 'sde'] || [];
  const result = calculateScore(role || '', answers, QUESTIONS[role || ''], roleSkills);
  const verdict = getVerdict(result.overallScore);

  useEffect(() => {
    if (result.overallScore >= 65) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [result.overallScore]);

  const strongestSkillId = Object.entries(result.skillScores)
    .sort(([, a], [, b]) => b - a)[0]?.[0] || null;

  const handleRetake = () => {
    clearAssessment();
    navigate('/role');
  };

  return (
    <Layout>
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto py-12 fade-in relative">
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -20, x: Math.random() * window.innerWidth, opacity: 1 }}
                animate={{
                  y: window.innerHeight + 20,
                  x: (Math.random() - 0.5) * 200 + (Math.random() * window.innerWidth),
                  rotate: Math.random() * 360
                }}
                transition={{ duration: Math.random() * 3 + 2, ease: "linear" }}
                className="absolute w-2 h-2 bg-indigo-500 rounded-sm"
              />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--fg)] mb-4 tracking-tight">
            Your Readiness <span className="text-[var(--accent)]">Report</span>
          </h1>
          <p className="text-lg text-[var(--muted)]">Benchmarked against industry standards.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full mb-20">
          {/* Left Column: Score & Verdict */}
          <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-[var(--card)] rounded-3xl border-2 border-[var(--border)] shadow-xl">
            <Gauge score={result.overallScore} />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2, type: 'spring' }}
              className={`mt-8 px-6 py-2 rounded-full text-sm font-extrabold uppercase tracking-widest ${verdict.color} bg-opacity-10 border-2 ${verdict.color.replace('text', 'border')}`}
            >
              {verdict.emoji} {verdict.label}
            </motion.div>
          </div >

          {/* Right Column: Radar Chart */}
          <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-[var(--card)] rounded-3xl border-2 border-[var(--border)] shadow-xl">
            <h3 className="text-xl font-bold mb-8 text-[var(--fg)]">Skill Distribution</h3>
            <RadarChart scores={result.skillScores} skills={roleSkills} />
          </div >
        </div>

        <div className="w-full max-w-3xl mb-20">
          <h3 className="text-2xl font-extrabold text-[var(--fg)] mb-8 text-center">Your Top 3 Critical Gaps</h3>
          <div className="space-y-4">
            {result.topGaps.map(({ skillId, score }, i) => {
              const skill = roleSkills.find(s => s.id === skillId);
              const copy = generateGapCopy(role || '', skillId, score, strongestSkillId, roleSkills);

              return (
                <motion.div
                  key={skillId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (i * 0.2) }}
                  className="group bg-white dark:bg-[var(--card)] p-6 rounded-2xl border-2 border-[var(--border)] shadow-sm hover:border-indigo-400 transition-all"
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-lg text-[var(--fg)]">{skill?.name}</span>
                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{score}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full mb-4 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ duration: 1, delay: 1 + (i * 0.2) }}
                      className="h-full bg-indigo-600"
                    />
                  </div >
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
                    {copy.explanation}
                  </p>
                  <p className="text-xs font-bold text-indigo-500 dark:text-indigo-400 italic">
                    💡 {copy.reference}
                  </p>
                </motion.div>
              );
            })}
          </div >
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full mb-20">
          <Button variant="secondary" onClick={handleRetake} className="px-8 py-4">
            Retake Assessment
          </Button>
          <Button
            onClick={() => alert("🚀 Coming Soon: Personalized learning paths for your gaps!")}
            className="px-8 py-4 shadow-xl shadow-indigo-200"
          >
            How to fix these gaps? →
          </Button>
          <Button
            variant="ghost"
            onClick={async () => {
              const text = `My Pathfinder Readiness Score: ${result.overallScore}% - ${verdict.label} ${verdict.emoji}`;
              if (navigator.share) {
                try { await navigator.share({ title: 'My Career Readiness', text }); } catch (e) {}
              } else {
                await navigator.clipboard.writeText(text);
                alert("Score copied to clipboard!");
              }
            }}
            className="px-8 py-4"
          >
            Share Score
          </Button>
        </div >
      </div>
    </Layout>
  );
};
