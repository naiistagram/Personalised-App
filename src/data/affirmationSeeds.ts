export type AffirmationCategory = 'manifestation' | 'work' | 'abundance' | 'confidence' | 'calm';

export type SeedAffirmation = {
  id: string;
  text: string;
  category: AffirmationCategory;
};

// A tailored starting set across the user's stated focus areas — manifestation,
// work/goals, and calm/grounding. Fully editable and extendable in-app.
export const affirmationSeeds: SeedAffirmation[] = [
  { id: 'a1', text: 'I am in the process of becoming the person my goals require.', category: 'manifestation' },
  { id: 'a2', text: 'What I water in my mind is what grows in my life.', category: 'manifestation' },
  { id: 'a3', text: 'I move through the world as someone who already has what she is building.', category: 'manifestation' },
  { id: 'a4', text: 'Every lesson I learn today compounds into the future I am manifesting.', category: 'manifestation' },
  { id: 'a5', text: 'My work is a direct expression of my discipline and my vision.', category: 'work' },
  { id: 'a6', text: 'I close every gap between where I am and where I am going, one clear action at a time.', category: 'work' },
  { id: 'a7', text: 'I sell, market, and communicate from a place of genuine value — and it comes back to me.', category: 'work' },
  { id: 'a8', text: 'My plans are flexible, but my commitment to my goals is not.', category: 'work' },
  { id: 'a9', text: 'Money and opportunity move toward clarity, consistency, and generosity — I practice all three.', category: 'abundance' },
  { id: 'a10', text: 'I am building wealth in skill, relationships, and mindset — and the money follows.', category: 'abundance' },
  { id: 'a11', text: 'I trust that the effort I can\'t yet see the results of is still working.', category: 'abundance' },
  { id: 'a12', text: 'I speak to myself the way I would coach someone I love.', category: 'confidence' },
  { id: 'a13', text: 'I am allowed to take up space with my ideas and my ambition.', category: 'confidence' },
  { id: 'a14', text: 'Every skill I am learning right now is making me harder to compete with.', category: 'confidence' },
  { id: 'a15', text: 'I return to stillness easily; my breath is always available to bring me back.', category: 'calm' },
  { id: 'a16', text: 'I release what I cannot control and put my energy into what I can.', category: 'calm' },
  { id: 'a17', text: 'Today, I choose presence over pressure.', category: 'calm' },
];
