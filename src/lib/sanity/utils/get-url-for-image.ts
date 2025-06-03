import imageUrlBuilder from '@sanity/image-url';
import { type SanityImageSource } from '@sanity/image-url/lib/types/types';

const imageBuilder = imageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
});

export const getUrlForImage = (source: SanityImageSource) =>
  imageBuilder?.image(source).auto('format').fit('max');

export const getProcessedImageUrl = (
  image: SanityImageSource,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    isSVG?: boolean;
    fit?: 'crop' | 'clip' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
    noUpscale?: boolean;
  } = {},
) => {
  if (!image) {
    return null;
  }

  const { width, height, quality = 100, isSVG = false, fit = 'crop', noUpscale = false } = options;

  if (isSVG) {
    return getUrlForImage(image)?.url();
  }

  let imageUrl = getUrlForImage(image);

  if (width) {
    imageUrl = imageUrl.width(width * (noUpscale ? 1 : 2));
  }

  if (height) {
    imageUrl = imageUrl.height(height * (noUpscale ? 1 : 2));
  }

  if (quality) {
    imageUrl = imageUrl.quality(quality);
  }

  return imageUrl.fit(fit).url();
};
