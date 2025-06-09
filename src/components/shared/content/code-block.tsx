import React from 'react';

import parse from 'html-react-parser';
import { BundledLanguage } from 'shiki/langs';

import { ScrollArea, ScrollBar } from '@/components/shared/scroll-area';

import { ICodeBlock } from '@/types/common';

import { highlight } from '@/lib/shiki';
import { cn } from '@/lib/utils';

import '@/styles/shiki.css';

import CodeBlockWrapper from './code-block-wrapper';

interface CodeChildProps {
  className?: string;
  children?: string;
  fileName?: string;
  highlightedLines?: string;
}

interface CodeBlockProps extends ICodeBlock {
  className?: string;
  as?: 'figure' | 'div';
  isCustom?: boolean;
  copyEventName?: string;
  children?: React.ReactElement<CodeChildProps> | React.ReactNode;
}

async function CodeBlock({
  language,
  as = 'figure',
  code = '',
  className,
  fileName,
  children,
  highlightedLines,
  isCustom = false,
  copyEventName,
}: CodeBlockProps) {
  const childrenElement = React.isValidElement(children)
    ? (children as React.ReactElement<CodeChildProps>)
    : null;

  const resolvedLanguage =
    childrenElement?.props?.className?.replace('language-', '') || language || 'bash';

  const resolvedCode = code.trim() || childrenElement?.props?.children?.trim() || '';
  const resolvedFileName = fileName || childrenElement?.props?.fileName;
  const resolvedHighlightedLines = highlightedLines || childrenElement?.props?.highlightedLines;
  const html = await highlight(
    resolvedCode,
    resolvedLanguage.toLowerCase() as BundledLanguage,
    resolvedHighlightedLines,
  );

  const countLines = html.split('\n').length;

  return (
    <CodeBlockWrapper
      className={className}
      fileName={resolvedFileName}
      as={as}
      isCustom={isCustom}
      copyEventName={copyEventName}
    >
      <ScrollArea className="w-full">
        <div
          className={cn(
            'px-4 text-left font-mono text-14 lg:px-6 lg:text-16 [&>pre:focus-visible]:outline-none',
            `language-${resolvedLanguage}`,
            countLines > 1 ? 'py-4' : 'py-[13px]',
            isCustom &&
              'px-5 pb-5 pt-3.5 font-medium md:px-7 md:py-6 md:pr-[110px] lg:px-8 lg:py-7 lg:pr-[145px] lg:text-18 [&>pre]:relative [&>pre]:after:absolute [&>pre]:after:-bottom-2.5 [&>pre]:after:left-0 [&>pre]:after:h-0.5 [&>pre]:after:w-full [&>pre]:after:bg-black lg:[&>pre]:after:h-[3px] [&_code]:text-16 [&_code]:-tracking-tighter lg:[&_code]:text-18',
          )}
        >
          {parse(html)}
        </div>
        <ScrollBar className="invisible" orientation="horizontal" />
      </ScrollArea>
    </CodeBlockWrapper>
  );
}

export default CodeBlock;
