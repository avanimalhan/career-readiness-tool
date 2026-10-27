import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { useAssessmentStore } from '../store/assessmentStore';
import { ROLES } from '../data/roles';
import * as LucideIcons from 'lucide-react';

interface TiltCardProps {
  role: typeof ROLES[0];
  isSelected: boolean;
  onClick: () => void;
}

const TiltCard: React.FC<TiltCardProps> = ({ role, isSelected, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = LucideIcons[role.icon as keyof typeof LucideIcons] || LucideIcons.HelpCircle;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1000 }}
      onClick={onClick}
      className={`
        relative p-8 rounded-3xl cursor-pointer transition-all border-2
        ${isSelected
          ? 'border-indigo-600 bg-white dark:bg-slate-800 shadow-2xl shadow-indigo-100 dark:shadow-none ring-4 ring-indigo-50'
          : 'border-transparent bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm hover:border-indigo-200 hover:bg-white dark:hover:bg-slate-800 shadow-sm'
        }
      `}
    >
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all shadow-sm
        ${isSelected ? 'bg-indigo-600 text-white scale-110 rotate-3' : 'bg-indigo-50 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400'}
      `}>
        <Icon size={32} />
      </div>

      <h3 className={`text-xl font-bold text-center transition-colors ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-800 dark:text-slate-200'}`}>
        {role.name}
      </h3>

      {isSelected && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute -top-3 -right-3 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg"
        >
          <span className="text-xs">✓</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export const RoleSelect: React.FC = () => {
  const { role, setRole } = useAssessmentStore();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto py-12 fade-in">
        <button
          onClick={() => navigate('/')}
          className="text-slate-400 hover:text-slate-600 mb-12 transition-colors flex items-center gap-2 text-sm font-medium"
        >
          ← Back to Home
        </button>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold text-[var(--fg)] mb-4 tracking-tight"
        >
          Choose Your <span className="text-[var(--accent)]">Target Role</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-[var(--muted)] mb-16 max-w-lg mx-auto"
        >
          We'll tailor the assessment to the specific skills required for your chosen career path.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-16">
          {ROLES.map((r) => (
            <TiltCard
              key={r.id}
              role={r}
              isSelected={role === r.id}
              onClick={() => setRole(r.id)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            disabled={!role}
            onClick={() => navigate('/quiz')}
            className="px-12 py-5 text-xl shadow-xl shadow-indigo-200"
          >
            Start Assessment →
          </Button>
        </motion.div>
      </div>
    </Layout>
  );
};
