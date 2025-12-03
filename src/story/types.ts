export type SceneId = string;

export type TowerLevel = 'sea' | 'lower' | 'mid' | 'upper' | 'summit' | 'epilogue';

export type EndingType = 'tragic' | 'bittersweet' | 'revolt' | 'reform' | 'secret';

export interface StoryState {
  trustLyra: number; // -100 to 100
  trustKael: number; // from Lyra's perspective
  hasProof: boolean;
  kaelAlive: boolean;
  publicKnowsTruth: boolean;
  brinefolkRallyPotential: number;
}

export interface Choice {
  id: string;
  label: string;
  nextSceneId: SceneId | ((state: StoryState) => SceneId);
  stateEffects?: Partial<StoryState>;
}

export interface Scene {
  id: SceneId;
  title?: string;
  level: TowerLevel;
  text: string | ((state: StoryState) => string);
  choices: Choice[] | ((state: StoryState) => Choice[]);
  isEnding?: boolean;
  endingType?: EndingType;
}

