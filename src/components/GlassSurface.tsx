import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { PropsWithChildren } from 'react';
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { colors, radii, shadow } from '@/theme/theme';

type GlassSurfaceProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  radius?: number;
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
  bordered?: boolean;
  elevated?: boolean;
}>;

/**
 * The core "liquid glass" building block: a frosted, translucent surface with
 * a soft sheen highlight along the top edge, used for cards, pills and sheets.
 */
export function GlassSurface({
  children,
  style,
  radius = radii.lg,
  intensity = 40,
  tint = 'light',
  bordered = true,
  elevated = true,
}: GlassSurfaceProps) {
  return (
    <View
      style={[
        { borderRadius: radius, overflow: 'hidden' },
        elevated && shadow.soft,
        style,
      ]}>
      <BlurView
        intensity={Platform.OS === 'web' ? intensity * 0.6 : intensity}
        tint={tint}
        style={StyleSheet.absoluteFill}
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: colors.glass },
        ]}
      />
      <LinearGradient
        colors={['rgba(255,255,255,0.55)', 'rgba(255,255,255,0)']}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 0.6 }}
        style={StyleSheet.absoluteFill}
      />
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
