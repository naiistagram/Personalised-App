import { StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';

import { GlassSurface } from '@/components/GlassSurface';
import { colors, fonts, radii, spacing } from '@/theme/theme';

type GlassInputProps = TextInputProps & {
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
};

export function GlassInput({ containerStyle, inputStyle, ...props }: GlassInputProps) {
  return (
    <GlassSurface
      radius={radii.input}
      background={colors.inputBackground}
      bordered
      elevated={false}
      style={containerStyle}>
      <View style={styles.wrap}>
        <TextInput
          placeholderTextColor={colors.textSoft}
          style={[styles.input, inputStyle]}
          {...props}
        />
      </View>
    </GlassSurface>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  input: {
    fontFamily: fonts.bodySemibold,
    fontSize: 15,
    color: colors.text,
  },
});
