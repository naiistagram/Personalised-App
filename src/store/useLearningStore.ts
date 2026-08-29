import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { asyncStorage } from '@/lib/storage';

type LearningState = {
  completedCardIds: Record<string, true>;
  streak: number;
  lastActiveDate: string | null; // yyyy-mm-dd
  markCardComplete: (cardId: string) => void;
  isCardComplete: (cardId: string) => boolean;
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function isYesterday(dateKey: string) {
  const d = new Date(dateKey);
  const y = new Date();
  y.setDate(y.getDate() - 1);
  return d.toISOString().slice(0, 10) === y.toISOString().slice(0, 10);
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      completedCardIds: {},
      streak: 0,
      lastActiveDate: null,

      markCardComplete: (cardId) => {
        const today = todayKey();
        set((state) => {
          if (state.completedCardIds[cardId]) return state;

          let nextStreak = state.streak;
          if (state.lastActiveDate === today) {
            // already active today, streak unchanged
          } else if (state.lastActiveDate && isYesterday(state.lastActiveDate)) {
            nextStreak = state.streak + 1;
          } else {
            nextStreak = 1;
          }

          return {
            completedCardIds: { ...state.completedCardIds, [cardId]: true },
            streak: nextStreak,
            lastActiveDate: today,
          };
        });
      },

      isCardComplete: (cardId) => Boolean(get().completedCardIds[cardId]),
    }),
    { name: 'cloud-learning-store', storage: asyncStorage },
  ),
);
