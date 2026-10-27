import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AssessmentState {
  role: string | null;
  answers: Record<string, number>;
  currentQuestionIdx: number;
  theme: 'light' | 'dark';
  setRole: (role: string) => void;
  setAnswer: (questionId: string, value: number) => void;
  setQuestionIdx: (idx: number) => void;
  toggleTheme: () => void;
  clearAssessment: () => void;
}

export const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set) => ({
      role: null,
      answers: {},
      currentQuestionIdx: 0,
      theme: 'light',
      setRole: (role) => set({ role }),
      setAnswer: (questionId, value) =>
        set((state) => ({
          answers: { ...state.answers, [questionId]: value },
        })),
      setQuestionIdx: (idx) => set({ currentQuestionIdx: idx }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      clearAssessment: () => set({ role: null, answers: {}, currentQuestionIdx: 0 }),
    }),
    {
      name: 'pathfinder-storage',
    }
  )
);
