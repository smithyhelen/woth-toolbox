'use client';

import { useContext, useEffect } from 'react';
import { HuntingMapTutorial } from 'components/HuntingMapTutorial';
import { TutorialContext } from 'contexts';

/**
 * Hook exposing the map tutorial component and its associated functionality
 *
 * @param enable Forces tutorial functionality to be enabled
 */
export const useTutorial = (enable = false) => {
  const {
    completed,
    defaultPageIndex,
    enabled,
    visible,
    onTutorialClose,
    onTutorialComplete,
    onTutorialEnable,
    onTutorialOpen,
  } = useContext(TutorialContext);

  useEffect(() => {
    onTutorialEnable(enable);
  }, [enable, onTutorialEnable]);

  useEffect(() => {
    if (!enabled || completed) {
      return;
    }

    onTutorialOpen();
  }, [completed, enabled, onTutorialOpen]);

  return {
    Tutorial: HuntingMapTutorial,
    tutorialProps: {
      defaultPageIndex,
      visible,
      onClose: onTutorialClose,
      onComplete: onTutorialComplete,
    },
    enabled,
    onTutorialOpen,
  };
};
