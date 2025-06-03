import type { Route } from 'next';
import NextLink from 'next/link';

import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const linkVariants = cva(
  'gap-x-[0.375rem] [&_svg]:shrink-0 inline-flex items-center font-medium -tracking-tighter transition-colors focus-visible:outline-2 focus-visible:outline focus-visible:outline-orange focus-visible:outline-offset-2',
  {
    variants: {
      variant: {
        default: 'text-black hover:text-black/80',
        muted: 'text-muted-foreground hover:text-secondary-foreground active:text-foreground',
        foreground: 'text-foreground hover:text-foreground/80',
        ghost: '',
      },
      size: {
        default: 'leading-snug',
        sm: 'text-[14px] leading-none',
        lg: 'text-[18px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface LinkProps<T extends string = string>
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    VariantProps<typeof linkVariants> {
  asChild?: boolean;
  href: URL | Route<T>;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps<string>>(
  ({ className, variant, size, asChild = false, href, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a';
    const isInternalLink = typeof href === 'string' && href.startsWith('/');

    if (isInternalLink) {
      return (
        <NextLink
          className={cn(linkVariants({ variant, size, className }))}
          href={href}
          ref={ref}
          {...props}
        />
      );
    }

    return (
      <Comp
        className={cn(linkVariants({ variant, size, className }))}
        href={href.toString()}
        ref={ref}
        {...props}
      />
    );
  },
);

Link.displayName = 'Link';

export default Link;
