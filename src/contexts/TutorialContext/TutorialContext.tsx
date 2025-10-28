'use client';

import type { ReactNode } from 'react';
import { createContext } from 'react';
import { useTutorialManager } from 'hooks/useTutorialManager';
import type { TutorialContextValue } from './types';

export const TutorialContext = createContext<TutorialContextValue>({
  completed: false,
  defaultPageIndex: 0,
  enabled: false,
  visible: false,
  onTutorialClose: () => undefined,
  onTutorialComplete: () => undefined,
  onTutorialEnable: () => undefined,
  onTutorialOpen: () => undefined,
});

interface TutorialProviderProps {
  children: ReactNode;
}

export const TutorialProvider = ({ children }: TutorialProviderProps) => {
  const {
    completed,
    defaultPageIndex,
    enabled,
    visible,
    onTutorialClose,
    onTutorialComplete,
    onTutorialEnable,
    onTutorialOpen,
  } = useTutorialManager();

  const value: TutorialContextValue = {
    completed,
    defaultPageIndex,
    enabled,
    visible,
    onTutorialClose,
    onTutorialComplete,
    onTutorialEnable,
    onTutorialOpen,
  };

  return (
    <TutorialContext.Provider value={value}>
      {children}
    </TutorialContext.Provider>
  );
};
