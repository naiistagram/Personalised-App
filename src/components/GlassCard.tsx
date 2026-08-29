import { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { GlassSurface } from '@/components/GlassSurface';
import { radii, spacing } from '@/theme/theme';

type GlassCardProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  padding?: number;
  radius?: number;
}>;

export function GlassCard({ children, style, padding = spacing.md, radius = radii.lg }: GlassCardProps) {
  return (
    <GlassSurface radius={radius} style={style}>
      <View style={[styles.inner, { padding, borderRadius: radius }]}>{children}</View>
    </GlassSurface>
  );
}

const styles = StyleSheet.create({
  inner: {
    width: '100%',
  },
});
