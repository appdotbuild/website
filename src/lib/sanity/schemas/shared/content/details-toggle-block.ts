import { ImageIcon, ToggleArrowRightIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import { portableToPlain } from '@/lib/sanity/utils/portable-to-plain';

const detailsToggleBlock = defineType({
  name: 'detailsToggleBlock',
  type: 'object',
  icon: ToggleArrowRightIcon,
  title: 'Details Toggle',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
      initialValue: 'Details',
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        { type: 'block' },
        { type: 'codeBlock' },
        { type: 'codeTabs' },
        { type: 'tableBlock' },
        {
          type: 'image',
          icon: ImageIcon,
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      content: 'content',
    },
    prepare({ title, content }) {
      const contentPreview = portableToPlain(content);

      return {
        title: `Details: ${title || 'Details'}`,
        subtitle: contentPreview.length > 64 ? contentPreview.slice(0, 64) + '...' : contentPreview,
      };
    },
  },
});

export default detailsToggleBlock;
