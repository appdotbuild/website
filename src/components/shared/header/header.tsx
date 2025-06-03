import { draftMode } from 'next/headers';
import Image from 'next/image';

import { Button } from '@/components/shared/button';
import Navigation from '@/components/shared/header/navigation';
import Link from '@/components/shared/link';
import PreviewWarning from '@/components/shared/preview-warning';

import { getHeaderMenus } from '@/lib/menus/items';
import { cn } from '@/lib/utils';

import { ROUTE } from '@/constants/route';

import gitHubIcon from '@/svgs/github-white-logo.svg';
import logo from '@/svgs/logo.svg';

import MobileMenu from './mobile-menu';

async function Header() {
  const { isEnabled: isDraftMode } = draftMode();
  const { menuItems, headerSettings } = await getHeaderMenus(isDraftMode);
  const { linkName, linkUrl, buttonName, buttonUrl } = headerSettings;

  return (
    <>
      {isDraftMode && <PreviewWarning />}
      <header
        className={cn(
          'absolute left-0 right-0 z-50 h-[52px] px-safe pt-safe',
          isDraftMode ? 'top-[46px]' : 'top-0',
        )}
      >
        <nav
          className="container flex h-full max-w-[1216px] items-center justify-between"
          aria-label="Global"
        >
          <Link href={ROUTE.index}>
            <Image
              className="max-w-[110px] lg:max-w-none"
              src={logo}
              width={112}
              height={21}
              alt=""
              priority
            />
            <span className="sr-only">app.build</span>
          </Link>
          {menuItems && menuItems.length && <Navigation items={menuItems} />}
          <div className="hidden items-center gap-x-6 lg:flex">
            <Link size="sm" variant="muted" href={linkUrl}>
              {linkName}
            </Link>
            <Button variant="secondary" size="sm" asChild>
              <Link href={buttonUrl} target="_blank">
                <Image className="w-3" src={gitHubIcon} width={16} height={16} alt="" />
                {buttonName}
              </Link>
            </Button>
          </div>
        </nav>
      </header>
      <MobileMenu
        isDraftMode={isDraftMode}
        items={menuItems || [{ title: linkName, link: linkUrl }]}
      />
    </>
  );
}

export default Header;
