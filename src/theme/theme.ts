// Design language: neutral, tech-forward "liquid glass" — frosted glass
// surfaces over bright photography, grayscale palette with an ink-black
// accent, outline CTAs, clean Inter type.

export const palette = {
  paper: '#FAFAF9',
  white: '#FFFFFF',
  mist: '#F1F1EF',
  fog: '#E2E2DE',
  graphite: '#8A8A86',
  charcoal: '#3A3A38',
  ink: '#111110',
  cloudWhite: 'rgba(255,255,255,0.16)',
  cloudWhiteStrong: 'rgba(255,255,255,0.32)',
} as const;

export const gradients = {
  glassSheen: ['rgba(255,255,255,0.35)', 'rgba(255,255,255,0)'] as const,
  scrim: ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0)'] as const,
  ink: [palette.charcoal, palette.ink] as const,
};

export const colors = {
  background: palette.paper,
  text: palette.ink,
  textSoft: palette.graphite,
  textOnDark: palette.white,
  accent: palette.ink,
  accentSoft: palette.charcoal,
  border: 'rgba(17,17,16,0.14)',
  glass: palette.cloudWhite,
  glassStrong: palette.cloudWhiteStrong,
  chipInactive: 'rgba(255,255,255,0.5)',
  shadow: 'rgba(17,17,16,0.18)',
  success: '#3E8F6C',
  warn: '#B4772B',
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
  md: 20,
  lg: 28,
  pill: 999,
};

export const fonts = {
  display: 'Inter_700Bold',
  displayExtra: 'Inter_800ExtraBold',
  heading: 'Inter_600SemiBold',
  body: 'Inter_500Medium',
  bodyRegular: 'Inter_400Regular',
  bodySemibold: 'Inter_600SemiBold',
  bodyBold: 'Inter_700Bold',
};

export const shadow = {
  soft: {
    shadowColor: palette.ink,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 6,
  },
  glow: {
    shadowColor: palette.ink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Stable, warm/rich-toned remote photography sharing one hue family, used
// behind glass surfaces. Fixed Unsplash asset URLs (not the randomizing
// source.unsplash.com API) so the same photo always loads.
export const backgrounds = {
  default:
    'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1200&q=80',
  reading:
    'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',
};

export type TopicKey =
  | 'consultative-selling'
  | 'direct-response-marketing'
  | 'copywriting'
  | 'lead-generation'
  | 'self-development';

export const topicMeta: Record<TopicKey, { label: string; icon: string }> = {
  'consultative-selling': { label: 'Consultative Selling', icon: 'people-outline' },
  'direct-response-marketing': { label: 'Direct Response Marketing', icon: 'megaphone-outline' },
  copywriting: { label: 'Copywriting', icon: 'create-outline' },
  'lead-generation': { label: 'Lead Generation', icon: 'trending-up-outline' },
  'self-development': { label: 'Self Development', icon: 'book-outline' },
};
