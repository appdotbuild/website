import { Children, ReactNode, cloneElement, isValidElement } from 'react';

import { cn } from '@/lib/utils';

interface StepProps {
  title: string;
  children: ReactNode;
  number?: number;
}

function Step({ title, number, children, ...props }: StepProps) {
  return (
    <li className="flex flex-col pl-0" {...props}>
      <div className="flex items-start gap-x-5">
        <span className="not-prose relative top-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-sm font-medium leading-snug tracking-tight text-foreground ring-4 ring-background">
          {number}
        </span>
        <h3 className="not-prose pt-1 text-xl font-semibold leading-snug tracking-tight text-foreground">
          {title}
        </h3>
      </div>
      <div className="steps-content mt-4 pb-8 pl-14">{children}</div>
    </li>
  );
}

interface StepsProps {
  children: ReactNode;
}

function Steps({ children, ...props }: StepsProps) {
  const cardChildren = Children.toArray(children).filter((child) => isValidElement(child));

  const cardsWithAutoNumber = cardChildren.map((child, index) => {
    return cloneElement(child as React.ReactElement<StepProps>, {
      number: index + 1,
    });
  });

  return (
    <ol
      className={cn(
        'steps relative my-6 flex flex-col gap-3 gap-y-7 pl-0 md:my-8',
        'before:absolute before:inset-y-0 before:left-[1.125rem] before:w-px before:-translate-x-px before:bg-border',
      )}
      {...props}
    >
      {cardsWithAutoNumber}
    </ol>
  );
}

export { Steps, Step };
