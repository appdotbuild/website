import { BulbOutlineIcon, ImageIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import { portableToPlain } from '@/lib/sanity/utils/portable-to-plain';

const noteBlock = defineType({
  name: 'noteBlock',
  type: 'object',
  icon: BulbOutlineIcon,
  title: 'Note',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      initialValue: 'Good to know',
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        { type: 'block' },
        { type: 'codeBlock' },
        { type: 'codeTabs' },
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
      const contentPreview = content ? portableToPlain(content) : 'No content yet';

      return {
        title: title || 'No title',
        subtitle: contentPreview.length > 64 ? contentPreview.slice(0, 64) + '...' : contentPreview,
      };
    },
  },
});

export default noteBlock;
