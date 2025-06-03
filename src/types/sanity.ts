import { SanityAsset, SanityImageObject } from '@sanity/image-url/lib/types/types';

interface IImageAsset extends SanityAsset {
  altText?: string;
  metadata: {
    lqip: string;
    dimensions: {
      width: number;
      height: number;
    };
  };
}
export interface IAsset {
  asset: IImageAsset;
}

export interface ISanityImageWithAsset extends Omit<SanityImageObject, 'asset'>, IAsset {}
