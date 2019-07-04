export default {
  path: 'pitch-deck-slides',
  title: 'Pitch Deck Slides',
  description:
    'Every entrepreneur will need to prepare a pitch deck. ‘Singularity Investments’, which invests in businesses in Africa and North America, recommends 10-12 slides in the following format',
  list: `
  <ol>
    <li>What do you do in 30 seconds (the elevator pitch)</li>
    <li>The Problem</li>
    <li>Your Solution (+ 1 slide here if you need it)</li>
    <li>Market Fit</li>
    <li>Market Size</li>
    <li>Business Model ($)</li>
    <li> Defensibility and IP </li>
    <li>Competition</li>
    <li>Distribution</li>
    <li>Team</li>
    <li>Money/Milestones</li>
    <li>Financials (only if it adds value)</li>
  </ol>
  `,
  next: {
    group_1: 'pitch-deck-text',
    group_2: 'pitch-deck-text',
    group_3: 'pitch-deck-text',
    group_4: 'pitch-deck-text',
    group_5: 'pitch-deck-text',
    group_6: 'pitch-deck-text',
  },
  prev: {
    group_1: 'what-you-need-pitch-deck',
    group_2: 'what-you-need-pitch-deck',
    group_3: 'what-you-need-pitch-deck',
    group_4: 'what-you-need-pitch-deck',
    group_5: 'what-you-need-pitch-deck',
    group_6: 'what-you-need-pitch-deck',
  },
  progress: 4,
}
