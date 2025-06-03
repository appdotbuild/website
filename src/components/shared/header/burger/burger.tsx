'use client';

import clsx from 'clsx';
import { LazyMotion, domAnimation, m } from 'framer-motion';

const ANIMATION_DURATION = 0.2;

function Burger({
  className,
  isToggled,
  onClick,
}: {
  className?: string;
  isToggled: boolean;
  onClick: () => void;
}) {
  return (
    <LazyMotion features={domAnimation}>
      <m.button
        className={clsx('relative', className)}
        type="button"
        animate={isToggled ? 'toggled' : 'initial'}
        aria-label={isToggled ? 'Close menu' : 'Open menu'}
        onClick={onClick}
      >
        <span className="absolute -inset-3" aria-hidden />
        <span className="relative block h-6 w-6">
          <m.span
            className="absolute left-1 top-2 block h-0.5 w-4 rounded-full bg-[#000] transition-colors duration-200"
            variants={{
              initial: {
                top: 8,
                left: 4,
                width: 16,
                rotate: '0deg',
                opacity: 1,
                transition: {
                  top: { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION },
                  rotate: { duration: ANIMATION_DURATION },
                },
              },
              toggled: {
                top: 12,
                left: 2,
                width: 20,
                rotate: '45deg',
                transition: {
                  top: { duration: ANIMATION_DURATION },
                  rotate: { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION },
                },
              },
            }}
          />
          <m.span
            className="absolute left-1 top-4 block h-0.5 w-4 rounded-full bg-[#000] transition-colors duration-200"
            variants={{
              initial: {
                top: 16,
                left: 4,
                width: 16,
                rotate: '0deg',
                opacity: 1,
                transition: {
                  top: { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION },
                  rotate: { duration: ANIMATION_DURATION },
                },
              },
              toggled: {
                top: 12,
                left: 2,
                width: 20,
                rotate: '-45deg',
                transition: {
                  top: { duration: ANIMATION_DURATION },
                  rotate: { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION },
                },
              },
            }}
          />
        </span>
      </m.button>
    </LazyMotion>
  );
}

export default Burger;
