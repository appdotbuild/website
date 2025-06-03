import { draftMode } from 'next/headers';
import Image from 'next/image';

import Link from '@/components/shared/link';

import { getFooterMenus } from '@/lib/menus/items';

import { MENU_ICONS } from '@/constants/menu-icons';
import { ROUTE } from '@/constants/route';

import logo from '@/svgs/logo.svg';

async function Footer() {
  const { isEnabled: isDraftMode } = draftMode();
  const { links, social } = await getFooterMenus(isDraftMode);

  return (
    <footer className="relative px-safe pb-safe-or-6">
      <div className="container relative flex flex-col items-start justify-between gap-9 border-t border-border pt-5 md:flex-row md:items-center md:pt-6">
        <Link className="-m-2 block p-2" href={ROUTE.index}>
          <Image src={logo} width={112} height={21} alt="" />
          <span className="sr-only">app.build</span>
        </Link>
        {links && links.length && (
          <nav className="flex flex-wrap gap-5 text-sm">
            {links.map(({ title: itemTitle, link }, index) => {
              const isExternalUrl = (link as string).startsWith('http');

              return (
                <Link
                  className="leading-none"
                  key={index}
                  href={link}
                  size="sm"
                  variant="foreground"
                  rel={isExternalUrl ? 'noopener noreferrer' : undefined}
                  target={isExternalUrl ? '_blank' : undefined}
                >
                  {itemTitle}
                </Link>
              );
            })}
          </nav>
        )}
        <p className="text-14 font-medium text-foreground md:absolute md:left-1/2 md:-translate-x-1/2">
          Built by{' '}
          <Link href={ROUTE.neon} target="_blank">
            Neon
          </Link>
        </p>
        <nav className="flex grow items-center gap-5 md:justify-end">
          {social.map(({ title, link, icon }, index) => {
            const Icon = MENU_ICONS[icon];

            return (
              <Link
                href={link}
                key={index}
                size="sm"
                variant="foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="!size-4" />
                <span className="">{title}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
