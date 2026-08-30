import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, gradients, radii, spacing } from '@/theme/theme';

type GlassPillProps = {
  label: string;
  onPress?: () => void;
  icon?: ReactNode;
  variant?: 'filled' | 'outline' | 'soft' | 'ghost';
  onDark?: boolean;
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
  variant = 'soft',
  onDark = false,
  size = 'md',
  disabled,
  fullWidth,
}: GlassPillProps) {
  const dims = sizeMap[size];

  const labelColor =
    variant === 'filled'
      ? colors.textOnDark
      : variant === 'ghost'
        ? onDark
          ? colors.textOnDark
          : colors.accent
        : variant === 'soft'
          ? colors.chipInactiveText
          : colors.accent;

  const content = (
    <View style={[styles.row, { paddingVertical: dims.paddingVertical, paddingHorizontal: dims.paddingHorizontal }]}>
      {icon}
      <Text style={[styles.label, { fontSize: dims.fontSize, color: labelColor }]}>{label}</Text>
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
        <LinearGradient colors={gradients.hero} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.pillShape}>
          {content}
        </LinearGradient>
      ) : variant === 'outline' ? (
        <View style={[styles.pillShape, styles.outlineBorder]}>{content}</View>
      ) : variant === 'soft' ? (
        <View style={[styles.pillShape, styles.softFill]}>{content}</View>
      ) : (
        <View style={[styles.pillShape, onDark && styles.ghostOnDarkFill]}>{content}</View>
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
    backgroundColor: colors.textOnDark,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  softFill: {
    backgroundColor: colors.chipInactive,
  },
  ghostOnDarkFill: {
    backgroundColor: 'rgba(255,255,255,0.3)',
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
});
