import { Scene, StoryState } from './types';

export const initialStoryState: StoryState = {
  trustLyra: 0,
  trustKael: 0,
  hasProof: false,
  kaelAlive: true,
  publicKnowsTruth: false,
  brinefolkRallyPotential: 0,
};

export const storyData: Scene[] = [
  // Act I - Ascent from the Sea
  {
    id: 'tides-below',
    title: 'Tides Below',
    level: 'sea',
    text: `The corrosive water churns around the base of the Rustspire, its chemical glow casting an eerie luminescence through the murk. You are Kael, a Diver of the Brinefolk, and you've just surfaced with something that could change everything: proof that the Skyborn hoard clean water while your people drink poison.

The evidence is fragile—a data crystal, still wet from the depths. Above you, the tower stretches impossibly high, its metal bones rusted and patched, each level a world away from the next.

You need to get this proof to someone who matters. But how?`,
    choices: [
      {
        id: 'secure-proof',
        label: 'Secure the proof carefully in your diving gear',
        nextSceneId: 'echoes-brine',
        stateEffects: { hasProof: true, trustKael: 10 },
      },
      {
        id: 'rush-ladders',
        label: 'Rush straight to the ladders—time is critical',
        nextSceneId: 'echoes-brine',
        stateEffects: { hasProof: true, trustKael: -5 },
      },
      {
        id: 'visit-community',
        label: 'Visit the Brinefolk community first—they need to know',
        nextSceneId: 'echoes-brine',
        stateEffects: { hasProof: true, brinefolkRallyPotential: 15, trustKael: 15 },
      },
    ],
  },
  {
    id: 'echoes-brine',
    title: 'Echoes of Brine',
    level: 'lower',
    text: `The lower levels of the Rustspire are a maze of patched metal, salvaged materials, and the constant sound of dripping water—most of it toxic. Here, the Brinefolk have carved out a life of resilience.

Elder Mara approaches, her weathered face creased with concern. "Kael, you've been gone too long. What did you find down there?"

Around you, families share what little clean water they've managed to filter, children play in the shadows, and the ever-present hum of the tower's machinery reminds you of the weight above.

You can show them the proof now, or wait until you've climbed higher.`,
    choices: [
      {
        id: 'show-proof',
        label: 'Show Elder Mara the proof—the community deserves to know',
        nextSceneId: 'gate-glass',
        stateEffects: { brinefolkRallyPotential: 20, trustKael: 20, publicKnowsTruth: true },
      },
      {
        id: 'keep-secret',
        label: 'Keep it secret for now—you need to reach someone with real power',
        nextSceneId: 'gate-glass',
        stateEffects: { trustKael: 5 },
      },
      {
        id: 'rally-now',
        label: 'Try to rally the Brinefolk immediately',
        nextSceneId: 'gate-glass',
        stateEffects: { brinefolkRallyPotential: 30, trustKael: 25, hasProof: false },
      },
    ],
  },
  {
    id: 'gate-glass',
    title: 'Gate of Glass',
    level: 'mid',
    text: `The mid-levels are separated by barriers—literal gates of reinforced glass and steel. Here, the air is cleaner, but the divide is palpable. Skyborn guards patrol, their expressions cold and dismissive.

You catch a glimpse of someone on the other side: a young woman with silver hair, watching you with an intensity that doesn't match the indifference of her peers. Lyra. You've heard her name whispered in the lower levels—the Skyborn heir who questions the system.

A guard notices your approach. "Brinefolk don't belong here. Turn back."

But Lyra steps forward, her voice cutting through the tension. "Wait. I want to hear what he has to say."`,
    choices: [
      {
        id: 'confront-guard',
        label: 'Confront the guard—demand to be heard',
        nextSceneId: 'sky-garden',
        stateEffects: { trustLyra: 5, trustKael: -10 },
      },
      {
        id: 'appeal-lyra',
        label: 'Appeal directly to Lyra—show her the proof',
        nextSceneId: 'sky-garden',
        stateEffects: { trustLyra: 15, hasProof: true },
      },
      {
        id: 'retreat',
        label: 'Retreat for now—find another way up',
        nextSceneId: 'sky-garden',
        stateEffects: { trustLyra: -5 },
      },
    ],
  },
  {
    id: 'sky-garden',
    title: 'Sky Garden Reservoir',
    level: 'upper',
    text: `Lyra has arranged a private meeting in the Sky Garden—a place where clean water flows freely, stored in crystal reservoirs that catch the filtered light from above. The contrast to the lower levels is stark, almost painful.

"You're Kael," she says, not a question. "I've heard about you. About what you found."

She moves closer, her hand hovering near one of the reservoirs. "My family controls this. All of it. And they've been lying to everyone below."

The air between you is charged with possibility. You could trust her. Or you could see this as a trap.`,
    choices: [
      {
        id: 'trust-vulnerable',
        label: 'Be vulnerable—tell her everything, show her the proof',
        nextSceneId: 'above-veil',
        stateEffects: { trustLyra: 25, hasProof: true },
      },
      {
        id: 'test-her',
        label: 'Test her—ask what she plans to do about it',
        nextSceneId: 'above-veil',
        stateEffects: { trustLyra: 10 },
      },
      {
        id: 'demand-action',
        label: 'Demand immediate action—no more waiting',
        nextSceneId: 'above-veil',
        stateEffects: { trustLyra: -10, trustKael: 5 },
      },
    ],
  },
  {
    id: 'above-veil',
    title: 'Above the Veil',
    level: 'upper',
    text: `The Summit is within reach, but it's heavily guarded. Lyra stands with you at the threshold, her expression conflicted.

"I can get you up there," she says quietly. "But if you reveal the truth publicly, my family will never forgive me. I'll lose everything."

She looks at you, and for a moment, you see the weight of her position. "But maybe that's what needs to happen."

The choice is yours—and hers. How do you want to proceed?`,
    choices: [
      {
        id: 'lyra-open-support',
        label: 'Ask Lyra to openly support you—stand together',
        nextSceneId: (state: StoryState) => {
          if (state.trustLyra >= 40) return 'summit-confrontation';
          return 'summit-confrontation';
        },
        stateEffects: { trustLyra: 15 },
      },
      {
        id: 'lyra-secret-help',
        label: 'Accept her secret help—you\'ll face the Summit alone',
        nextSceneId: 'summit-confrontation',
        stateEffects: { trustLyra: 10 },
      },
      {
        id: 'go-alone',
        label: 'Go alone—this is your fight, not hers',
        nextSceneId: 'summit-confrontation',
        stateEffects: { trustLyra: -15 },
      },
    ],
  },
  {
    id: 'summit-confrontation',
    title: 'The Summit',
    level: 'summit',
    text: (state: StoryState) => {
      if (state.trustLyra >= 40 && state.hasProof) {
        return `The Summit chamber is vast, all glass and polished metal. Lyra stands beside you as you face the Skyborn Council. Her presence gives you strength.

"You have proof," Councilor Vex says, his voice cold. "But proof means nothing if no one believes you."

Lyra steps forward. "I believe him. And I stand with him."

The room erupts. This is the moment of truth.`;
      } else if (state.trustLyra < 0) {
        return `You reach the Summit alone, the proof heavy in your hands. But without allies, without support, you're vulnerable.

The Skyborn Council surrounds you, their expressions hostile. "A Brinefolk diver, here? How did you get past security?"

You realize too late that you're outnumbered, outmatched. The proof might not be enough.`;
      } else {
        return `The Summit chamber looms before you. You have the proof, but the path forward is uncertain. The Skyborn Council awaits, and their judgment will determine everything.

Lyra is somewhere nearby—you can feel her presence, but whether she'll stand with you or against you remains to be seen.`;
      }
    },
    choices: (state: StoryState) => {
      const choices = [];
      
      if (state.trustLyra >= 40 && state.hasProof) {
        choices.push({
          id: 'public-reveal-together',
          label: 'Reveal the truth publicly with Lyra at your side',
          nextSceneId: 'ending-reform',
          stateEffects: { publicKnowsTruth: true, trustLyra: 20 },
        });
      }
      
      if (state.hasProof && state.brinefolkRallyPotential >= 20) {
        choices.push({
          id: 'broadcast-revolt',
          label: 'Broadcast the truth to all levels—spark a revolt',
          nextSceneId: 'ending-revolt',
          stateEffects: { publicKnowsTruth: true, brinefolkRallyPotential: 50 },
        });
      }
      
      if (state.trustLyra >= 30 && !state.hasProof) {
        choices.push({
          id: 'lyra-quiet-reform',
          label: 'Let Lyra handle it quietly—trust her to make change',
          nextSceneId: 'ending-bittersweet',
          stateEffects: { trustLyra: 10 },
        });
      }
      
      if (state.trustLyra < 20 || !state.hasProof) {
        choices.push({
          id: 'confront-alone',
          label: 'Confront the Council alone—demand justice',
          nextSceneId: 'ending-tragic',
          stateEffects: { kaelAlive: false },
        });
      }
      
      choices.push({
        id: 'escape-secret',
        label: 'Escape with the proof—find another way',
        nextSceneId: 'ending-secret',
        stateEffects: { hasProof: true },
      });
      
      return choices;
    },
  },
  // ENDINGS
  {
    id: 'ending-tragic',
    title: 'Fall of Kael',
    level: 'epilogue',
    isEnding: true,
    endingType: 'tragic',
    text: (state: StoryState) => `The Skyborn enforcers move without mercy. You try to show them the proof, but it's too late—or not enough. The guards close in, and the last thing you see is Lyra's face, her expression a mix of horror and helplessness.

Your body is cast into the corrosive ocean below, the proof lost to the depths.

**Epilogue:** The Rustspire remains unchanged. The Skyborn continue to hoard clean water, and the Brinefolk continue to suffer. Lyra lives with the weight of what might have been, but the system endures, unbroken and unjust.

*Ending: Tragic*`,
    choices: [
      {
        id: 'restart',
        label: 'Restart from Sea',
        nextSceneId: 'tides-below',
      },
    ],
  },
  {
    id: 'ending-bittersweet',
    title: 'Whispered Reforms',
    level: 'epilogue',
    isEnding: true,
    endingType: 'bittersweet',
    text: (state: StoryState) => `You disappear into the lower levels, presumed dead by the Skyborn. But Lyra doesn't forget. Using her status and influence, she begins to make quiet changes: cleaner water filters distributed to the Brinefolk, better access to medical supplies, small but meaningful improvements.

The system remains, but it softens. The divide between Skyborn and Brinefolk doesn't disappear, but it becomes less absolute. You live in the shadows, knowing that change is happening, even if slowly.

**Epilogue:** Years pass. The Rustspire still stands, but whispers of reform spread through its levels. Lyra works from within, and you watch from below, two halves of a story that might yet find its way.

*Ending: Bittersweet Reform*`,
    choices: [
      {
        id: 'restart',
        label: 'Restart from Sea',
        nextSceneId: 'tides-below',
      },
    ],
  },
  {
    id: 'ending-revolt',
    title: 'Rustspire Burns',
    level: 'epilogue',
    isEnding: true,
    endingType: 'revolt',
    text: (state: StoryState) => `The truth spreads like fire through the tower. The Brinefolk rise up, their anger finally given voice. The proof you carried becomes a symbol, broadcast across every level.

The Rustspire shakes with the force of rebellion. Metal groans, barriers break, and for the first time in generations, the levels are breached. Skyborn and Brinefolk clash, and the tower itself becomes unstable.

${state.trustLyra >= 30 ? `You and Lyra find each other in the chaos, fighting side by side. The future is uncertain, but you face it together.` : `You fight alone, the tower collapsing around you. Whether you and Lyra survive is a question lost to the chaos.`}

**Epilogue:** The Rustspire burns, but from its ashes, something new might rise. Or perhaps it all falls into the corrosive sea. The ending is written in fire and water.

*Ending: Revolt*`,
    choices: [
      {
        id: 'restart',
        label: 'Restart from Sea',
        nextSceneId: 'tides-below',
      },
    ],
  },
  {
    id: 'ending-reform',
    title: 'Shared Horizon',
    level: 'epilogue',
    isEnding: true,
    endingType: 'reform',
    text: (state: StoryState) => `With Lyra at your side, you reveal the truth to the entire Rustspire. The proof is undeniable, and her support gives it weight. The Skyborn Council is forced to listen.

A new council forms—Skyborn and Brinefolk, working together. It's not perfect, and the old divisions don't disappear overnight, but for the first time, there's hope. Clean water is distributed more fairly, and the levels begin to blur.

**Epilogue:** You and Lyra stand together at the Summit, looking out over the tower you've helped reshape. The Rustspire still stands, but it's different now. The future is uncertain, but it's yours to build together.

*Ending: Reform from Within*`,
    choices: [
      {
        id: 'restart',
        label: 'Restart from Sea',
        nextSceneId: 'tides-below',
      },
    ],
  },
  {
    id: 'ending-secret',
    title: 'Return to the Tides',
    level: 'epilogue',
    isEnding: true,
    endingType: 'secret',
    text: (state: StoryState) => `You abandon the Summit, the proof still in your possession. The Rustspire is too broken, too entrenched. Some battles can't be won from within.

${state.trustLyra >= 30 ? `Lyra finds you before you leave. "Take me with you," she says. "I can't stay here, not knowing what I know now."` : `You leave alone, slipping back into the corrosive waters.`}

You dive deep, searching for other towers, other possibilities. The Rustspire fades behind you, a monument to a system you chose to escape rather than reform.

**Epilogue:** The ocean is vast, and somewhere in its depths, there might be other towers, other stories. You and ${state.trustLyra >= 30 ? 'Lyra' : 'the proof'} carry the hope of something different, something better. The ending is ambiguous, but it's yours.

*Ending: Secret Ocean*`,
    choices: [
      {
        id: 'restart',
        label: 'Restart from Sea',
        nextSceneId: 'tides-below',
      },
    ],
  },
];

