import type { TopicKey } from '@/theme/theme';

export type LessonCard = {
  id: string;
  heading: string;
  body: string;
};

export type Lesson = {
  id: string;
  topic: TopicKey;
  title: string;
  estMinutes: number;
  cards: LessonCard[];
};

const lesson = (topic: TopicKey, id: string, title: string, cards: [string, string][]): Lesson => ({
  id,
  topic,
  title,
  estMinutes: Math.max(2, Math.round(cards.length * 0.8)),
  cards: cards.map(([heading, body], i) => ({ id: `${id}-c${i + 1}`, heading, body })),
});

export const learningLibrary: Lesson[] = [
  // ---------- Consultative Selling ----------
  lesson('consultative-selling', 'cs-1', 'Diagnose before you prescribe', [
    [
      'Sell like a doctor, not a vending machine',
      'A good doctor asks questions and examines symptoms before writing a prescription. Consultative selling works the same way: earn the right to recommend by understanding the problem first.',
    ],
    [
      'The cost of pitching too early',
      'When you pitch before you understand the buyer\'s situation, every objection you hear afterward is really them saying "you don\'t understand my problem yet."',
    ],
    [
      'Questions build more trust than answers',
      'Buyers trust people who ask sharp, specific questions more than people who have slick answers. Curiosity signals competence.',
    ],
    [
      'Your first job is a working hypothesis',
      'Go into a discovery call with a hypothesis about their problem, then use questions to confirm, refine, or throw it out entirely.',
    ],
  ]),
  lesson('consultative-selling', 'cs-2', 'Uncovering real pain with SPIN', [
    [
      'Situation questions set the stage',
      'Ask just enough situation questions to orient yourself — too many and the buyer feels interrogated, not helped.',
    ],
    [
      'Problem questions surface friction',
      '"What\'s the hardest part of X right now?" invites a buyer to name a pain point in their own words, which is more persuasive than you naming it for them.',
    ],
    [
      'Implication questions grow the stakes',
      'Ask what happens if the problem stays unsolved for another six months. This isn\'t manipulation — it\'s helping them see the true cost they\'ve normalized.',
    ],
    [
      'Need-payoff questions sell themselves',
      '"If we could solve that, what would it mean for your team?" — let the buyer articulate the value. People believe their own conclusions far more than yours.',
    ],
  ]),
  lesson('consultative-selling', 'cs-3', 'Handling objections like a partner', [
    [
      'An objection is a request for more information',
      'Almost no objection is a hard "no." Treat it as "I don\'t have enough certainty yet," and respond with clarity, not pressure.',
    ],
    [
      'Feel, felt, found — carefully',
      '"I understand how you feel, others have felt the same, here\'s what they found" works only when it\'s genuinely true — buyers can smell a script.',
    ],
    [
      'Price objections are often value objections',
      'If someone says it\'s too expensive, they usually mean the value isn\'t clear yet, not that the number is literally unaffordable.',
    ],
    [
      'Silence is a tool',
      'After you answer an objection, stop talking. The instinct to fill silence often talks buyers out of a decision they were about to make.',
    ],
  ]),

  // ---------- Direct Response Marketing ----------
  lesson('direct-response-marketing', 'drm-1', 'Every ad needs a next action', [
    [
      'Brand advertising vs. direct response',
      'Brand ads build awareness over years. Direct response asks for a specific, measurable action right now — click, call, buy, sign up.',
    ],
    [
      'The one-thing rule',
      'A direct response piece should ask for exactly one action. Every extra choice you offer is a chance for the reader to do nothing.',
    ],
    [
      'Trackability is the whole point',
      'If you can\'t measure what an ad produced, you can\'t know if it worked. Direct response lives and dies on attribution.',
    ],
    [
      'Urgency isn\'t a trick, it\'s a nudge',
      'Genuine deadlines and limited availability help people who already want to act overcome the friction of "I\'ll do it later."',
    ],
  ]),
  lesson('direct-response-marketing', 'drm-2', 'The offer is more important than the ad', [
    [
      'A weak offer kills a great ad',
      'No amount of clever copy fixes an offer nobody wants. Fix the offer before you touch the words.',
    ],
    [
      'Stack value, then reveal price',
      'List everything included before you show the cost, so the price lands against a pile of value instead of standing alone.',
    ],
    [
      'Risk reversal removes the last excuse',
      'Guarantees move the risk of a bad decision from the buyer to the seller — which is exactly why they work.',
    ],
    [
      'Test the offer, not just the headline',
      'Two different offers usually produce a bigger swing in results than two different headlines for the same offer.',
    ],
  ]),
  lesson('direct-response-marketing', 'drm-3', 'Reading response data honestly', [
    [
      'Vanity metrics vs. money metrics',
      'Likes and impressions feel good. Cost per lead and return on ad spend tell you the truth.',
    ],
    [
      'One winning variable at a time',
      'Change one element — headline, image, or offer — per test, or you won\'t know what actually moved the number.',
    ],
    [
      'Kill underperformers fast, scale winners slowly',
      'Cut what\'s clearly not working quickly, but scale a winner in steps so you can see when performance starts to fade.',
    ],
  ]),

  // ---------- Copywriting ----------
  lesson('copywriting', 'cw-1', 'AIDA, still the backbone', [
    [
      'Attention: earn the first five words',
      'If the headline doesn\'t stop the scroll, nothing below it matters — most people never get further.',
    ],
    [
      'Interest: talk about them, not you',
      'Interest is held by relevance. Lead with the reader\'s situation and desires before you mention your product.',
    ],
    [
      'Desire: make the benefit vivid',
      'Don\'t just list features — paint the specific, sensory outcome of using them. People buy the after, not the mechanism.',
    ],
    [
      'Action: tell them exactly what to do',
      'Vague endings lose sales. Give one explicit next step: "Tap Start Free Trial below."',
    ],
  ]),
  lesson('copywriting', 'cw-2', 'Write the way people actually talk', [
    [
      'Read it out loud',
      'If a sentence feels awkward in your mouth, it\'ll feel awkward in someone\'s head. Reading aloud is the fastest edit test.',
    ],
    [
      'Short sentences carry more force',
      'Short sentences hit harder. Save longer ones for when you want a slower, more reflective rhythm.',
    ],
    [
      'Specificity beats adjectives',
      '"Saves 4 hours a week" out-persuades "saves a ton of time" every time. Numbers and specifics feel true; adjectives feel like marketing.',
    ],
    [
      'Cut the throat-clearing',
      'Delete the first paragraph of most drafts — it\'s usually you warming up, not the reader\'s hook.',
    ],
  ]),
  lesson('copywriting', 'cw-3', 'Headlines that earn the next line', [
    [
      'A headline has one job',
      'Its only job is to get the first sentence read. It doesn\'t need to sell the whole product.',
    ],
    [
      'Curiosity plus benefit beats either alone',
      'Pure curiosity ("You won\'t believe this") feels clickbait-y. Pure benefit can feel flat. Combine a concrete benefit with an open loop.',
    ],
    [
      'Borrow proven shapes, don\'t reinvent',
      '"How to X without Y", "The X-minute Y", "Why most people get X wrong" are proven shapes precisely because they map to real reader questions.',
    ],
  ]),

  // ---------- Lead Generation ----------
  lesson('lead-generation', 'lg-1', 'A lead magnet is a promise, not a bribe', [
    [
      'Solve one small problem completely',
      'The best lead magnets fully solve one narrow problem rather than partially covering a broad one — completeness builds trust.',
    ],
    [
      'It should preview the paid solution',
      'A great lead magnet gives a real win and naturally reveals why the fuller paid solution is worth having next.',
    ],
    [
      'Friction kills conversion',
      'Every extra form field is a chance to lose someone. Ask for the minimum you need to deliver the value and follow up well.',
    ],
  ]),
  lesson('lead-generation', 'lg-2', 'Warm leads before you ever pitch', [
    [
      'Nurture sequences do the trust-building work',
      'A short email sequence that delivers value on autopilot means you\'re not starting from zero on every sales call.',
    ],
    [
      'Segment by intent, not just demographics',
      'Someone who downloaded a beginner guide needs different follow-up than someone who asked for pricing — treat those signals differently.',
    ],
    [
      'Speed to lead matters more than people think',
      'Response time in the first few minutes after a lead raises their hand has an outsized effect on whether they convert at all.',
    ],
  ]),
  lesson('lead-generation', 'lg-3', 'Where leads actually come from', [
    [
      'Owned, earned, and paid — use all three',
      'Owned (your list), earned (referrals, content, word of mouth), and paid (ads) each behave differently — relying on just one is fragile.',
    ],
    [
      'Referrals are a system, not an accident',
      'Ask for referrals at the specific moment a customer is happiest — right after a clear win — and make the ask easy to act on.',
    ],
    [
      'Content compounds, ads don\'t',
      'A good piece of content can generate leads for years. An ad stops the moment you stop paying. Balance the two for short and long-term flow.',
    ],
  ]),

  // ---------- Self Development ----------
  lesson('self-development', 'sd-1', 'Identity drives behavior', [
    [
      'Change the belief, not just the habit',
      'Lasting change tends to follow from seeing yourself as "a person who does X" rather than white-knuckling a new behavior.',
    ],
    [
      'Small wins build identity evidence',
      'Every time you keep a small promise to yourself, you\'re casting a vote for the identity you want — the votes accumulate.',
    ],
    [
      'Environment beats willpower',
      'Redesigning your environment to make the good choice the easy choice outperforms relying on motivation, which is finite.',
    ],
  ]),
  lesson('self-development', 'sd-2', 'Focus is a filter, not a feeling', [
    [
      'You can\'t do everything — so choose on purpose',
      'Saying yes to a priority means consciously saying no to several good alternatives. Undefined priorities get chosen for you by whatever\'s loudest.',
    ],
    [
      'One thing at a time, done well',
      'Deep, sequential focus on the most important task produces more real progress than shallow multitasking across many.',
    ],
    [
      'Review the week before you plan the next one',
      'A short honest review of what worked and what didn\'t makes next week\'s plan sharper than starting from a blank page.',
    ],
  ]),
  lesson('self-development', 'sd-3', 'The stories you tell yourself', [
    [
      'Your inner narrator isn\'t always right',
      'The voice narrating "I always mess this up" is a habit of thought, not a fact — habits of thought can be retrained like any other habit.',
    ],
    [
      'Reframe the obstacle as the way',
      'Treating a setback as data about what to adjust — rather than proof you shouldn\'t have tried — keeps you moving instead of stuck.',
    ],
    [
      'Gratitude rewires attention',
      'Regularly naming specific things you\'re grateful for trains your attention to notice more of them — attention goes where it\'s practiced.',
    ],
  ]),
];

export const topicOrder: TopicKey[] = [
  'consultative-selling',
  'direct-response-marketing',
  'copywriting',
  'lead-generation',
  'self-development',
];

export function lessonsByTopic(topic: TopicKey) {
  return learningLibrary.filter((l) => l.topic === topic);
}
