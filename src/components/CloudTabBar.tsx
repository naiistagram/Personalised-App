import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GlassSurface } from '@/components/GlassSurface';
import { colors, gradients, radii, shadow, spacing } from '@/theme/theme';

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
      <GlassSurface radius={radii.xl} blur elevated={false} background="rgba(255,255,255,0.85)" style={shadow.tabBar}>
        <View style={styles.row}>
          {state.routes.map((route, index) => {
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
                  <LinearGradient colors={gradients.hero} style={styles.tabButtonFill}>
                    <Ionicons name={TAB_ICONS[route.name] ?? 'ellipse-outline'} size={20} color={colors.textOnDark} />
                  </LinearGradient>
                ) : (
                  <Ionicons name={TAB_ICONS[route.name] ?? 'ellipse-outline'} size={20} color={colors.textSoft} />
                )}
              </Pressable>
            );
          })}
        </View>
      </GlassSurface>
    </View>
  );
}

const TAB_SIZE = 46;

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
    justifyContent: 'space-around',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.xs,
  },
  tabButton: {
    width: TAB_SIZE,
    height: TAB_SIZE,
    borderRadius: TAB_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonFill: {
    width: TAB_SIZE,
    height: TAB_SIZE,
    borderRadius: TAB_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
