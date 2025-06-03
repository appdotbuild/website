'use client';

import { usePathname } from 'next/navigation';

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';

import clsx from 'clsx';
import { LazyMotion, domAnimation, m } from 'framer-motion';

import Link from '@/components/shared/link';

import { IMenuItem } from '@/types/menus';

import { ROUTE } from '@/constants/route';

const ANIMATION_DURATION = 0.2;
const NO_ANIMATION_DURATION = 0;

function Navigation({ items }: { items: IMenuItem[] }) {
  const pathname = usePathname();
  const navRef = useRef<HTMLUListElement>(null);
  const [linkRefs, setLinkRefs] = useState<(HTMLAnchorElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useLayoutEffect(() => {
    setLinkRefs((prev) => prev.slice(0, items.length));
  }, [items.length]);

  const activeIndex = useMemo(
    () =>
      items.findIndex(({ link }) =>
        link === ROUTE.index
          ? pathname === ROUTE.index
          : pathname === link || pathname.startsWith(`${link}/`),
      ),
    [pathname, items],
  );

  const motionData = useMemo(() => {
    const navRect = navRef.current?.getBoundingClientRect();
    const hoveredRect =
      hoveredIndex !== null ? linkRefs[hoveredIndex]?.getBoundingClientRect() : null;

    if (!navRect || !hoveredRect) {
      return null;
    }

    return {
      navRect,
      hoveredRect,
      x: hoveredRect.left - navRect.left,
      width: hoveredRect.width,
    };
  }, [linkRefs, hoveredIndex]);

  // No animation for first hover on active item, otherwise animate
  const animationDuration =
    !hasAnimated && hoveredIndex === activeIndex ? NO_ANIMATION_DURATION : ANIMATION_DURATION;

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setHoveredIndex(null);
    setHasAnimated(false);
  }, []);

  const handleItemHover = useCallback(
    (index: number) => {
      setHoveredIndex(index);

      // Start animations if hovering on non-active item
      if (!hasAnimated && index !== activeIndex) {
        setHasAnimated(true);
      }
    },
    [hasAnimated, activeIndex],
  );

  return (
    <ul
      className="relative ml-8 mr-auto hidden gap-x-2 lg:flex"
      ref={navRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
    >
      <LazyMotion features={domAnimation}>
        {items.map(({ title, link }, index) => {
          const isActive = index === activeIndex;

          return (
            <li className={clsx(items && 'group/navitem relative')} key={index}>
              <Link
                className={clsx(
                  'relative whitespace-pre rounded-full px-2.5 py-2 text-14 leading-none hover:text-muted-foreground data-[active=true]:duration-0',
                  isActive ? 'text-muted-foreground' : 'text-muted-foreground/80',
                )}
                size="sm"
                variant="default"
                href={link}
                key={index}
                ref={(el) => {
                  linkRefs[index] = el;
                }}
                data-active={isActive && !isHovering}
                onMouseEnter={() => handleItemHover(index)}
              >
                <span className="relative z-10 text-sm leading-none">{title}</span>
              </Link>
            </li>
          );
        })}
        {isHovering && hoveredIndex !== null && motionData && (
          <m.li
            className="absolute inset-0 rounded-full bg-border will-change-transform"
            initial={{ opacity: 0, x: motionData.x, width: motionData.width }}
            animate={{ opacity: 1, x: motionData.x, width: motionData.width }}
            exit={{ opacity: 0 }}
            transition={{ duration: animationDuration }}
          />
        )}
      </LazyMotion>
    </ul>
  );
}

export default Navigation;
