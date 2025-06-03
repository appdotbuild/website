import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { Rive } from '@rive-app/canvas';

type UseRiveAnimationProps = {
  withReset?: boolean;
  threshold?: number;
  isPlayFromStart?: boolean;
};

export default function useRiveAnimation({
  withReset = false,
  threshold = 0.1,
  isPlayFromStart = true,
}: UseRiveAnimationProps) {
  const [riveInstance, setRiveInstance] = useState<Rive | null>(null);

  const { ref: wrapperRef, inView: isIntersecting } = useInView({
    triggerOnce: true,
    rootMargin: '500px 0px',
  });

  const { ref: animationRef, inView: isVisible } = useInView({
    threshold,
  });

  useEffect(() => {
    if (riveInstance) {
      if (isVisible) {
        isPlayFromStart && riveInstance.play();
      } else {
        if (withReset) {
          riveInstance.reset();
        }
        riveInstance.pause();
      }
    }
  }, [riveInstance, isVisible, withReset, isPlayFromStart]);

  return {
    riveInstance,
    wrapperRef,
    animationRef,
    isVisible,
    isIntersecting,
    setRiveInstance,
  };
}
