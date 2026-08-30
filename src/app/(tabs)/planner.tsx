import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ChipSelector } from '@/components/ChipSelector';
import { GlassCard } from '@/components/GlassCard';
import { GlassInput } from '@/components/GlassInput';
import { GlassPill } from '@/components/GlassPill';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { usePlannerStore, type PlannerCategory } from '@/store/usePlannerStore';
import { colors, fonts, gradients, spacing } from '@/theme/theme';

const categoryOptions: { value: PlannerCategory; label: string }[] = [
  { value: 'work', label: 'Work' },
  { value: 'goal', label: 'Goal' },
  { value: 'personal', label: 'Personal' },
];

const dueOptions: { value: 'none' | 'today' | 'tomorrow'; label: string }[] = [
  { value: 'none', label: 'Someday' },
  { value: 'today', label: 'Today' },
  { value: 'tomorrow', label: 'Tomorrow' },
];

function dateFor(option: 'none' | 'today' | 'tomorrow') {
  if (option === 'none') return null;
  const d = new Date();
  if (option === 'tomorrow') d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export default function PlannerScreen() {
  const tasks = usePlannerStore((s) => s.tasks);
  const goals = usePlannerStore((s) => s.goals);
  const addTask = usePlannerStore((s) => s.addTask);
  const toggleTask = usePlannerStore((s) => s.toggleTask);
  const removeTask = usePlannerStore((s) => s.removeTask);
  const addGoal = usePlannerStore((s) => s.addGoal);
  const updateGoalProgress = usePlannerStore((s) => s.updateGoalProgress);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<PlannerCategory>('work');
  const [due, setDue] = useState<'none' | 'today' | 'tomorrow'>('today');
  const [goalTitle, setGoalTitle] = useState('');
  const [showGoalForm, setShowGoalForm] = useState(false);

  const { open, done } = useMemo(() => {
    const open = tasks.filter((t) => !t.done);
    const done = tasks.filter((t) => t.done);
    return { open, done };
  }, [tasks]);

  const submitTask = () => {
    if (!title.trim()) return;
    addTask({ title: title.trim(), category, dueDate: dateFor(due) });
    setTitle('');
  };

  const submitGoal = () => {
    if (!goalTitle.trim()) return;
    addGoal({ title: goalTitle.trim(), targetDate: null, progress: 0 });
    setGoalTitle('');
    setShowGoalForm(false);
  };

  return (
    <Screen>
      <ScreenHeader eyebrow="Planner" title="Plan the work" subtitle="Work, goals, and everything in between." />

      <GlassCard>
        <Text style={styles.cardLabel}>Add a task</Text>
        <View style={{ gap: spacing.sm, marginTop: spacing.xs }}>
          <GlassInput placeholder="What needs doing?" value={title} onChangeText={setTitle} onSubmitEditing={submitTask} returnKeyType="done" />
          <ChipSelector options={categoryOptions} value={category} onChange={setCategory} />
          <ChipSelector options={dueOptions} value={due} onChange={setDue} />
          <GlassPill label="Add to plan" variant="filled" onPress={submitTask} />
        </View>
      </GlassCard>

      <GlassCard>
        <Text style={styles.cardLabel}>Open ({open.length})</Text>
        {open.length === 0 ? (
          <Text style={styles.emptyText}>All clear. Nice.</Text>
        ) : (
          <View style={{ gap: spacing.sm, marginTop: spacing.xs }}>
            {open.map((task) => (
              <View key={task.id} style={styles.taskRow}>
                <Pressable onPress={() => toggleTask(task.id)} style={styles.checkbox} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskMeta}>
                    {categoryOptions.find((c) => c.value === task.category)?.label} {task.dueDate ? `· ${task.dueDate}` : ''}
                  </Text>
                </View>
                <Pressable onPress={() => removeTask(task.id)}>
                  <Text style={styles.removeText}>✕</Text>
                </Pressable>
              </View>
            ))}
          </View>
        )}
      </GlassCard>

      {done.length > 0 && (
        <GlassCard>
          <Text style={styles.cardLabel}>Completed ({done.length})</Text>
          <View style={{ gap: spacing.sm, marginTop: spacing.xs }}>
            {done.slice(0, 5).map((task) => (
              <View key={task.id} style={styles.taskRow}>
                <Pressable onPress={() => toggleTask(task.id)} style={[styles.checkbox, styles.checkboxDone]} />
                <Text style={[styles.taskTitle, styles.taskTitleDone]}>{task.title}</Text>
              </View>
            ))}
          </View>
        </GlassCard>
      )}

      <GlassCard>
        <View style={styles.goalHeaderRow}>
          <Text style={styles.cardLabel}>Goals</Text>
          <GlassPill label={showGoalForm ? 'Cancel' : '+ Goal'} size="sm" variant="ghost" onPress={() => setShowGoalForm((v) => !v)} />
        </View>

        {showGoalForm && (
          <View style={{ gap: spacing.sm, marginBottom: spacing.sm }}>
            <GlassInput placeholder="Name your goal" value={goalTitle} onChangeText={setGoalTitle} onSubmitEditing={submitGoal} returnKeyType="done" />
            <GlassPill label="Save goal" variant="filled" size="sm" onPress={submitGoal} />
          </View>
        )}

        {goals.length === 0 ? (
          <Text style={styles.emptyText}>No goals yet — add one above.</Text>
        ) : (
          <View style={{ gap: spacing.md }}>
            {goals.map((goal) => (
              <View key={goal.id}>
                <Text style={styles.taskTitle}>{goal.title}</Text>
                <View style={styles.progressTrack}>
                  <LinearGradient
                    colors={gradients.progress}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.progressFill, { width: `${goal.progress}%` }]}
                  />
                </View>
                <View style={styles.goalActionsRow}>
                  <Text style={styles.taskMeta}>{goal.progress}% there</Text>
                  <View style={styles.goalButtons}>
                    <GlassPill label="-10%" size="sm" variant="soft" onPress={() => updateGoalProgress(goal.id, goal.progress - 10)} />
                    <GlassPill label="+10%" size="sm" variant="soft" onPress={() => updateGoalProgress(goal.id, goal.progress + 10)} />
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </GlassCard>
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
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  checkboxDone: {
    backgroundColor: colors.accent,
  },
  taskTitle: {
    fontFamily: fonts.bodySemibold,
    fontSize: 15,
    color: colors.text,
  },
  taskTitleDone: {
    textDecorationLine: 'line-through',
    color: colors.textSoft,
  },
  taskMeta: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textSoft,
    marginTop: 2,
  },
  removeText: {
    fontFamily: fonts.bodyBold,
    color: colors.textSoft,
    fontSize: 14,
    paddingHorizontal: spacing.xs,
  },
  goalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.trackBackground,
    marginTop: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
  goalActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  goalButtons: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
});
