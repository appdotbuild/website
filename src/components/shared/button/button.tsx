'use client';

import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

import getNodeText from '@/lib/get-node-text';
import sendSegmentEvent from '@/lib/send-segment-event';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center gap-1 whitespace-nowrap font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'shadow-xs bg-primary text-primary-foreground hover:bg-primary/85 hover:text-primary-foreground',
        secondary:
          'shadow-xs bg-secondary-foreground text-primary-foreground hover:bg-[#35353B] active:bg-[#242429] hover:text-primary-foreground',
        gradient:
          'bg-[rgba(113,113,122,0.16)] text-secondary-foreground hover:bg-[rgba(113,113,122,0.32)] active:bg-[rgba(113,113,122,0.40)]',
        outline:
          'shadow-xs border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        none: '',
      },
      size: {
        default: 'h-9 px-4 py-2 text-sm',
        xs: 'h-6 px-2.5 text-xs leading-none',
        sm: 'h-8 px-3.5 text-[14px]',
        md: 'h-8.5 px-4.5 text-14 md:text-15 leading-none -tracking-tighter text-black',
        lg: 'h-10 text-14 px-4 lg:px-3.5 lg:text-16',
        xl: 'h-11 px-10 text-[15px] leading-none -tracking-tighter',
        icon: 'size-9',
        badge: 'h-5.5 px-2.5 py-1 text-11 leading-tight -tracking-tighter',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
    compoundVariants: [
      {
        variant: ['gradient'],
        className: 'w-full z-20 -tracking-tighter',
      },
    ],
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  eventName?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, eventName, onClick, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    const handleAnalytics = (eventType = 'clicked', customText?: string) => {
      const text = customText || getNodeText(children);
      sendSegmentEvent(`Button ${eventType}`, {
        text,
        theme: variant,
        size,
      });
    };

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={(e) => {
          if (onClick) {
            onClick(e);
          }
          if (eventName) {
            handleAnalytics('clicked');
          }
        }}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
