import type { BottomTabBarProps } from 'expo-router/js-tabs';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GlassSurface } from '@/components/GlassSurface';
import { colors, fonts, gradients, radii, spacing } from '@/theme/theme';

const TAB_ICONS: Record<string, string> = {
  index: '☁️',
  learn: '📖',
  planner: '🗓️',
  manifest: '🌙',
  profile: '🌸',
};

export function CloudTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View pointerEvents="box-none" style={[styles.wrapper, { bottom: insets.bottom + spacing.sm }]}>
      <GlassSurface radius={radii.pill} intensity={55}>
        <View style={styles.row}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label = (options.title ?? route.name) as string;
            const focused = state.index === index;

            const onPress = () => {
              if (Platform.OS !== 'web') {
                Haptics.selectionAsync().catch(() => {});
              }
              const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
              if (!focused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <Pressable
                key={route.key}
                onPress={onPress}
                accessibilityRole="button"
                accessibilityState={focused ? { selected: true } : {}}
                style={styles.tabButton}>
                {focused ? (
                  <View style={styles.activePillWrap}>
                    <LinearGradient
                      colors={gradients.hero}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.activePill}
                    />
                    <Text style={styles.icon}>{TAB_ICONS[route.name] ?? '•'}</Text>
                    <Text style={[styles.label, styles.labelActive]}>{label}</Text>
                  </View>
                ) : (
                  <View style={styles.inactivePill}>
                    <Text style={styles.icon}>{TAB_ICONS[route.name] ?? '•'}</Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      </GlassSurface>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.xs,
    gap: 4,
  },
  tabButton: {
    flexGrow: 1,
    flexBasis: 0,
  },
  activePillWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: radii.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    overflow: 'hidden',
  },
  activePill: {
    ...StyleSheet.absoluteFill,
    borderRadius: radii.pill,
  },
  inactivePill: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
  },
  icon: {
    fontSize: 18,
  },
  label: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    color: colors.text,
  },
  labelActive: {
    color: colors.textOnDark,
  },
});
