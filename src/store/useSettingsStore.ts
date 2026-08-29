import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { asyncStorage } from '@/lib/storage';

export type ReminderKey = 'morningAffirmation' | 'learningNudge' | 'meditation' | 'eveningJournal';

export type ReminderSetting = {
  enabled: boolean;
  hour: number;
  minute: number;
};

export type ReminderSettings = Record<ReminderKey, ReminderSetting>;

type SettingsState = {
  displayName: string;
  reminders: ReminderSettings;
  notificationIds: Partial<Record<ReminderKey, string>>;
  onboarded: boolean;
  setDisplayName: (name: string) => void;
  setOnboarded: (value: boolean) => void;
  updateReminder: (key: ReminderKey, patch: Partial<ReminderSetting>) => void;
  setNotificationId: (key: ReminderKey, id: string | undefined) => void;
};

export const defaultReminders: ReminderSettings = {
  morningAffirmation: { enabled: true, hour: 7, minute: 30 },
  learningNudge: { enabled: true, hour: 12, minute: 30 },
  meditation: { enabled: true, hour: 20, minute: 0 },
  eveningJournal: { enabled: false, hour: 21, minute: 30 },
};

export const reminderCopy: Record<ReminderKey, { label: string; description: string; emoji: string }> = {
  morningAffirmation: {
    label: 'Morning affirmation',
    description: 'Start the day with a belief tailored to you.',
    emoji: '🌸',
  },
  learningNudge: {
    label: 'Learn something bite-sized',
    description: 'Selling, marketing, copywriting & lead gen, rotated daily.',
    emoji: '📖',
  },
  meditation: {
    label: 'Meditate / pray',
    description: 'A gentle nudge to breathe, ground, and reconnect.',
    emoji: '🧘‍♀️',
  },
  eveningJournal: {
    label: 'Evening journal',
    description: 'Reflect, plan tomorrow, or free-write.',
    emoji: '🌙',
  },
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      displayName: '',
      reminders: defaultReminders,
      notificationIds: {},
      onboarded: false,

      setDisplayName: (name) => set({ displayName: name }),
      setOnboarded: (value) => set({ onboarded: value }),

      updateReminder: (key, patch) =>
        set((state) => ({
          reminders: { ...state.reminders, [key]: { ...state.reminders[key], ...patch } },
        })),

      setNotificationId: (key, id) =>
        set((state) => ({
          notificationIds: { ...state.notificationIds, [key]: id },
        })),
    }),
    { name: 'cloud-settings-store', storage: asyncStorage },
  ),
);
