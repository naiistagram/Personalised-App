import type { BottomTabBarProps } from 'expo-router/js-tabs';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { LayoutChangeEvent, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
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

const INDICATOR_SPRING = { damping: 16, stiffness: 180, mass: 0.9 };

export function CloudTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const routeCount = state.routes.length;
  const rowWidth = useSharedValue(0);
  const activeIndex = useSharedValue(state.index);

  useEffect(() => {
    activeIndex.value = withSpring(state.index, INDICATOR_SPRING);
  }, [state.index, activeIndex]);

  const onBarLayout = (event: LayoutChangeEvent) => {
    rowWidth.value = event.nativeEvent.layout.width;
  };

  const indicatorStyle = useAnimatedStyle(() => {
    const inset = spacing.xs;
    const tabWidth = Math.max(rowWidth.value - inset * 2, 0) / routeCount;
    return {
      width: Math.max(tabWidth - 8, 0),
      transform: [{ translateX: inset + activeIndex.value * tabWidth + 4 }],
    };
  });

  return (
    <View pointerEvents="box-none" style={[styles.wrapper, { bottom: insets.bottom + spacing.sm }]}>
      <GlassSurface radius={radii.pill} intensity={55}>
        <View style={styles.barPad} onLayout={onBarLayout}>
          <Animated.View style={[styles.indicator, indicatorStyle]} pointerEvents="none">
            <LinearGradient
              colors={gradients.hero}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            <LinearGradient
              colors={gradients.glassSheen}
              start={{ x: 0.1, y: 0 }}
              end={{ x: 0.9, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
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
                  <Text style={styles.icon}>{TAB_ICONS[route.name] ?? '•'}</Text>
                  {focused && (
                    <Text
                      style={[styles.label, styles.labelActive]}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.75}>
                      {label}
                    </Text>
                  )}
                </Pressable>
              );
            })}
          </View>
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
    alignItems: 'stretch',
  },
  barPad: {},
  indicator: {
    position: 'absolute',
    top: spacing.xs,
    bottom: spacing.xs,
    left: 0,
    borderRadius: radii.pill,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
  },
  tabButton: {
    flexGrow: 1,
    flexBasis: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingVertical: spacing.xs,
    paddingHorizontal: 1,
  },
  icon: {
    fontSize: 16,
  },
  label: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    color: colors.text,
    flexShrink: 1,
  },
  labelActive: {
    color: colors.textOnDark,
  },
});
