import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { GlassCard } from '@/components/GlassCard';
import { GlassPill } from '@/components/GlassPill';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { learningLibrary } from '@/data/learningLibrary';
import { useLearningStore } from '@/store/useLearningStore';
import { useManifestStore } from '@/store/useManifestStore';
import { usePlannerStore } from '@/store/usePlannerStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import { colors, fonts, spacing, topicMeta } from '@/theme/theme';

function greeting() {
  const hour = new Date().getHours();
  if (hour < 5) return 'Resting well?';
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  if (hour < 21) return 'Good evening';
  return 'Winding down?';
}

export default function TodayScreen() {
  const router = useRouter();
  const displayName = useSettingsStore((s) => s.displayName);
  const affirmation = useManifestStore((s) => s.affirmationOfTheDay());
  const streak = useLearningStore((s) => s.streak);
  const completedCardIds = useLearningStore((s) => s.completedCardIds);
  const tasks = usePlannerStore((s) => s.tasks);
  const toggleTask = usePlannerStore((s) => s.toggleTask);

  const todayTasks = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return tasks
      .filter((t) => !t.done && (t.dueDate === null || t.dueDate <= today))
      .slice(0, 3);
  }, [tasks]);

  const nextLesson = useMemo(() => {
    return learningLibrary.find((lesson) => lesson.cards.some((c) => !completedCardIds[c.id])) ?? learningLibrary[0];
  }, [completedCardIds]);

  const name = displayName ? `, ${displayName}` : '';

  return (
    <Screen>
      <ScreenHeader eyebrow="Today" title={`${greeting()}${name} ☁️`} subtitle="Here's your soft landing for today." />

      {affirmation && (
        <GlassCard>
          <Text style={styles.cardLabel}>Affirmation of the day</Text>
          <Text style={styles.affirmationText}>“{affirmation.text}”</Text>
        </GlassCard>
      )}

      <View style={styles.row}>
        <GlassCard style={styles.flexCard}>
          <Text style={styles.statNumber}>{streak}</Text>
          <Text style={styles.statLabel}>day learning streak</Text>
        </GlassCard>
        <GlassCard style={styles.flexCard}>
          <Text style={styles.statNumber}>{todayTasks.length}</Text>
          <Text style={styles.statLabel}>things on today's plate</Text>
        </GlassCard>
      </View>

      <GlassCard>
        <Text style={styles.cardLabel}>Continue learning</Text>
        <Text style={styles.lessonTitle}>
          {topicMeta[nextLesson.topic].emoji} {nextLesson.title}
        </Text>
        <Text style={styles.lessonMeta}>{topicMeta[nextLesson.topic].label} · {nextLesson.estMinutes} min</Text>
        <View style={{ marginTop: spacing.sm, alignSelf: 'flex-start' }}>
          <GlassPill
            label="Open lesson"
            variant="filled"
            size="sm"
            onPress={() => router.push({ pathname: '/(tabs)/learn', params: { lessonId: nextLesson.id } })}
          />
        </View>
      </GlassCard>

      <GlassCard>
        <Text style={styles.cardLabel}>Today's plan</Text>
        {todayTasks.length === 0 ? (
          <Text style={styles.emptyText}>Nothing urgent — breathe easy, or add something in Planner.</Text>
        ) : (
          <View style={{ gap: spacing.xs, marginTop: spacing.xs }}>
            {todayTasks.map((task) => (
              <View key={task.id} style={styles.taskRow}>
                <GlassPill label="✓" size="sm" variant="ghost" onPress={() => toggleTask(task.id)} />
                <Text style={styles.taskText} numberOfLines={1}>
                  {task.title}
                </Text>
              </View>
            ))}
          </View>
        )}
        <View style={{ marginTop: spacing.sm, alignSelf: 'flex-start' }}>
          <GlassPill label="Open planner" size="sm" onPress={() => router.push('/(tabs)/planner')} />
        </View>
      </GlassCard>

      <View style={styles.row}>
        <GlassPill label="🌙 Journal" onPress={() => router.push('/(tabs)/manifest')} fullWidth />
        <GlassPill label="🧘‍♀️ Meditate" onPress={() => router.push('/(tabs)/profile')} fullWidth />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  flexCard: {
    flex: 1,
    alignItems: 'center',
  },
  cardLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.accent,
    marginBottom: 6,
  },
  affirmationText: {
    fontFamily: fonts.heading,
    fontSize: 19,
    lineHeight: 26,
    color: colors.text,
  },
  statNumber: {
    fontFamily: fonts.displayExtra,
    fontSize: 32,
    color: colors.text,
  },
  statLabel: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textSoft,
    textAlign: 'center',
    marginTop: 2,
  },
  lessonTitle: {
    fontFamily: fonts.heading,
    fontSize: 18,
    color: colors.text,
  },
  lessonMeta: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textSoft,
    marginTop: 2,
  },
  emptyText: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textSoft,
    marginTop: 4,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  taskText: {
    fontFamily: fonts.bodySemibold,
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
});
