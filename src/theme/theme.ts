// Design language: "Cloud" — soft pastel gradients, liquid-glass pills & cards,
// rounded quirky headers over warm, easy-to-read body text.

export const palette = {
  lavenderMist: '#F2E9FF',
  blush: '#FFE6F2',
  skyfoam: '#E4F1FF',
  cream: '#FFF9F0',
  lilac: '#C9A6FF',
  lilacDeep: '#9A6BFF',
  pink: '#FF8FC0',
  pinkDeep: '#FF5FA6',
  peach: '#FFC29E',
  mint: '#A8E6CF',
  sky: '#8FD3FE',
  plum: '#3A2E52',
  plumSoft: '#6B5C8C',
  white: '#FFFFFF',
  cloudWhite: 'rgba(255,255,255,0.55)',
  cloudWhiteStrong: 'rgba(255,255,255,0.78)',
  ink: '#241C36',
} as const;

export const gradients = {
  sky: [palette.lavenderMist, palette.skyfoam, palette.blush] as const,
  dawn: [palette.blush, palette.peach] as const,
  dusk: [palette.lilac, palette.pink] as const,
  meadow: [palette.mint, palette.sky] as const,
  hero: [palette.lilacDeep, palette.pinkDeep] as const,
  glassSheen: ['rgba(255,255,255,0.65)', 'rgba(255,255,255,0.15)'] as const,
};

export const colors = {
  background: palette.lavenderMist,
  text: palette.ink,
  textSoft: palette.plumSoft,
  textOnDark: palette.white,
  accent: palette.lilacDeep,
  accentSoft: palette.lilac,
  accentAlt: palette.pinkDeep,
  border: 'rgba(255,255,255,0.6)',
  glass: palette.cloudWhite,
  glassStrong: palette.cloudWhiteStrong,
  shadow: 'rgba(154,107,255,0.25)',
  success: '#5FCF9B',
  warn: '#FFB86B',
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
  display: 'Baloo2_700Bold',
  displayExtra: 'Baloo2_800ExtraBold',
  heading: 'Baloo2_600SemiBold',
  body: 'Nunito_500Medium',
  bodyRegular: 'Nunito_400Regular',
  bodySemibold: 'Nunito_600SemiBold',
  bodyBold: 'Nunito_700Bold',
};

export const shadow = {
  soft: {
    shadowColor: palette.lilacDeep,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 6,
  },
  glow: {
    shadowColor: palette.pinkDeep,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 8,
  },
};

export type TopicKey =
  | 'consultative-selling'
  | 'direct-response-marketing'
  | 'copywriting'
  | 'lead-generation'
  | 'self-development';

export const topicMeta: Record<TopicKey, { label: string; emoji: string; gradient: readonly [string, string] }> = {
  'consultative-selling': { label: 'Consultative Selling', emoji: '🤝', gradient: [palette.sky, palette.lilac] },
  'direct-response-marketing': { label: 'Direct Response Marketing', emoji: '📣', gradient: [palette.peach, palette.pink] },
  copywriting: { label: 'Copywriting', emoji: '✍️', gradient: [palette.lilac, palette.pinkDeep] },
  'lead-generation': { label: 'Lead Generation', emoji: '🌱', gradient: [palette.mint, palette.sky] },
  'self-development': { label: 'Self Development', emoji: '📚', gradient: [palette.blush, palette.lilac] },
};
