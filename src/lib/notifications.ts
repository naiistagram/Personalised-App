import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { learningLibrary } from '@/data/learningLibrary';
import { topicMeta } from '@/theme/theme';
import type { ReminderKey, ReminderSetting } from '@/store/useSettingsStore';

const ANDROID_CHANNEL_ID = 'cloud-reminders';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function ensureAndroidChannel() {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL_ID, {
    name: 'Cloud reminders',
    importance: Notifications.AndroidImportance.HIGH,
    sound: 'default',
    vibrationPattern: [0, 180, 90, 180],
    lightColor: '#5B9BEA',
  });
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  const requested = await Notifications.requestPermissionsAsync();
  return requested.granted;
}

function contentFor(key: ReminderKey): { title: string; body: string } {
  switch (key) {
    case 'morningAffirmation':
      return { title: 'Your affirmation is ready', body: 'Open the app to read today\'s belief before the day gets loud.' };
    case 'learningNudge': {
      const pick = learningLibrary[Math.floor(Math.random() * learningLibrary.length)];
      const topic = topicMeta[pick.topic];
      return {
        title: 'Time for a 2-minute lesson',
        body: `"${pick.title}" — ${topic.label}`,
      };
    }
    case 'meditation':
      return { title: 'Pause + breathe', body: 'A few minutes to meditate or pray, just for you.' };
    case 'eveningJournal':
      return { title: 'Wind down with your journal', body: 'Reflect on today, or write tomorrow\'s plan.' };
  }
}

export async function scheduleReminder(key: ReminderKey, setting: ReminderSetting): Promise<string | undefined> {
  if (Platform.OS === 'web') return undefined;
  await ensureAndroidChannel();
  const { title, body } = contentFor(key);
  return Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: 'default',
      data: { reminderKey: key },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: setting.hour,
      minute: setting.minute,
      channelId: ANDROID_CHANNEL_ID,
    },
  });
}

export async function cancelReminder(notificationId: string | undefined) {
  if (!notificationId || Platform.OS === 'web') return;
  await Notifications.cancelScheduledNotificationAsync(notificationId).catch(() => {});
}

export async function sendTestNotification() {
  if (Platform.OS === 'web') return;
  await ensureAndroidChannel();
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'This is what a reminder feels like',
      body: 'Tune the times below until they fit your day perfectly.',
      sound: 'default',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 3,
      channelId: ANDROID_CHANNEL_ID,
    },
  });
}
