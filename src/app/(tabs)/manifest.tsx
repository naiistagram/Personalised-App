import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ChipSelector } from '@/components/ChipSelector';
import { GlassCard } from '@/components/GlassCard';
import { GlassInput } from '@/components/GlassInput';
import { GlassPill } from '@/components/GlassPill';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import type { AffirmationCategory } from '@/data/affirmationSeeds';
import { useManifestStore, type EntryType } from '@/store/useManifestStore';
import { colors, fonts, spacing } from '@/theme/theme';

const typeOptions: { value: EntryType; label: string }[] = [
  { value: 'manifestation', label: 'Manifest' },
  { value: 'journal', label: 'Journal' },
  { value: 'work-note', label: 'Work note' },
];

const affirmationCategories: { value: AffirmationCategory; label: string }[] = [
  { value: 'manifestation', label: 'Manifestation' },
  { value: 'work', label: 'Work' },
  { value: 'abundance', label: 'Abundance' },
  { value: 'confidence', label: 'Confidence' },
  { value: 'calm', label: 'Calm' },
];

function timeAgo(ts: number) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function ManifestScreen() {
  const entries = useManifestStore((s) => s.entries);
  const addEntry = useManifestStore((s) => s.addEntry);
  const removeEntry = useManifestStore((s) => s.removeEntry);
  const affirmations = useManifestStore((s) => s.affirmations);
  const addAffirmation = useManifestStore((s) => s.addAffirmation);
  const toggleFavoriteAffirmation = useManifestStore((s) => s.toggleFavoriteAffirmation);
  const removeAffirmation = useManifestStore((s) => s.removeAffirmation);

  const [entryTitle, setEntryTitle] = useState('');
  const [entryBody, setEntryBody] = useState('');
  const [entryType, setEntryType] = useState<EntryType>('manifestation');
  const [filter, setFilter] = useState<EntryType | 'all'>('all');

  const [affirmationText, setAffirmationText] = useState('');
  const [affirmationCategory, setAffirmationCategory] = useState<AffirmationCategory>('manifestation');
  const [showAffirmationForm, setShowAffirmationForm] = useState(false);

  const filteredEntries = useMemo(
    () => (filter === 'all' ? entries : entries.filter((e) => e.type === filter)),
    [entries, filter],
  );

  const sortedAffirmations = useMemo(
    () => [...affirmations].sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite)),
    [affirmations],
  );

  const submitEntry = () => {
    if (!entryBody.trim()) return;
    addEntry({ type: entryType, title: entryTitle.trim() || 'Untitled', body: entryBody.trim() });
    setEntryTitle('');
    setEntryBody('');
  };

  const submitAffirmation = () => {
    if (!affirmationText.trim()) return;
    addAffirmation(affirmationText.trim(), affirmationCategory);
    setAffirmationText('');
    setShowAffirmationForm(false);
  };

  return (
    <Screen>
      <ScreenHeader eyebrow="Manifest" title="Write it into being" subtitle="Journal, manifest, plan your words." />

      <GlassCard>
        <Text style={styles.cardLabel}>New entry</Text>
        <View style={{ gap: spacing.sm, marginTop: spacing.xs }}>
          <ChipSelector options={typeOptions} value={entryType} onChange={setEntryType} />
          <GlassInput placeholder="Title (optional)" value={entryTitle} onChangeText={setEntryTitle} />
          <GlassInput
            placeholder="Let it flow..."
            value={entryBody}
            onChangeText={setEntryBody}
            multiline
            numberOfLines={4}
            style={{ minHeight: 90 }}
            textAlignVertical="top"
          />
          <GlassPill label="Save entry" variant="filled" onPress={submitEntry} />
        </View>
      </GlassCard>

      <View>
        <ChipSelector
          options={[{ value: 'all', label: 'All' }, ...typeOptions]}
          value={filter}
          onChange={setFilter}
        />
      </View>

      {filteredEntries.length === 0 ? (
        <GlassCard>
          <Text style={styles.emptyText}>Nothing here yet — your words will show up as you write.</Text>
        </GlassCard>
      ) : (
        filteredEntries.map((entry) => (
          <GlassCard key={entry.id}>
            <View style={styles.entryHeaderRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.entryTitle}>{entry.title}</Text>
                <Text style={styles.entryMeta}>
                  {typeOptions.find((t) => t.value === entry.type)?.label} · {timeAgo(entry.createdAt)}
                </Text>
              </View>
              <Pressable onPress={() => removeEntry(entry.id)}>
                <Text style={styles.removeText}>✕</Text>
              </Pressable>
            </View>
            <Text style={styles.entryBody}>{entry.body}</Text>
          </GlassCard>
        ))
      )}

      <GlassCard>
        <View style={styles.goalHeaderRow}>
          <Text style={styles.cardLabel}>Affirmations</Text>
          <GlassPill label={showAffirmationForm ? 'Cancel' : '+ Add'} size="sm" onPress={() => setShowAffirmationForm((v) => !v)} />
        </View>

        {showAffirmationForm && (
          <View style={{ gap: spacing.sm, marginBottom: spacing.sm }}>
            <GlassInput placeholder="Write a belief that's true for you" value={affirmationText} onChangeText={setAffirmationText} multiline />
            <ChipSelector options={affirmationCategories} value={affirmationCategory} onChange={setAffirmationCategory} />
            <GlassPill label="Save affirmation" variant="filled" size="sm" onPress={submitAffirmation} />
          </View>
        )}

        <View style={{ gap: spacing.sm }}>
          {sortedAffirmations.map((a) => (
            <View key={a.id} style={styles.affirmationRow}>
              <Text style={styles.affirmationText}>{a.text}</Text>
              <View style={styles.affirmationActions}>
                <Pressable onPress={() => toggleFavoriteAffirmation(a.id)}>
                  <Ionicons name={a.isFavorite ? 'star' : 'star-outline'} size={18} color={colors.accent} />
                </Pressable>
                {a.custom && (
                  <Pressable onPress={() => removeAffirmation(a.id)}>
                    <Ionicons name="close" size={18} color={colors.textSoft} />
                  </Pressable>
                )}
              </View>
            </View>
          ))}
        </View>
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
  },
  entryHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  entryTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: colors.text,
  },
  entryMeta: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textSoft,
    marginTop: 2,
  },
  entryBody: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSoft,
    marginTop: spacing.xs,
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
  affirmationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  affirmationText: {
    flex: 1,
    fontFamily: fonts.bodySemibold,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  affirmationActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
});
