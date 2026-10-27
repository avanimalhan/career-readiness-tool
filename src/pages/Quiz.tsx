import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { useAssessmentStore } from '../store/assessmentStore';
import { QUESTIONS } from '../data/questions';
import { SKILLS } from '../data/skills';

const LIKERT_OPTIONS = [
  { label: 'Lost', emoji: '😬', value: 1 },
  { label: 'Shaky', emoji: '😕', value: 2 },
  { label: 'Okay', emoji: '😐', value: 3 },
  { label: 'Good', emoji: '🙂', value: 4 },
  { label: 'Expert', emoji: '🤩', value: 5 },
];

export const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const { role, answers, setAnswer, currentQuestionIdx, setQuestionIdx } = useAssessmentStore();
  const [direction, setDirection] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const roleQuestions = QUESTIONS[role || ''] || [];
  const currentQuestion = roleQuestions[currentQuestionIdx];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;
      if (e.key >= '1' && e.key <= '5') {
        handleAnswer(parseInt(e.key));
      } else if (e.key.toLowerCase() === 'y') {
        handleAnswer(5);
      } else if (e.key.toLowerCase() === 'n') {
        handleAnswer(1);
      } else if (e.key === 'Backspace') {
        handleBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion, isTransitioning]);

  const handleAnswer = async (value: number) => {
    setAnswer(currentQuestion.id, value);
    setIsTransitioning(true);

    await new Promise(resolve => setTimeout(resolve, 300));

    if (currentQuestionIdx < roleQuestions.length - 1) {
      setDirection(1);
      setQuestionIdx(currentQuestionIdx + 1);
    } else {
      navigate('/processing');
    }
    setIsTransitioning(false);
  };

  const handleBack = () => {
    if (currentQuestionIdx > 0) {
      setDirection(-1);
      setQuestionIdx(currentQuestionIdx - 1);
    }
  };

  if (!currentQuestion) return null;

  const skill = SKILLS[role || '']?.find(s => s.id === currentQuestion.skillId);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold text-[var(--muted)] uppercase tracking-widest">
              Question {currentQuestionIdx + 1} of {roleQuestions.length}
            </span>
            <button onClick={handleBack} disabled={currentQuestionIdx === 0} className="text-sm text-[var(--accent)] hover:underline disabled:opacity-0 transition-opacity">
              ← Go Back
            </button>
          </div>
          <ProgressBar current={currentQuestionIdx + 1} total={roleQuestions.length} />
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestionIdx}
            custom={direction}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 50 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="bg-white dark:bg-[var(--card)] p-8 md:p-12 rounded-3xl border-2 border-[var(--border)] shadow-xl relative overflow-hidden"
          >
            <div className="flex justify-center mb-8">
              <span className="px-4 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-100 dark:border-indigo-800">
                {skill?.name || 'Core Skill'}
              </span>
            </div>

            <h2 className="text-2xl md:text-4xl font-extrabold text-[var(--fg)] text-center mb-12 leading-tight">
              {currentQuestion.text}
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {currentQuestion.type === 'likert' ? (
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  {LIKERT_OPTIONS.map((opt) => (
                    <motion.button
                      key={opt.label}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(opt.value)}
                      className={`
                        flex flex-col items-center p-4 rounded-2xl border-2 transition-all
                        ${answers[currentQuestion.id] === opt.value
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 ring-4 ring-indigo-50'
                          : 'border-[var(--border)] bg-slate-50 dark:bg-slate-800/50 text-[var(--muted)] hover:border-indigo-300'
                        }
                      `}
                    >
                      <span className="text-3xl mb-2">{opt.emoji}</span>
                      <span className="text-xs font-bold uppercase tracking-tight">{opt.label}</span>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Yes', value: 5, emoji: '✅' },
                    { label: 'Not yet', value: 1, emoji: '❌' },
                  ].map((opt) => (
                    <motion.button
                      key={opt.label}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(opt.value)}
                      className={`
                        p-6 rounded-2xl border-2 transition-all flex items-center justify-center gap-4 text-xl font-bold
                        ${answers[currentQuestion.id] === opt.value
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 ring-4 ring-indigo-50'
                          : 'border-[var(--border)] bg-slate-50 dark:bg-slate-800/50 text-[var(--muted)] hover:border-indigo-300'
                        }
                      `}
                    >
                      <span>{opt.emoji}</span>
                      <span>{opt.label}</span>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-12 flex justify-center">
              <Button
                variant="ghost"
                onClick={() => {
                  if (currentQuestionIdx < roleQuestions.length - 1) {
                    setDirection(1);
                    setQuestionIdx(currentQuestionIdx + 1);
                  } else {
                    navigate('/processing');
                  }
                }}
                disabled={!answers[currentQuestion.id]}
              >
                Skip Question →
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Layout>
  );
};
