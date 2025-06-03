'use client';

import { ReactElement, ReactNode, isValidElement } from 'react';

import { Check, Copy } from 'lucide-react';

import { cn } from '@/lib/utils';

import useCopyToClipboard from '@/hooks/use-copy-to-clipboard';

interface ICodeBlockWrapperProps {
  as?: 'figure' | 'div';
  isCustom?: boolean;
  className?: string;
  children?: ReactNode;
  fileName?: string;
}

type ExpectedProps = {
  children?: ReactNode;
  'data-line'?: string;
  dangerouslySetInnerHTML?: {
    __html: string;
  };
};

function hasExpectedProps(element: ReactNode): element is ReactElement<ExpectedProps> {
  return isValidElement(element) && typeof element.props === 'object';
}

function extractTextFromNode(node: ReactNode): string {
  if (typeof node === 'string') {
    return node;
  }

  if (hasExpectedProps(node)) {
    if (typeof window !== 'undefined' && node.props.dangerouslySetInnerHTML?.__html) {
      // Extract text from the HTML string
      const parser = new DOMParser();
      const doc = parser.parseFromString(node.props.dangerouslySetInnerHTML.__html, 'text/html');
      let textContent = '';

      // Iterate over each 'span' with 'data-line' attribute
      const lineElements = doc.querySelectorAll('span[data-line]');

      lineElements.forEach((lineElem) => {
        let line = lineElem.textContent;

        // add special characters for diff lines
        if (lineElem.classList.contains('diff') && lineElem.classList.contains('add')) {
          line = `+ ${line}`;
        }
        if (lineElem.classList.contains('diff') && lineElem.classList.contains('remove')) {
          line = `- ${line}`;
        }

        textContent += line + '\n'; // Preserve the newline from the original HTML
      });

      return textContent.trim(); // Trim the final string to remove any extra newline at the end
    } else if (node.props.children) {
      let text = '';
      const children = node.props.children;

      if (Array.isArray(children)) {
        children.forEach((child) => {
          text += extractTextFromNode(child);

          if (hasExpectedProps(child) && 'data-line' in child.props) {
            text += '\n';
          }
        });
      } else {
        text = extractTextFromNode(children);
      }

      return text;
    }
  }

  return '';
}

function CodeBlockWrapper({
  as = 'figure',
  isCustom = false,
  className = '',
  children,
  fileName,
}: ICodeBlockWrapperProps) {
  const { isCopied, handleCopy } = useCopyToClipboard(3000);

  const code = extractTextFromNode(children);
  const Tag = as;

  return (
    <Tag
      className={cn(
        'code-block group h-fit w-full rounded-lg border border-border bg-background',
        className,
      )}
    >
      {fileName && (
        <div className="border-b border-border px-4 py-3.5 text-[0.8125rem] font-medium leading-none tracking-tight text-muted-foreground">
          {fileName}
        </div>
      )}
      <div className="relative">
        {children}
        <button
          className={cn(
            'absolute right-2 top-2.5 flex size-7 items-center justify-center rounded border border-border bg-popover text-muted-foreground',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange',
            'transition-colors duration-300 hover:text-foreground/80 md:group-focus-within:opacity-100 md:group-hover:opacity-100',
            isCopied && 'text-foreground/80',
            isCustom &&
              'relative left-5 right-5 top-0 mt-3 size-auto h-10 w-[calc(100%-40px)] gap-x-[5px] rounded-none border-0 bg-secondary-foreground px-4 py-2.5 text-primary-foreground hover:bg-[#35353B] hover:text-primary-foreground active:bg-[#242429] md:absolute md:left-auto md:right-[13px] md:top-[14px] md:mt-0 md:h-11 md:w-auto md:py-3 lg:right-6 lg:top-[21px]',
          )}
          disabled={isCopied}
          aria-label={cn(isCopied ? 'Copied' : 'Copy')}
          onClick={() => handleCopy(code)}
        >
          {isCopied ? <Check size={isCustom ? 16 : 18} /> : <Copy size={isCustom ? 16 : 18} />}
          {isCustom && (
            <span className="w-11 text-14 font-medium lg:w-[55px] lg:text-16">
              {isCopied ? 'Copied' : 'Copy'}
            </span>
          )}
        </button>
      </div>
    </Tag>
  );
}

export default CodeBlockWrapper;
