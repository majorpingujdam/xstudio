import { useState, useEffect, useCallback } from 'react';
import { storyData, initialStoryState } from './storyData';
import { StoryState, Scene, Choice, SceneId } from './types';

export const useStoryEngine = () => {
  const [currentSceneId, setCurrentSceneId] = useState<SceneId>('tides-below');
  const [storyState, setStoryState] = useState<StoryState>(initialStoryState);

  const currentScene = storyData.find((s) => s.id === currentSceneId);

  const handleChoice = useCallback((choice: Choice) => {
    // If restarting, reset state and scene
    if (choice.id === 'restart') {
      setStoryState(initialStoryState);
      setCurrentSceneId('tides-below');
      return;
    }

    // Calculate updated state first
    let updatedState = { ...storyState };
    if (choice.stateEffects) {
      Object.entries(choice.stateEffects).forEach(([key, value]) => {
        if (key in updatedState) {
          if (typeof value === 'number' && typeof updatedState[key as keyof StoryState] === 'number') {
            (updatedState[key as keyof StoryState] as number) += value as number;
            // Clamp trust values
            if (key === 'trustLyra' || key === 'trustKael') {
              (updatedState[key as keyof StoryState] as number) = Math.max(
                -100,
                Math.min(100, updatedState[key as keyof StoryState] as number)
              );
            }
          } else {
            (updatedState[key as keyof StoryState] as any) = value;
          }
        }
      });
    }

    // Apply state update
    setStoryState(updatedState);

    // Determine next scene using updated state
    const nextSceneId =
      typeof choice.nextSceneId === 'function'
        ? choice.nextSceneId(updatedState)
        : choice.nextSceneId;

    setCurrentSceneId(nextSceneId);
  }, [storyState]);

  const getSceneText = useCallback((scene: Scene): string => {
    if (typeof scene.text === 'function') {
      return scene.text(storyState);
    }
    return scene.text;
  }, [storyState]);

  const getSceneChoices = useCallback((scene: Scene): Choice[] => {
    if (typeof scene.choices === 'function') {
      return scene.choices(storyState);
    }
    return scene.choices;
  }, [storyState]);

  const restart = useCallback(() => {
    setStoryState(initialStoryState);
    setCurrentSceneId('tides-below');
  }, []);

  return {
    currentScene,
    storyState,
    handleChoice,
    getSceneText,
    getSceneChoices,
    restart,
  };
};

