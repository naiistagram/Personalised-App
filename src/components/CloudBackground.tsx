import { LinearGradient } from 'expo-linear-gradient';
import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

import { gradients, palette } from '@/theme/theme';

/**
 * Full-screen soft pastel gradient wash with a couple of blurred "cloud"
 * blobs for depth — the backdrop every screen sits on.
 */
export function CloudBackground({ children }: PropsWithChildren) {
  return (
    <View style={styles.fill}>
      <LinearGradient
        colors={gradients.sky}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View pointerEvents="none" style={[styles.blob, styles.blobOne]} />
      <View pointerEvents="none" style={[styles.blob, styles.blobTwo]} />
      <View pointerEvents="none" style={[styles.blob, styles.blobThree]} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  blob: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.45,
  },
  blobOne: {
    width: 260,
    height: 260,
    backgroundColor: palette.pink,
    top: -80,
    right: -60,
    opacity: 0.25,
  },
  blobTwo: {
    width: 220,
    height: 220,
    backgroundColor: palette.sky,
    top: 220,
    left: -90,
    opacity: 0.25,
  },
  blobThree: {
    width: 300,
    height: 300,
    backgroundColor: palette.lilac,
    bottom: -120,
    right: -100,
    opacity: 0.2,
  },
});
