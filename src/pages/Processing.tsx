import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useAssessmentStore } from '../store/assessmentStore';
import { SKILLS } from '../data/skills';

export const Processing: React.FC = () => {
  const navigate = useNavigate();
  const { role } = useAssessmentStore();
  const [progress, setProgress] = useState(0);
  const [messageIdx, setMessageIdx] = useState(0);
  const [litSkills, setLitSkills] = useState<string[]>([]);

  const messages = [
    "Analyzing your responses...",
    "Comparing with industry benchmarks...",
    "Identifying your critical gaps..."
  ];

  const roleSkills = SKILLS[role || 'sde'] || [];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, 45);

    const messageInterval = setInterval(() => {
      setMessageIdx(prev => (prev + 1) % messages.length);
    }, 1400);

    const skillInterval = setInterval(() => {
      setLitSkills(prev => {
        if (prev.length >= roleSkills.length) return prev;
        return [...prev, roleSkills[prev.length].id];
      });
    }, 800);

    const navTimer = setTimeout(() => {
      navigate('/report');
    }, 4500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      clearInterval(skillInterval);
      clearTimeout(navTimer);
    };
  }, [navigate, roleSkills]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center fade-in">
        <div className="relative w-48 h-48 mb-12">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-slate-200 dark:text-slate-700"
            />
            <motion.circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeLinecap="round"
              className="text-indigo-600 dark:text-indigo-400"
              initial={{ strokeDasharray: '0 553' }}
              animate={{ strokeDasharray: `${(progress / 100) * 553} 553` }}
              transition={{ duration: 0.1 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold text-[var(--fg)]">{progress}%</span>
            <span className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest">Analyzing</span>
          </div>
        </div>

        <div className="h-12 mb-12">
          <AnimatePresence mode="wait">
            <motion.h2
              key={messageIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xl md:text-2xl font-semibold text-[var(--fg)]"
            >
              {messages[messageIdx]}
            </motion.h2>
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-md">
          {roleSkills.map((skill) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0.4, scale: 0.9 }}
              animate={{
                opacity: litSkills.includes(skill.id) ? 1 : 0.4,
                scale: litSkills.includes(skill.id) ? 1.05 : 0.9,
                backgroundColor: litSkills.includes(skill.id) ? 'var(--accent)' : 'var(--border)'
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors duration-500 ${
                litSkills.includes(skill.id) ? 'text-white shadow-lg shadow-orange-200' : 'text-[var(--muted)]'
              }`}
            >
              {skill.name}
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
