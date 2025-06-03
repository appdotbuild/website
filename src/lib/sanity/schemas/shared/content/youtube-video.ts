import { PlayIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import { YouTubePreview } from '@/lib/sanity/components/youtube-preview';
import { customImageValidation } from '@/lib/sanity/utils/custom-image-validation';

const COVER_WIDTH = 704;
const COVER_ASPECT_RATIO = 16 / 9;

const youtubeVideo = defineType({
  name: 'youtubeVideo',
  title: '',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'cover',
      title: 'Video cover image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => {
        const coverWidth = COVER_WIDTH * 2;
        const coverHeight = Math.ceil(coverWidth / COVER_ASPECT_RATIO);

        return rule
          .custom((value, context) =>
            customImageValidation()
              .type('png', 'jpg', 'jpeg')
              .dimensions(coverWidth, coverHeight)
              .aspectRatio(COVER_ASPECT_RATIO)
              .validate(value, context),
          )
          .error(`Cover image must be png, jpg or jpeg and at least ${coverWidth}x${coverHeight}`);
      },
    }),
    defineField({
      name: 'youtubeId',
      title: 'YouTube ID or URL',
      type: 'string',
      validation: (rule) =>
        rule.required().custom((value) => {
          const videoIdRegex = /^[a-zA-Z0-9_-]{11}$/;
          const urlPattern =
            /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})(\?.*|&.*)?$/;

          if (!value) {
            return 'YouTube ID or URL is required';
          }

          if (videoIdRegex.test(value)) {
            return true;
          }

          if (urlPattern.test(value)) {
            return true;
          }

          return 'Enter a valid YouTube video ID or URL.';
        }),
    }),
    defineField({
      name: 'variant',
      type: 'string',
      title: 'Variant',
      options: { list: ['default', 'outline'] },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: { youtubeId: 'youtubeId', cover: 'cover' },
  },
  components: {
    preview: YouTubePreview,
  },
});

export default youtubeVideo;
