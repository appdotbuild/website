import { transformerNotationDiff, transformerNotationHighlight } from '@shikijs/transformers';
import {
  BundledLanguage,
  BundledTheme,
  HighlighterGeneric,
  bundledLanguages,
  codeToHtml,
  getSingletonHighlighter,
} from 'shiki';

import { type ICodeBlock } from '@/types/common';

function isBundledLanguage(lang: string): lang is BundledLanguage {
  return Object.keys(bundledLanguages).includes(lang as BundledLanguage);
}

let highlighter: HighlighterGeneric<BundledLanguage, BundledTheme> | null = null;

const parseHighlightLines = (meta: string): number[] => {
  const highlights: number[] = [];

  meta.split(',').forEach((segment) => {
    segment = segment.trim();

    if (segment.includes('-')) {
      const [start, end] = segment.split('-').map(Number);
      for (let i = start; i <= end; i++) {
        highlights.push(i);
      }
    } else {
      highlights.push(Number(segment));
    }
  });

  return highlights;
};

export async function highlight(
  code: string,
  lang: BundledLanguage = 'bash',
  highlightedLines?: string,
): Promise<string> {
  if (!isBundledLanguage(lang)) {
    lang = 'bash';
  }

  if (!highlighter) {
    highlighter = await getSingletonHighlighter({
      langs: [lang],
    });
  }

  await highlighter.loadLanguage(lang);

  const html = codeToHtml(code, {
    lang,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    transformers: [
      transformerNotationDiff(),
      transformerNotationHighlight(),
      {
        pre(node) {
          node.properties['data-language'] = lang;
        },
        code(node) {
          node.properties.class = 'grid';
        },
        line(node, line) {
          node.properties['data-line'] = line;

          if (highlightedLines) {
            const highlights = parseHighlightLines(String(highlightedLines));

            highlights.forEach((item) => {
              if (item === line) {
                node.properties['class'] += ' highlighted';
              }
            });
          }
        },
      },
    ],
  });

  return html;
}

export async function getHighlightedCodeArray(
  // TODO: fix this type in the future
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: ICodeBlock[],
) {
  let highlightedItems: string[] = [];

  try {
    highlightedItems = await Promise.all(
      items.map(async ({ code, language }) => {
        const highlightedCode = await highlight(code, language);

        return highlightedCode;
      }),
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error highlighting code:', error);
  }

  return highlightedItems;
}
