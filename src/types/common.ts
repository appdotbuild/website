import type { Route } from 'next';

import { ReactNode } from 'react';

import { type BundledLanguage } from 'shiki/langs';

export interface ISlug {
  current: URL | Route<string>;
}

export type TTableTheme = 'outline' | 'filled';

export interface ITableOfContentsItem {
  title: string;
  anchor: string;
  level: number;
}

export interface ICodeBlock {
  code: string;
  language: BundledLanguage;
  fileName?: string;
  highlightedLines?: string;
}

export interface IAuthor {
  photo?: string;
  name?: string;
}

export interface IBlockquote {
  quote: string;
  authors?: IAuthor | IAuthor[];
  role?: string;
}

export interface IVideo {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  poster?: string;
  autoplay?: boolean;
  controls?: boolean;
  muted?: boolean;
  loop?: boolean;
}

export interface IAdmonition {
  title?: string;
  children: ReactNode;
}

export interface IDetailsToggle {
  title: string;
  children: ReactNode;
}

export interface IYouTubeEmbed {
  youtubeId: string;
  cover?: string;
}

export interface ISeoFields {
  title: string;
  description: string;
  socialImage: string;
  noIndex: boolean;
}
