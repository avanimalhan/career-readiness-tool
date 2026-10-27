import React from 'react';
import { motion } from 'framer-motion';
import { Role } from '../data/roles';

interface RoleCardProps {
  role: Role;
  isSelected: boolean;
  onClick: () => void;
}

export const RoleCard: React.FC<RoleCardProps> = ({ role, isSelected, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        p-6 rounded-3xl cursor-pointer transition-all border-2
        ${isSelected
          ? 'border-indigo-600 bg-white dark:bg-slate-800 shadow-xl shadow-indigo-100 dark:shadow-none ring-4 ring-indigo-50'
          : 'border-transparent bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm hover:border-indigo-200 hover:bg-white dark:hover:bg-slate-800 shadow-sm'
        }
      `}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all shadow-sm
        ${isSelected ? 'bg-indigo-600 text-white scale-110 rotate-3' : 'bg-indigo-50 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400'}
      `}>
        <span className="text-2xl">★</span>
      </div>
      <h3 className={`font-bold text-center transition-colors ${isSelected ? 'text-indigo-700' : 'text-slate-800 dark:text-slate-200'}`}>
        {role.name}
      </h3>
    </motion.div>
  );
};
