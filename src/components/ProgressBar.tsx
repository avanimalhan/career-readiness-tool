import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progress = (current / total) * 100;
  return (
    <div className="w-full" role="progressbar" aria-valuenow={current} aria-valuemin="1" aria-valuemax={total}>
      <div className="flex justify-between items-end mb-2">
        <span className="text-sm font-bold text-[var(--muted)] uppercase tracking-widest">
          Question {current} of {total}
        </span>
        <span className="text-xs text-[var(--muted)]">
          {Math.round(progress)}% Complete
        </span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
        <div
          className="bg-indigo-600 h-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
