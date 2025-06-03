import { ExpandIcon } from '@sanity/icons';
import { Slug, SlugRule, StringRule, defineField, defineType } from 'sanity';

export default defineType({
  name: 'redirects',
  type: 'document',
  title: 'Redirects',
  icon: ExpandIcon,
  fields: [
    defineField({
      name: 'from',
      type: 'slug',
      title: 'From',
      validation: (rule: SlugRule) => rule.required(),
    }),
    defineField({
      name: 'to',
      type: 'string',
      title: 'To',
      validation: (rule: StringRule) => rule.required(),
    }),
    defineField({
      name: 'permanent',
      type: 'boolean',
      title: 'Permanent',
      description:
        'Permanent true or false - if true will use the 308 status code which instructs clients/search engines to cache the redirect forever, if false will use the 307 status code which is temporary and is not cached.',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      from: 'from',
      to: 'to',
    },
    prepare: ({ from, to }: { from: Slug; to: string }) => ({
      title: from.current,
      subtitle: to,
    }),
  },
});
