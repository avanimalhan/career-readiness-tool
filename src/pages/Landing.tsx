import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';

export const CompareSlider: React.FC = () => {
  const [sliderPos, setSliderPos] = React.useState(50);

  const handleMove = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos(Number(e.target.value));
  };

  return (
    <div className="relative w-full max-w-3xl aspect-[16/9] mx-auto rounded-3xl overflow-hidden border-2 border-[var(--border)] shadow-2xl group">
      {/* AFTER layer (Clear) */}
      <div className="absolute inset-0 bg-white dark:bg-[var(--card)] p-8 flex flex-col justify-center items-center text-center">
        <div className="space-y-4 w-full max-w-md">
          <div className="flex items-center gap-3 p-3 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-100 dark:border-teal-800">
            <span className="text-teal-500">✓</span>
            <span className="text-sm font-medium">Readiness Score: 82% (Almost Ready)</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800">
            <span className="text-indigo-500">✓</span>
            <span className="text-sm font-medium">Top Gaps: System Design, Redis, CI/CD</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800">
            <span className="text-orange-500">✓</span>
            <span className="text-sm font-medium">Personalized Learning Roadmap Generated</span>
          </div>
        </div>
      </div>

      {/* BEFORE layer (Foggy) */}
      <div
        className="absolute inset-0 bg-slate-200 dark:bg-slate-800 transition-all duration-100 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <div className="absolute inset-0 flex flex-wrap gap-4 p-12 items-center justify-center">
          {[
            "Which role?", "Am I ready??", "Where do I start?",
            "What's a T-shaped skill?", "Is my project enough?", "Leetcode or projects?"
          ].map((text, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -5, 0],
                rotate: [0, 1, -1, 0]
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="px-4 py-2 bg-white dark:bg-slate-700 border-2 border-dashed border-slate-400 dark:border-slate-500 rounded-full text-sm text-slate-500 dark:text-slate-300 shadow-sm"
            >
              {text}
            </motion.div>
          ))}
        </div>
      </div>

      {/* The Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white dark:bg-slate-300 z-20 cursor-ew-resize group-hover:bg-indigo-500 transition-colors"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-slate-200 rounded-full shadow-xl flex items-center justify-center border-2 border-indigo-500 text-indigo-600 font-bold text-xs">
          ↔
        </div>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={handleMove}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
      />
    </div>
  );
};

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto py-12 fade-in">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-3 bg-white dark:bg-slate-800 border border-[var(--border)] rounded-2xl shadow-sm"
        >
          <span className="text-indigo-600 font-bold tracking-tight">Pathfinder 1.0</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-5xl md:text-7xl font-extrabold text-[var(--fg)] mb-6 tracking-tight leading-tight"
        >
          Stop Guessing.<br />
          <span className="text-[var(--accent)]">Start Preparing.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-[var(--muted)] mb-16 max-w-2xl mx-auto leading-relaxed"
        >
          Get an objective readiness score and identify your top 3 skill gaps in 5 minutes.
          <span className="block mt-2 font-medium text-[var(--fg)]">Move from anxiety to clarity.</span>
        </motion.p>

        <CompareSlider />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <Button onClick={() => navigate('/role')} className="px-12 py-5 text-xl shadow-xl shadow-indigo-200">
            Check My Readiness →
          </Button>
        </motion.div>
      </div>
    </Layout>
  );
};
