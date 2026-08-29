import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { GlassSurface } from '@/components/GlassSurface';
import { colors, fonts, gradients, radii, spacing } from '@/theme/theme';

const SQUISH_SPRING = { damping: 14, stiffness: 260, mass: 0.6 };

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
  const scale = useSharedValue(1);
  const glow = useSharedValue(0);

  const squishStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const glowStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
  }));

  const pressIn = () => {
    scale.value = withSpring(0.94, SQUISH_SPRING);
    glow.value = withSpring(1, SQUISH_SPRING);
  };
  const pressOut = () => {
    scale.value = withSpring(1, SQUISH_SPRING);
    glow.value = withSpring(0, SQUISH_SPRING);
  };

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
      onPressIn={pressIn}
      onPressOut={pressOut}
      onPress={() => {
        tap();
        onPress?.();
      }}>
      <Animated.View
        style={[
          squishStyle,
          { opacity: disabled ? 0.5 : 1 },
          fullWidth && { alignSelf: 'stretch' },
        ]}>
        {variant === 'filled' ? (
          <View style={[styles.pillShape, shadowGlow]}>
            <LinearGradient
              colors={gradients.hero}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.pressGlowLight, glowStyle]} />
            {content}
          </View>
        ) : variant === 'glass' ? (
          <View style={styles.pillShape}>
            <GlassSurface radius={radii.pill} elevated={false}>
              {content}
            </GlassSurface>
            <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.pressGlowDark, glowStyle]} />
          </View>
        ) : (
          <View style={styles.pillShape}>{content}</View>
        )}
      </Animated.View>
    </Pressable>
  );
}

const shadowGlow = {
  shadowColor: colors.accentAlt,
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.35,
  shadowRadius: 14,
  elevation: 6,
};

const styles = StyleSheet.create({
  pillShape: {
    borderRadius: radii.pill,
    overflow: 'hidden',
  },
  pressGlowLight: {
    backgroundColor: 'rgba(255,255,255,0.28)',
  },
  pressGlowDark: {
    backgroundColor: 'rgba(255,255,255,0.4)',
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
    color: colors.textOnDark,
  },
  labelOnGlass: {
    color: colors.text,
  },
});
