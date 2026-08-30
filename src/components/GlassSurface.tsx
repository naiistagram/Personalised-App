import { BlurView } from 'expo-blur';
import { PropsWithChildren } from 'react';
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { colors, radii, shadow } from '@/theme/theme';

type GlassSurfaceProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  radius?: number;
  intensity?: number;
  background?: string;
  blur?: boolean;
  bordered?: boolean;
  elevated?: boolean;
}>;

/**
 * The core surface building block: a flat, softly-shadowed card by default.
 * Passing `blur` opts into a frosted/translucent treatment (used only for
 * the floating tab bar in this design).
 */
export function GlassSurface({
  children,
  style,
  radius = radii.lg,
  intensity = 40,
  background = colors.textOnDark,
  blur = false,
  bordered = false,
  elevated = true,
}: GlassSurfaceProps) {
  return (
    <View
      style={[
        { borderRadius: radius, overflow: 'hidden' },
        elevated && shadow.card,
        style,
      ]}>
      {blur && (
        <BlurView
          intensity={Platform.OS === 'web' ? intensity * 0.6 : intensity}
          tint="light"
          style={StyleSheet.absoluteFill}
        />
      )}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: background }]} />
      {bordered && (
        <View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              borderRadius: radius,
              borderWidth: 1.5,
              borderColor: colors.border,
            },
          ]}
        />
      )}
      <View style={{ borderRadius: radius }}>{children}</View>
    </View>
  );
}
