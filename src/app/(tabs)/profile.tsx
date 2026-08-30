import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Alert, Platform, StyleSheet, Switch, Text, View } from 'react-native';

import { GlassCard } from '@/components/GlassCard';
import { GlassInput } from '@/components/GlassInput';
import { GlassPill } from '@/components/GlassPill';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import {
  cancelReminder,
  requestNotificationPermission,
  scheduleReminder,
  sendTestNotification,
} from '@/lib/notifications';
import {
  reminderCopy,
  useSettingsStore,
  type ReminderKey,
} from '@/store/useSettingsStore';
import { colors, fonts, spacing } from '@/theme/theme';

const reminderKeys: ReminderKey[] = ['morningAffirmation', 'learningNudge', 'meditation', 'eveningJournal'];

function formatTime(hour: number, minute: number) {
  const period = hour >= 12 ? 'PM' : 'AM';
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${h12}:${minute.toString().padStart(2, '0')} ${period}`;
}

export default function ProfileScreen() {
  const displayName = useSettingsStore((s) => s.displayName);
  const setDisplayName = useSettingsStore((s) => s.setDisplayName);
  const reminders = useSettingsStore((s) => s.reminders);
  const updateReminder = useSettingsStore((s) => s.updateReminder);
  const notificationIds = useSettingsStore((s) => s.notificationIds);
  const setNotificationId = useSettingsStore((s) => s.setNotificationId);
  const onboarded = useSettingsStore((s) => s.onboarded);
  const setOnboarded = useSettingsStore((s) => s.setOnboarded);

  const [nameDraft, setNameDraft] = useState(displayName);

  useEffect(() => setNameDraft(displayName), [displayName]);

  // Reconcile once: the reminder toggles default to "on", so the first time this
  // screen is opened we quietly request permission and schedule anything missing.
  useEffect(() => {
    if (onboarded) return;
    (async () => {
      const granted = await requestNotificationPermission();
      if (granted) {
        for (const key of reminderKeys) {
          const setting = reminders[key];
          if (setting.enabled && !notificationIds[key]) {
            const id = await scheduleReminder(key, setting);
            setNotificationId(key, id);
          }
        }
      } else {
        for (const key of reminderKeys) {
          if (reminders[key].enabled) updateReminder(key, { enabled: false });
        }
      }
      setOnboarded(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onboarded]);

  const applySchedule = async (key: ReminderKey, next: { enabled: boolean; hour: number; minute: number }) => {
    await cancelReminder(notificationIds[key]);
    if (next.enabled) {
      const granted = await requestNotificationPermission();
      if (!granted) {
        Alert.alert('Notifications are off', 'Enable notifications in system settings to get reminders.');
        updateReminder(key, { enabled: false });
        return;
      }
      const id = await scheduleReminder(key, next);
      setNotificationId(key, id);
    } else {
      setNotificationId(key, undefined);
    }
  };

  const toggle = (key: ReminderKey) => {
    const next = { ...reminders[key], enabled: !reminders[key].enabled };
    updateReminder(key, { enabled: next.enabled });
    applySchedule(key, next);
  };

  const bump = (key: ReminderKey, minutesDelta: number) => {
    const current = reminders[key];
    const total = ((current.hour * 60 + current.minute + minutesDelta) % 1440 + 1440) % 1440;
    const next = { ...current, hour: Math.floor(total / 60), minute: total % 60 };
    updateReminder(key, { hour: next.hour, minute: next.minute });
    if (current.enabled) applySchedule(key, next);
  };

  return (
    <Screen>
      <ScreenHeader eyebrow="You" title="Your space" subtitle="Make it feel like you." />

      <GlassCard>
        <Text style={styles.cardLabel}>What should we call you?</Text>
        <View style={{ marginTop: spacing.xs }}>
          <GlassInput
            placeholder="Your name"
            value={nameDraft}
            onChangeText={setNameDraft}
            onEndEditing={() => setDisplayName(nameDraft.trim())}
            returnKeyType="done"
          />
        </View>
      </GlassCard>

      <GlassCard>
        <Text style={styles.cardLabel}>Reminders</Text>
        <View style={{ gap: spacing.md, marginTop: spacing.xs }}>
          {reminderKeys.map((key) => {
            const copy = reminderCopy[key];
            const setting = reminders[key];
            return (
              <View key={key} style={styles.reminderRow}>
                <View style={{ flex: 1 }}>
                  <View style={styles.reminderLabelRow}>
                    <Ionicons name={copy.icon as any} size={16} color={colors.text} />
                    <Text style={styles.reminderLabel}>{copy.label}</Text>
                  </View>
                  <Text style={styles.reminderDescription}>{copy.description}</Text>
                  {setting.enabled && (
                    <View style={styles.timeAdjustRow}>
                      <GlassPill label="-15m" size="sm" variant="ghost" onPress={() => bump(key, -15)} />
                      <Text style={styles.timeText}>{formatTime(setting.hour, setting.minute)}</Text>
                      <GlassPill label="+15m" size="sm" variant="ghost" onPress={() => bump(key, 15)} />
                    </View>
                  )}
                </View>
                <Switch
                  value={setting.enabled}
                  onValueChange={() => toggle(key)}
                  trackColor={{ true: colors.accent, false: 'rgba(0,0,0,0.15)' }}
                  thumbColor="#fff"
                />
              </View>
            );
          })}
        </View>
      </GlassCard>

      <GlassCard>
        <Text style={styles.cardLabel}>Try it out</Text>
        <Text style={styles.reminderDescription}>Send yourself a test notification in 3 seconds.</Text>
        <View style={{ marginTop: spacing.sm, alignSelf: 'flex-start' }}>
          <GlassPill
            label="Send test notification"
            size="sm"
            onPress={async () => {
              const granted = await requestNotificationPermission();
              if (!granted) {
                Alert.alert('Notifications are off', 'Enable notifications in system settings first.');
                return;
              }
              await sendTestNotification();
            }}
          />
        </View>
      </GlassCard>

      <Text style={styles.footer}>
        Cloud — made for manifesting, learning, and planning your way.{'\n'}
        {Platform.OS === 'web' ? 'Notification sounds are best experienced on iOS or Android.' : ''}
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  cardLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.accent,
  },
  reminderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  reminderLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  reminderLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: colors.text,
  },
  reminderDescription: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textSoft,
    marginTop: 2,
  },
  timeAdjustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  timeText: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    color: colors.text,
    minWidth: 78,
    textAlign: 'center',
  },
  footer: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textSoft,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
