import { BlockquoteIcon } from '@sanity/icons';
import { StringRule, defineField, defineType } from 'sanity';

import { type IAuthor } from '@/types/common';

const quoteBlock = defineType({
  name: 'quoteBlock',
  type: 'object',
  icon: BlockquoteIcon,
  title: 'Quote',
  fields: [
    defineField({
      name: 'quote',
      type: 'text',
      title: 'Quote',
      validation: (rule: StringRule) =>
        rule.error('You have to fill in this field.').required().max(512),
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'author' }] }],
    }),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Role',
      validation: (rule: StringRule) =>
        rule.error('You have to fill in this field.').required().max(64),
    }),
  ],
  preview: {
    select: {
      quote: 'quote',
      authors: 'authors',
      role: 'role',
    },
    prepare({ quote, authors, role }: { quote?: string; authors: Array<IAuthor>; role?: string }) {
      const renderedAuthors = authors?.map(({ name }) => name).join(', ');
      // eslint-disable-next-line no-nested-ternary
      const truncatedQuote = quote
        ? quote.length > 64
          ? quote.substring(0, 64) + '...'
          : quote
        : '';

      return {
        title: `Quote: ${renderedAuthors || ''} ${role ? `- ${role}` : ''}`,
        subtitle: truncatedQuote,
      };
    },
  },
});

export default quoteBlock;
