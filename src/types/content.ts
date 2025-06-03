import { type ReactNode } from 'react';

import { type PortableTextBlock } from '@portabletext/react';
import { type TableValue } from '@sanity/table';

import { type IPost } from '@/types/blog';
import {
  type IAdmonition,
  type ICodeBlock,
  type IDetailsToggle,
  type IVideo,
  IYouTubeEmbed,
  type TTableTheme,
} from '@/types/common';
import { type ISanityImageWithAsset } from '@/types/sanity';

export interface IContentYouTube extends Omit<IYouTubeEmbed, 'cover'> {
  cover: ISanityImageWithAsset;
  variant?: 'default' | 'outline';
}

export interface IContentNote extends Omit<IAdmonition, 'children'> {
  content: PortableTextBlock;
}

export interface IContentDetailsToggle extends Omit<IDetailsToggle, 'children'> {
  content: PortableTextBlock;
}

export interface IContentCode extends ICodeBlock {
  children?: ReactNode;
}

export interface IContentCodeTabs {
  tabs: ICodeBlock[];
}

export interface IContentPicture extends ISanityImageWithAsset {
  alt?: string;
  caption?: string;
  variant?: 'default' | 'outline';
}

export interface IContentVideo extends IVideo {
  variant?: 'default' | 'outline';
  videoFile: {
    asset: {
      _ref: string;
      url: string;
    };
  };
}

export type IContentTable = {
  type: 'withTopHeader' | 'withoutHeader';
  table: TableValue;
  theme?: TTableTheme;
};

export interface IRelatedLink {
  _type: 'relatedLink';
  label?: string;
  title: string;
  url: string;
  isExternal?: boolean;
}

export interface IContentRelatedPosts {
  items: Array<IPost | IRelatedLink>;
}

export interface IContentBlockProps<T> {
  value: T;
}
