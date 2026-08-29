import { PropsWithChildren } from 'react';
import { ScrollView, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CloudBackground } from '@/components/CloudBackground';
import { spacing } from '@/theme/theme';

type ScreenProps = PropsWithChildren<{
  contentStyle?: StyleProp<ViewStyle>;
  scroll?: boolean;
}>;

export function Screen({ children, contentStyle, scroll = true }: ScreenProps) {
  const insets = useSafeAreaInsets();
  const padding = {
    paddingTop: insets.top + spacing.md,
    paddingBottom: insets.bottom + 110,
    paddingHorizontal: spacing.md,
  };

  return (
    <CloudBackground>
      {scroll ? (
        <ScrollView
          contentContainerStyle={[padding, styles.content, contentStyle]}
          showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      ) : (
        <>{children}</>
      )}
    </CloudBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.md,
  },
});
