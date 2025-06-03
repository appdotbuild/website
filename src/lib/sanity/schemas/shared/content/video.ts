import { PlayIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import { customImageValidation } from '@/lib/sanity/utils/custom-image-validation';

const COVER_WIDTH = 704;
const COVER_ASPECT_RATIO = 16 / 9;

const video = defineType({
  name: 'video',
  title: 'Video',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/mp4,video/webm',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'variant',
      type: 'string',
      title: 'Variant',
      options: { list: ['default', 'outline'] },
      initialValue: 'default',
    }),
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      description: 'Important for SEO and accessibility.',
    }),
    defineField({
      name: 'poster',
      title: 'Poster Image (Thumbnail)',
      type: 'image',
      description: 'Image shown before the video plays',
      options: {
        hotspot: true,
      },
      validation: (rule) => {
        const posterWidth = COVER_WIDTH * 2;
        const posterHeight = Math.ceil(posterWidth / COVER_ASPECT_RATIO);

        return rule
          .custom((value, context) =>
            customImageValidation()
              .type('png', 'jpg', 'jpeg')
              .dimensions(posterWidth, posterHeight)
              .aspectRatio(COVER_ASPECT_RATIO)
              .validate(value, context),
          )
          .error(
            `Poster image must be png, jpg or jpeg and at least ${posterWidth}x${posterHeight}`,
          );
      },
    }),
    defineField({
      name: 'autoplay',
      title: 'Auto Play',
      type: 'boolean',
      description: 'Automatically start playing when the page loads (will be muted)',
      initialValue: false,
    }),
    defineField({
      name: 'controls',
      title: 'Show Controls',
      type: 'boolean',
      description: 'Display video controls',
      initialValue: true,
    }),
    defineField({
      name: 'muted',
      title: 'Muted',
      type: 'boolean',
      description: 'Mute audio by default',
      initialValue: false,
    }),
    defineField({
      name: 'loop',
      title: 'Loop',
      type: 'boolean',
      description: 'Loop the video',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'alt',
      media: 'poster',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Video',
        media: media || PlayIcon,
      };
    },
  },
});

export default video;
