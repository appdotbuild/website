import { format } from 'date-fns';
import { DatetimeRule, SlugRule, SortOrdering, StringRule, defineField, defineType } from 'sanity';

import { GROUP } from '@/lib/sanity/schemas/shared/group';
import { customSlugValidation, customSlugify } from '@/lib/sanity/utils/custom-slug-validation';

const LEGAL_PAGE_ORDERINGS: SortOrdering[] = [
  {
    name: 'updatedAtDesc',
    title: 'Update date New → Old',
    by: [
      {
        field: 'updatedAt',
        direction: 'desc',
      },
      {
        field: 'title',
        direction: 'asc',
      },
    ],
  },
  {
    name: 'updatedAtAsc',
    title: 'Update date Old → New',
    by: [
      {
        field: 'updatedAt',
        direction: 'asc',
      },
      {
        field: 'title',
        direction: 'asc',
      },
    ],
  },
];

const LEGAL_PAGE_PREVIEW = {
  select: {
    title: 'title',
    updatedAt: 'updatedAt',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prepare(selection: Record<string, any>) {
    const { title, updatedAt } = selection;
    const dateSegment = updatedAt ? format(new Date(updatedAt), 'yyyy/MMMM/dd') : 'No date';

    return {
      title,
      subtitle: `Updated: ${dateSegment}`,
    };
  },
};

export default defineType({
  name: 'legalPage',
  type: 'document',
  title: 'Legal Page',
  groups: [GROUP.content, GROUP.seo],
  fields: [
    // Content fields
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Title of the legal page',
      group: GROUP.content.name,
      validation: (rule: StringRule) => rule.error('You have to fill in this field.').required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'The URL segment for this legal page',
      group: GROUP.content.name,
      options: {
        source: 'title',
        slugify: customSlugify,
      },
      validation: (rule: SlugRule) => rule.required().custom(customSlugValidation).error(),
    }),
    defineField({
      name: 'updatedAt',
      type: 'datetime',
      title: 'Updated at',
      description: 'The date when this legal page was last updated',
      group: GROUP.content.name,
      validation: (rule: DatetimeRule) => rule.error('You have to fill in this field.').required(),
    }),
    defineField({
      name: 'content',
      type: 'content',
      title: 'Content',
      group: GROUP.content.name,
      validation: (rule) => rule.error('You have to fill in this field.').required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: GROUP.seo.name,
    }),
  ],
  orderings: LEGAL_PAGE_ORDERINGS,
  preview: LEGAL_PAGE_PREVIEW,
});
