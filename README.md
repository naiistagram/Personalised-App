# Cloud

A personal growth app for your phone: bite-sized lessons, a work &amp; goals
planner, a manifestation/journal space, tailored affirmations, and gentle
push-notification reminders — wrapped in a soft, cloud-and-liquid-glass UI.

Built with [Expo](https://expo.dev) (React Native) + [expo-router](https://docs.expo.dev/router/introduction/),
so it runs as a real iOS/Android app (and in a browser) from one codebase.

## Getting started

```bash
npm install
npx expo start
```

Then either:
- press `i` for the iOS simulator, `a` for Android, or `w` for web, or
- scan the QR code with the **Expo Go** app on your phone.

## What's inside

| Tab | What it does |
| --- | --- |
| **Today** | Greeting, today's affirmation, streak, next lesson, today's plan snapshot |
| **Learn** | Deepstash-style bite-sized lessons on consultative selling, direct response marketing, copywriting, lead generation, and self development — swipe/tap through short "idea cards", track streaks |
| **Planner** | Quick-add tasks (work / goal / personal), due dates, and a simple goals tracker with progress bars |
| **Manifest** | Journal, manifestation, and work-note entries, plus an editable list of affirmations tailored to manifestation, work, abundance, confidence and calm — favorite one to make it your "affirmation of the day" |
| **You** | Your name, and reminder scheduling: morning affirmation, a learning nudge, meditate/pray, and an evening journal prompt — each with its own on/off toggle and time |

All data is stored **locally on-device** (AsyncStorage) — there's no backend,
account, or sync yet. Uninstalling the app clears it.

## Notifications

Reminders are scheduled locally with `expo-notifications` (no server
required). The first time you open the **You** tab it will ask for
notification permission and schedule the reminders that are on by default.

To use a **custom notification sound** instead of the system default:
1. Drop an `.mp3`/`.wav` file into `assets/sounds/`.
2. Add it to the `expo-notifications` plugin config in `app.json`:
   ```json
   ["expo-notifications", { "sounds": ["./assets/sounds/chime.wav"] }]
   ```
3. Pass the filename (e.g. `"chime.wav"`) as the `sound` value in
   `src/lib/notifications.ts`.
4. Rebuild the app (custom sounds require a native rebuild, not just a
   Metro reload — `npx expo run:ios` / `npx expo run:android`, or a new
   EAS build).

## Design system

Everything visual lives in `src/theme/theme.ts` (palette, gradients,
fonts, spacing) and `src/components/Glass*.tsx` (the frosted "liquid
glass" building blocks — `GlassSurface`, `GlassCard`, `GlassPill`,
`GlassInput`). Headings use **Baloo 2** (rounded, quirky), body text uses
**Nunito** (warm, easy to read) — both loaded as local Google Fonts, no
network needed at runtime.

## Project structure

```
src/
  app/                 expo-router routes (file-based navigation)
    (tabs)/            the 5 bottom-tab screens
    _layout.tsx         root layout: font loading, splash screen
  components/          shared UI (glass surfaces, pills, cloud background, tab bar)
  data/                seed content: learning library, affirmation starters
  lib/                 notifications + AsyncStorage helpers
  store/               zustand stores (learning, planner, manifest, settings)
  theme/                colors, gradients, fonts, spacing
```

## Notes

- Web support works (`npx expo start --web`) for quick previewing, but the
  richest experience — haptics, native notification scheduling, the native
  tab bar feel — is on a real device or simulator.
- The Learn library currently ships with 15 hand-written lessons (~50
  ideas) across the five topics; add more by appending to
  `src/data/learningLibrary.ts`.
