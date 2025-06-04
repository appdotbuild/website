'use client';

import Image from 'next/image';

import clsx from 'clsx';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';

import { Button } from '@/components/shared/button';
import Burger from '@/components/shared/header/burger';
import Link from '@/components/shared/link';

import { IMenuItem } from '@/types/menus';

import { useMobileMenu } from '@/hooks/use-mobile-menu';

import { ROUTE } from '@/constants/route';

import githubIcon from '@/svgs/github-white-logo.svg';

const ANIMATION_DURATION = 0.2;

const menuVariants = {
  closed: {
    opacity: 0,
    transition: {
      duration: ANIMATION_DURATION,
    },
  },
  opened: {
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATION,
    },
  },
};

function MobileMenu({ isDraftMode, items }: { isDraftMode: boolean; items: IMenuItem[] }) {
  const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenu();

  return (
    <>
      <div
        className={clsx(
          'absolute right-5 z-50 md:right-8 lg:hidden',
          isDraftMode ? 'top-16' : 'top-3',
        )}
      >
        <Burger className="ml-auto" isToggled={isMobileMenuOpen} onClick={toggleMobileMenu} />
      </div>
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <m.div
              className="fixed inset-x-0 bottom-0 top-0 z-40 block bg-[#F5F4F5] px-safe lg:hidden"
              initial="closed"
              animate="opened"
              exit="closed"
              variants={menuVariants}
            >
              <div
                className={clsx(
                  'flex h-full w-full flex-col justify-between text-left',
                  isDraftMode ? 'pt-[95px]' : 'pt-[55px]',
                )}
              >
                <nav className="px-5 md:px-8">
                  <ul className="flex w-full flex-col overflow-y-auto">
                    {items.map(({ title, link }, index) => {
                      return (
                        <li className="group/navitem relative border-b border-gray-90" key={index}>
                          <Link
                            className="flex items-center py-5"
                            size="lg"
                            variant="default"
                            href={link}
                          >
                            {title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
                <div className="grid grid-cols-1 gap-5 p-5 md:p-8">
                  <Button variant="secondary" size="xl" asChild>
                    <Link href={ROUTE.github}>
                      <Image src={githubIcon} width={16} height={16} alt="" />
                      GitHub
                    </Link>
                  </Button>
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </>
  );
}

export default MobileMenu;
