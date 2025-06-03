import { ComponentPropsWithoutRef, Fragment, ReactNode, isValidElement } from 'react';

import { ScrollArea, ScrollBar } from '@/components/shared/scroll-area';
import { TabsContent, TabsList, TabsTrigger, Tabs as TabsUI } from '@/components/shared/tabs';

import { cn } from '@/lib/utils';

function processChildren(node: ReactNode): ReactNode {
  if (node == null || typeof node === 'boolean') {
    return null;
  }

  if (Array.isArray(node)) {
    return node.map(processChildren);
  }

  if (isValidElement(node)) {
    if (node.type === Fragment) {
      return <Fragment>{processChildren(node.props.children)}</Fragment>;
    }

    return node;
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return node;
  }

  return <Fragment>{node}</Fragment>;
}

interface TabProps {
  label: string;
  children: ReactNode;
  contentProps?: Omit<ComponentPropsWithoutRef<typeof TabsContent>, 'value'>;
}

export function Tab({ label, children, contentProps = {} }: TabProps) {
  if (!label) {
    return null;
  }

  const processedChildren = processChildren(children);
  if (processedChildren == null) {
    return null;
  }

  return (
    <TabsContent className="prose-inside-content mb-0 mt-4" value={label} {...contentProps}>
      {processedChildren}
    </TabsContent>
  );
}

export interface TabsProps {
  labels: string[];
  defaultValue?: string;
  children: ReactNode;
  className?: string;
}

export function Tabs({ labels, defaultValue, children, className }: TabsProps) {
  return (
    <div className={cn('w-full max-w-full overflow-hidden', className)}>
      <TabsUI className="w-full" defaultValue={defaultValue || labels[0]}>
        <TabsList className="h-11 w-full rounded-none border-b border-border bg-transparent p-0">
          <ScrollArea className="w-full">
            <div className="flex w-fit">
              {labels.map((label, index) => (
                <TabsTrigger
                  className={cn(
                    'relative h-11 px-4 font-semibold leading-none tracking-tight text-muted-foreground',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange',
                    'hover:text-foreground/80 hover:after:opacity-20',
                    "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-foreground after:opacity-0 after:transition-opacity after:duration-300 after:ease-in-out after:content-['']",
                    'data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:after:opacity-100',
                  )}
                  value={label}
                  key={index}
                >
                  {label}
                </TabsTrigger>
              ))}
            </div>
            <ScrollBar className="invisible" orientation="horizontal" />
          </ScrollArea>
        </TabsList>
        {children}
      </TabsUI>
    </div>
  );
}
