import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { asyncStorage } from '@/lib/storage';

export type PlannerCategory = 'work' | 'goal' | 'personal';

export type PlannerTask = {
  id: string;
  title: string;
  notes?: string;
  category: PlannerCategory;
  dueDate: string | null; // yyyy-mm-dd
  done: boolean;
  createdAt: number;
};

export type Goal = {
  id: string;
  title: string;
  detail?: string;
  targetDate: string | null;
  progress: number; // 0-100
  createdAt: number;
};

type PlannerState = {
  tasks: PlannerTask[];
  goals: Goal[];
  addTask: (input: Omit<PlannerTask, 'id' | 'done' | 'createdAt'>) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  addGoal: (input: Omit<Goal, 'id' | 'createdAt'>) => void;
  updateGoalProgress: (id: string, progress: number) => void;
  removeGoal: (id: string) => void;
};

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const usePlannerStore = create<PlannerState>()(
  persist(
    (set) => ({
      tasks: [],
      goals: [],

      addTask: (input) =>
        set((state) => ({
          tasks: [{ ...input, id: uid(), done: false, createdAt: Date.now() }, ...state.tasks],
        })),

      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
        })),

      removeTask: (id) => set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),

      addGoal: (input) =>
        set((state) => ({
          goals: [{ ...input, id: uid(), createdAt: Date.now() }, ...state.goals],
        })),

      updateGoalProgress: (id, progress) =>
        set((state) => ({
          goals: state.goals.map((g) => (g.id === id ? { ...g, progress: Math.max(0, Math.min(100, progress)) } : g)),
        })),

      removeGoal: (id) => set((state) => ({ goals: state.goals.filter((g) => g.id !== id) })),
    }),
    { name: 'cloud-planner-store', storage: asyncStorage },
  ),
);
