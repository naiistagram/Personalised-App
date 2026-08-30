import * as Haptics from 'expo-haptics';
import { ReactNode } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { GlassSurface } from '@/components/GlassSurface';
import { colors, fonts, radii, spacing } from '@/theme/theme';

type GlassPillProps = {
  label: string;
  onPress?: () => void;
  icon?: ReactNode;
  variant?: 'filled' | 'glass' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
};

const sizeMap = {
  sm: { paddingVertical: spacing.xs, paddingHorizontal: spacing.md, fontSize: 13 },
  md: { paddingVertical: spacing.sm, paddingHorizontal: spacing.lg, fontSize: 15 },
  lg: { paddingVertical: spacing.md, paddingHorizontal: spacing.xl, fontSize: 17 },
};

function tap() {
  if (Platform.OS !== 'web') {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  }
}

export function GlassPill({
  label,
  onPress,
  icon,
  variant = 'glass',
  size = 'md',
  disabled,
  fullWidth,
}: GlassPillProps) {
  const dims = sizeMap[size];

  const content = (
    <View style={[styles.row, { paddingVertical: dims.paddingVertical, paddingHorizontal: dims.paddingHorizontal }]}>
      {icon}
      <Text
        style={[
          styles.label,
          { fontSize: dims.fontSize },
          variant === 'filled' ? styles.labelOnFilled : styles.labelOnGlass,
        ]}>
        {label}
      </Text>
    </View>
  );

  return (
    <Pressable
      disabled={disabled}
      onPress={() => {
        tap();
        onPress?.();
      }}
      style={({ pressed }) => [
        { opacity: disabled ? 0.5 : pressed ? 0.85 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] },
        fullWidth && { alignSelf: 'stretch' },
      ]}>
      {variant === 'filled' ? (
        <GlassSurface radius={radii.pill} elevated={false} bordered={false}>
          <View style={styles.outlineBorder}>{content}</View>
        </GlassSurface>
      ) : variant === 'glass' ? (
        <GlassSurface radius={radii.pill} elevated={false}>
          {content}
        </GlassSurface>
      ) : (
        <View style={styles.pillShape}>{content}</View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pillShape: {
    borderRadius: radii.pill,
    overflow: 'hidden',
  },
  outlineBorder: {
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: 'rgba(17,17,16,0.55)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  label: {
    fontFamily: fonts.bodyBold,
    letterSpacing: 0.2,
  },
  labelOnFilled: {
    color: colors.text,
  },
  labelOnGlass: {
    color: colors.text,
  },
});
