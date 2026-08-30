import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { GlassCard } from '@/components/GlassCard';
import { GlassPill } from '@/components/GlassPill';
import { Screen } from '@/components/Screen';
import { useLearningStore } from '@/store/useLearningStore';
import { learningLibrary } from '@/data/learningLibrary';
import { useManifestStore } from '@/store/useManifestStore';
import { usePlannerStore } from '@/store/usePlannerStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import { colors, fonts, gradients, radii, shadow, spacing } from '@/theme/theme';

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

  const name = displayName || 'you';
  const initial = (displayName || 'S').slice(0, 1).toUpperCase();

  return (
    <Screen>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <LinearGradient colors={gradients.hero} style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </LinearGradient>
          <View>
            <Text style={styles.greeting}>{greeting()}</Text>
            <Text style={styles.displayName}>{name}</Text>
          </View>
        </View>
        <View style={styles.bellButton}>
          <Ionicons name="notifications-outline" size={18} color={colors.textSoft} />
          <View style={styles.bellDot} />
        </View>
      </View>

      <LinearGradient colors={gradients.hero} start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }} style={styles.hero}>
        <View style={[styles.heroBlob, styles.heroBlobOne]} />
        <View style={[styles.heroBlob, styles.heroBlobTwo]} />
        <Text style={styles.heroEyebrow}>Today's focus</Text>
        <View style={styles.heroStreakRow}>
          <Text style={styles.heroStreakNumber}>{streak}</Text>
          <Text style={styles.heroStreakLabel}>day learning streak</Text>
        </View>
        <Text style={styles.heroCopy}>Keep it going — one idea a day adds up.</Text>
        <GlassPill
          label={`Continue: ${nextLesson.title}`}
          variant="outline"
          size="sm"
          onPress={() => router.push({ pathname: '/(tabs)/learn', params: { lessonId: nextLesson.id } })}
        />
      </LinearGradient>

      {affirmation && (
        <GlassCard>
          <Text style={styles.cardLabel}>Affirmation of the day</Text>
          <Text style={styles.affirmationText}>“{affirmation.text}”</Text>
        </GlassCard>
      )}

      <View style={styles.row}>
        <GlassCard style={styles.flexCard} background={colors.pastelBlueBg}>
          <Text style={[styles.statNumber, { color: colors.pastelBlueText }]}>{todayTasks.length}</Text>
          <Text style={[styles.statLabel, { color: colors.pastelBlueText }]}>tasks today</Text>
        </GlassCard>
        <GlassCard style={styles.flexCard} background={colors.pastelPeachBg}>
          <Text style={[styles.statNumber, { color: colors.pastelPeachText }]}>{nextLesson.estMinutes}</Text>
          <Text style={[styles.statLabel, { color: colors.pastelPeachText }]}>min · next lesson</Text>
        </GlassCard>
      </View>

      <GlassCard>
        <Text style={styles.cardLabel}>Today's plan</Text>
        {todayTasks.length === 0 ? (
          <Text style={styles.emptyText}>Nothing urgent — breathe easy, or add something in Planner.</Text>
        ) : (
          <View style={{ gap: spacing.xs, marginTop: spacing.xs }}>
            {todayTasks.map((task) => (
              <View key={task.id} style={styles.taskRow}>
                <GlassPill label="✓" size="sm" variant="soft" onPress={() => toggleTask(task.id)} />
                <Text style={styles.taskText} numberOfLines={1}>
                  {task.title}
                </Text>
              </View>
            ))}
          </View>
        )}
        <View style={{ marginTop: spacing.sm, alignSelf: 'flex-start' }}>
          <GlassPill label="Open planner" size="sm" variant="ghost" onPress={() => router.push('/(tabs)/planner')} />
        </View>
      </GlassCard>

      <View style={styles.row}>
        <GlassPill
          label="Journal"
          variant="outline"
          icon={<Ionicons name="create-outline" size={16} color={colors.accent} />}
          onPress={() => router.push('/(tabs)/manifest')}
          fullWidth
        />
        <GlassPill
          label="Meditate"
          variant="outline"
          icon={<Ionicons name="leaf-outline" size={16} color={colors.accent} />}
          onPress={() => router.push('/(tabs)/profile')}
          fullWidth
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: fonts.display,
    fontSize: 15,
    color: colors.textOnDark,
  },
  greeting: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12.5,
    color: colors.textSoft,
  },
  displayName: {
    fontFamily: fonts.display,
    fontSize: 17,
    color: colors.text,
  },
  bellButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.textOnDark,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.card,
  },
  bellDot: {
    position: 'absolute',
    top: 8,
    right: 9,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.accentOrange,
    borderWidth: 1.5,
    borderColor: colors.textOnDark,
  },
  hero: {
    borderRadius: radii.xl,
    padding: spacing.lg,
    overflow: 'hidden',
    ...shadow.hero,
  },
  heroBlob: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  heroBlobOne: {
    width: 150,
    height: 150,
    top: -40,
    right: -40,
  },
  heroBlobTwo: {
    width: 120,
    height: 120,
    bottom: -50,
    left: -20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  heroEyebrow: {
    fontFamily: fonts.bodySemibold,
    fontSize: 12.5,
    color: 'rgba(255,255,255,0.85)',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  heroStreakRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  heroStreakNumber: {
    fontFamily: fonts.displayExtra,
    fontSize: 54,
    color: colors.textOnDark,
    lineHeight: 54,
  },
  heroStreakLabel: {
    fontFamily: fonts.bodyRegular,
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  heroCopy: {
    fontFamily: fonts.bodyRegular,
    fontSize: 14,
    color: 'rgba(255,255,255,0.92)',
    marginTop: 6,
    marginBottom: spacing.md,
  },
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
    fontSize: 24,
  },
  statLabel: {
    fontFamily: fonts.body,
    fontSize: 12,
    textAlign: 'center',
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
