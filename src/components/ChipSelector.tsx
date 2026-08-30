import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radii, spacing } from '@/theme/theme';

type ChipOption<T extends string> = { value: T; label: string };

type ChipSelectorProps<T extends string> = {
  options: ChipOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function ChipSelector<T extends string>({ options, value, onChange }: ChipSelectorProps<T>) {
  return (
    <View style={styles.row}>
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <Pressable key={opt.value} onPress={() => onChange(opt.value)} style={[styles.chip, active && styles.chipActive]}>
            <Text style={[styles.label, active && styles.labelActive]}>{opt.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.pill,
    backgroundColor: colors.chipInactive,
    alignItems: 'center',
  },
  chipActive: {
    backgroundColor: colors.accent,
  },
  label: {
    fontFamily: fonts.bodyBold,
    fontSize: 12.5,
    color: colors.chipInactiveText,
  },
  labelActive: {
    color: colors.textOnDark,
  },
});
