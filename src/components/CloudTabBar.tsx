import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GlassSurface } from '@/components/GlassSurface';
import { colors, fonts, radii, spacing } from '@/theme/theme';

const TAB_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: 'sunny-outline',
  learn: 'book-outline',
  planner: 'calendar-outline',
  manifest: 'sparkles-outline',
  profile: 'person-outline',
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
                style={focused ? styles.tabButtonActive : styles.tabButton}>
                {focused ? (
                  <View style={styles.activePillWrap}>
                    <View style={styles.activePill} />
                    <Ionicons name={TAB_ICONS[route.name] ?? 'ellipse-outline'} size={16} color={colors.textOnDark} />
                    <Text style={[styles.label, styles.labelActive]} numberOfLines={1}>
                      {label}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.inactivePill}>
                    <Ionicons name={TAB_ICONS[route.name] ?? 'ellipse-outline'} size={20} color={colors.textSoft} />
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
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.xs,
    gap: 4,
  },
  tabButton: {
    flexGrow: 1,
    flexBasis: 0,
    alignItems: 'center',
  },
  tabButtonActive: {
    flexShrink: 0,
  },
  activePillWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: radii.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  activePill: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: radii.pill,
    backgroundColor: colors.accent,
  },
  inactivePill: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
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
