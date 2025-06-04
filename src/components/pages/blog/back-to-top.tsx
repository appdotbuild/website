'use client';

import { useEffect, useState } from 'react';

import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { CircleArrowUp } from 'lucide-react';

import { cn } from '@/lib/utils';

interface IScrollToTopProps {
  className?: string;
  label?: string;
}

function BackToTop({ className, label = 'Back to top' }: IScrollToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {visible ? (
          <m.button
            className={cn(
              'flex w-fit items-center gap-2 rounded-full text-sm leading-snug tracking-tight text-muted-foreground transition-colors duration-300 hover:text-secondary-foreground/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue',
              className,
            )}
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClick}
          >
            <CircleArrowUp size={20} />
            {label}
          </m.button>
        ) : (
          <span className={cn('invisible h-5', className)} aria-hidden />
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}

export default BackToTop;
