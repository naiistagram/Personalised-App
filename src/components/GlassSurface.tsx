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
 * The core "liquid glass" building block: a frosted, translucent surface that
 * bends light like real glass — a bright specular highlight top-left, a
 * softer tinted pool of shadow at the bottom for depth, and a rim border that
 * catches the light unevenly (bright top/left edge, dim bottom/right edge)
 * instead of a flat single-tone outline.
 */
export function GlassSurface({
  children,
  style,
  radius = radii.lg,
  intensity = 46,
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
      {/* Specular highlight — light glancing off the top-left of the surface */}
      <LinearGradient
        colors={['rgba(255,255,255,0.8)', 'rgba(255,255,255,0.18)', 'rgba(255,255,255,0)']}
        locations={[0, 0.35, 0.85]}
        start={{ x: 0.05, y: 0 }}
        end={{ x: 0.95, y: 0.8 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      {/* Pooled tint at the base — how thicker glass darkens near the bottom edge */}
      <LinearGradient
        colors={['rgba(154,107,255,0)', 'rgba(120,80,190,0.14)']}
        start={{ x: 0, y: 0.55 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      {bordered && (
        <View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              borderRadius: radius,
              borderWidth: 1.5,
              borderTopColor: 'rgba(255,255,255,0.95)',
              borderLeftColor: 'rgba(255,255,255,0.6)',
              borderRightColor: 'rgba(255,255,255,0.28)',
              borderBottomColor: 'rgba(139,101,199,0.3)',
            },
          ]}
        />
      )}
      <View style={{ borderRadius: radius }}>{children}</View>
    </View>
  );
}
