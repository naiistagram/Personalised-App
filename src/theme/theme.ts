// Design language: "Sky" — warm sky-blue gradients, pastel cards, rounded
// friendly type (Manrope display / DM Sans body).

export const palette = {
  background: '#F6F9FD',
  white: '#FFFFFF',
  ink: '#182335',
  inkSoft: '#28344A',
  textSoft: '#8A96AC',
  border: '#E3ECF7',
  inputBackground: '#F8FAFD',
  chipInactive: '#F0F3F8',
  chipInactiveText: '#7C8AA0',
  skyStart: '#5B9BEA',
  skyMid: '#7FB3EF',
  skyMid2: '#8FC4F6',
  skyEnd: '#C7E2F9',
  skyEnd2: '#DCEBFB',
  progressEnd: '#8FC1F5',
  accentOrange: '#EF8E5C',
  star: '#EFB238',
  success: '#3E8F6C',
  warn: '#B4772B',

  // Pastel topic/entry sets: background + text
  pastelBlueBg: '#DCEBFB',
  pastelBlueText: '#2C5C8F',
  pastelPeachBg: '#FCEFE6',
  pastelPeachText: '#A85A32',
  pastelLavenderBg: '#E6E1F7',
  pastelLavenderText: '#5B4F92',
  pastelMintBg: '#DFF3E7',
  pastelMintText: '#2F7A54',
  pastelSandBg: '#FBF3D8',
  pastelSandText: '#8A6D1D',
} as const;

export const gradients = {
  hero: [palette.skyStart, palette.skyMid, palette.skyEnd] as const,
  progress: [palette.skyStart, palette.progressEnd] as const,
  readerSky: [palette.skyStart, palette.skyMid2, palette.skyEnd2] as const,
};

export const colors = {
  background: palette.background,
  text: palette.ink,
  textSoft: palette.textSoft,
  textOnDark: palette.white,
  accent: palette.skyStart,
  accentOrange: palette.accentOrange,
  star: palette.star,
  border: palette.border,
  inputBackground: palette.inputBackground,
  chipInactive: palette.chipInactive,
  chipInactiveText: palette.chipInactiveText,
  trackBackground: '#EEF3FA',
  success: palette.success,
  warn: palette.warn,
  pastelBlueBg: palette.pastelBlueBg,
  pastelBlueText: palette.pastelBlueText,
  pastelPeachBg: palette.pastelPeachBg,
  pastelPeachText: palette.pastelPeachText,
  pastelLavenderBg: palette.pastelLavenderBg,
  pastelLavenderText: palette.pastelLavenderText,
  pastelMintBg: palette.pastelMintBg,
  pastelMintText: palette.pastelMintText,
  pastelSandBg: palette.pastelSandBg,
  pastelSandText: palette.pastelSandText,
};

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radii = {
  sm: 12,
  input: 14,
  md: 18,
  lg: 20,
  xl: 28,
  pill: 999,
};

export const fonts = {
  display: 'Manrope_800ExtraBold',
  displayExtra: 'Manrope_800ExtraBold',
  heading: 'Manrope_800ExtraBold',
  body: 'DMSans_500Medium',
  bodyRegular: 'DMSans_400Regular',
  bodySemibold: 'DMSans_600SemiBold',
  bodyBold: 'DMSans_700Bold',
};

export const shadow = {
  card: {
    shadowColor: 'rgba(27,42,61,1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 3,
  },
  hero: {
    shadowColor: 'rgba(74,144,226,1)',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.3,
    shadowRadius: 34,
    elevation: 10,
  },
  tabBar: {
    shadowColor: 'rgba(27,42,61,1)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 8,
  },
};

export type TopicKey =
  | 'consultative-selling'
  | 'direct-response-marketing'
  | 'copywriting'
  | 'lead-generation'
  | 'self-development';

export const topicMeta: Record<TopicKey, { label: string; icon: string; dot: string; bg: string; text: string }> = {
  'consultative-selling': {
    label: 'Consultative Selling',
    icon: 'people-outline',
    dot: palette.skyStart,
    bg: palette.pastelBlueBg,
    text: palette.pastelBlueText,
  },
  'direct-response-marketing': {
    label: 'Direct Response Marketing',
    icon: 'megaphone-outline',
    dot: palette.accentOrange,
    bg: palette.pastelPeachBg,
    text: palette.pastelPeachText,
  },
  copywriting: {
    label: 'Copywriting',
    icon: 'create-outline',
    dot: palette.pastelLavenderText,
    bg: palette.pastelLavenderBg,
    text: palette.pastelLavenderText,
  },
  'lead-generation': {
    label: 'Lead Generation',
    icon: 'trending-up-outline',
    dot: palette.pastelMintText,
    bg: palette.pastelMintBg,
    text: palette.pastelMintText,
  },
  'self-development': {
    label: 'Self Development',
    icon: 'book-outline',
    dot: palette.pastelSandText,
    bg: palette.pastelSandBg,
    text: palette.pastelSandText,
  },
};

export type EntryType = 'manifestation' | 'journal' | 'work-note';

export const entryTypeMeta: Record<EntryType, { label: string; bg: string; text: string }> = {
  manifestation: { label: 'Manifest', bg: palette.pastelBlueBg, text: palette.pastelBlueText },
  journal: { label: 'Journal', bg: palette.pastelLavenderBg, text: palette.pastelLavenderText },
  'work-note': { label: 'Work note', bg: palette.pastelMintBg, text: palette.pastelMintText },
};
