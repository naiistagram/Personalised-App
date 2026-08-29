import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { affirmationSeeds, type AffirmationCategory } from '@/data/affirmationSeeds';
import { asyncStorage } from '@/lib/storage';

export type EntryType = 'journal' | 'manifestation' | 'work-note';

export type JournalEntry = {
  id: string;
  type: EntryType;
  title: string;
  body: string;
  createdAt: number;
};

export type Affirmation = {
  id: string;
  text: string;
  category: AffirmationCategory;
  isFavorite: boolean;
  custom: boolean;
};

type ManifestState = {
  entries: JournalEntry[];
  affirmations: Affirmation[];
  addEntry: (input: Omit<JournalEntry, 'id' | 'createdAt'>) => void;
  updateEntry: (id: string, patch: Partial<Pick<JournalEntry, 'title' | 'body'>>) => void;
  removeEntry: (id: string) => void;
  addAffirmation: (text: string, category: AffirmationCategory) => void;
  toggleFavoriteAffirmation: (id: string) => void;
  removeAffirmation: (id: string) => void;
  affirmationOfTheDay: () => Affirmation | null;
};

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const useManifestStore = create<ManifestState>()(
  persist(
    (set, get) => ({
      entries: [],
      affirmations: affirmationSeeds.map((a) => ({ ...a, isFavorite: false, custom: false })),

      addEntry: (input) =>
        set((state) => ({
          entries: [{ ...input, id: uid(), createdAt: Date.now() }, ...state.entries],
        })),

      updateEntry: (id, patch) =>
        set((state) => ({
          entries: state.entries.map((e) => (e.id === id ? { ...e, ...patch } : e)),
        })),

      removeEntry: (id) => set((state) => ({ entries: state.entries.filter((e) => e.id !== id) })),

      addAffirmation: (text, category) =>
        set((state) => ({
          affirmations: [
            { id: uid(), text, category, isFavorite: false, custom: true },
            ...state.affirmations,
          ],
        })),

      toggleFavoriteAffirmation: (id) =>
        set((state) => ({
          affirmations: state.affirmations.map((a) => (a.id === id ? { ...a, isFavorite: !a.isFavorite } : a)),
        })),

      removeAffirmation: (id) =>
        set((state) => ({ affirmations: state.affirmations.filter((a) => a.id !== id) })),

      affirmationOfTheDay: () => {
        const list = get().affirmations;
        if (list.length === 0) return null;
        const favorites = list.filter((a) => a.isFavorite);
        const pool = favorites.length > 0 ? favorites : list;
        const dayIndex = Number(new Date().toISOString().slice(0, 10).replaceAll('-', ''));
        return pool[dayIndex % pool.length];
      },
    }),
    { name: 'cloud-manifest-store', storage: asyncStorage },
  ),
);
