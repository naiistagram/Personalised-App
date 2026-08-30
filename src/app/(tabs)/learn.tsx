import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { GlassCard } from '@/components/GlassCard';
import { GlassPill } from '@/components/GlassPill';
import { PhotoBackground } from '@/components/PhotoBackground';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { learningLibrary, lessonsByTopic, topicOrder, type Lesson } from '@/data/learningLibrary';
import { useLearningStore } from '@/store/useLearningStore';
import { backgrounds, colors, fonts, radii, spacing, topicMeta } from '@/theme/theme';

export default function LearnScreen() {
  const params = useLocalSearchParams<{ lessonId?: string }>();
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const completedCardIds = useLearningStore((s) => s.completedCardIds);
  const streak = useLearningStore((s) => s.streak);

  useEffect(() => {
    if (params.lessonId) {
      const found = learningLibrary.find((l) => l.id === params.lessonId);
      if (found) setActiveLesson(found);
    }
  }, [params.lessonId]);

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Learn"
        title="Bite-sized growth"
        subtitle={`${streak} day streak · ${Object.keys(completedCardIds).length} ideas learned`}
      />

      {topicOrder.map((topic) => {
        const lessons = lessonsByTopic(topic);
        const meta = topicMeta[topic];
        return (
          <View key={topic} style={{ gap: spacing.sm }}>
            <View style={styles.topicHeadingRow}>
              <Ionicons name={meta.icon as any} size={18} color={colors.text} />
              <Text style={styles.topicHeading}>{meta.label}</Text>
            </View>
            <View style={{ gap: spacing.sm }}>
              {lessons.map((lesson) => {
                const done = lesson.cards.every((c) => completedCardIds[c.id]);
                const started = lesson.cards.some((c) => completedCardIds[c.id]);
                return (
                  <Pressable key={lesson.id} onPress={() => setActiveLesson(lesson)}>
                    <GlassCard>
                      <View style={styles.lessonRow}>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.lessonTitle}>{lesson.title}</Text>
                          <Text style={styles.lessonMeta}>
                            {lesson.cards.length} ideas · {lesson.estMinutes} min
                          </Text>
                        </View>
                        <Text style={styles.status}>{done ? '✓' : started ? '···' : '→'}</Text>
                      </View>
                    </GlassCard>
                  </Pressable>
                );
              })}
            </View>
          </View>
        );
      })}

      <LessonReader lesson={activeLesson} onClose={() => setActiveLesson(null)} />
    </Screen>
  );
}

function LessonReader({ lesson, onClose }: { lesson: Lesson | null; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const markCardComplete = useLearningStore((s) => s.markCardComplete);

  useEffect(() => {
    setIndex(0);
  }, [lesson?.id]);

  const card = lesson?.cards[index];
  const meta = lesson ? topicMeta[lesson.topic] : null;

  const isLast = lesson ? index === lesson.cards.length - 1 : false;

  const advance = () => {
    if (!lesson || !card) return;
    markCardComplete(card.id);
    if (isLast) {
      onClose();
    } else {
      setIndex((i) => i + 1);
    }
  };

  return (
    <Modal visible={Boolean(lesson)} animationType="slide" transparent onRequestClose={onClose}>
      <PhotoBackground photo={backgrounds.reading}>
        <View style={styles.readerContainer}>
          <View style={styles.readerTopBar}>
            <View style={styles.dotsRow}>
              {lesson?.cards.map((c, i) => (
                <View
                  key={c.id}
                  style={[
                    styles.dot,
                    i <= index ? styles.dotActive : styles.dotInactive,
                  ]}
                />
              ))}
            </View>
            <GlassPill label="Close" size="sm" variant="ghost" onPress={onClose} />
          </View>

          {lesson && card && meta && (
            <Pressable style={styles.readerCardWrap} onPress={advance}>
              <GlassCard style={{ minHeight: 320 }} padding={spacing.lg}>
                <View style={styles.readerTopicRow}>
                  <Ionicons name={meta.icon as any} size={14} color={colors.accent} />
                  <Text style={styles.readerTopic}>{meta.label}</Text>
                </View>
                <Text style={styles.readerHeading}>{card.heading}</Text>
                <Text style={styles.readerBody}>{card.body}</Text>
              </GlassCard>
            </Pressable>
          )}

          <Text style={styles.tapHint}>Tap the card to continue</Text>
          <View style={{ alignSelf: 'center' }}>
            <GlassPill label={isLast ? 'Finish lesson' : 'Next idea →'} variant="filled" onPress={advance} />
          </View>
        </View>
      </PhotoBackground>
    </Modal>
  );
}

const styles = StyleSheet.create({
  topicHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  topicHeading: {
    fontFamily: fonts.heading,
    fontSize: 18,
    color: colors.text,
  },
  lessonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: colors.text,
  },
  lessonMeta: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textSoft,
    marginTop: 2,
  },
  status: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.accent,
    marginLeft: spacing.sm,
  },
  readerContainer: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingTop: 64,
    paddingBottom: spacing.xl,
    justifyContent: 'flex-start',
    gap: spacing.md,
  },
  readerTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 6,
    flex: 1,
    marginRight: spacing.sm,
  },
  dot: {
    flex: 1,
    height: 4,
    borderRadius: radii.pill,
  },
  dotActive: {
    backgroundColor: colors.accent,
  },
  dotInactive: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  readerCardWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  readerTopicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.sm,
  },
  readerTopic: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.accent,
  },
  readerHeading: {
    fontFamily: fonts.display,
    fontSize: 24,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  readerBody: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSoft,
  },
  tapHint: {
    textAlign: 'center',
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textSoft,
  },
});
