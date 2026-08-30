import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

import { backgrounds, gradients } from '@/theme/theme';

type PhotoBackgroundProps = PropsWithChildren<{
  photo?: string;
}>;

/**
 * Bright, high-key photography with a soft white scrim — the backdrop every
 * screen's glass surfaces sit on.
 */
export function PhotoBackground({ children, photo = backgrounds.default }: PhotoBackgroundProps) {
  return (
    <View style={styles.fill}>
      <Image
        source={{ uri: photo }}
        contentFit="cover"
        transition={200}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={gradients.scrim}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
