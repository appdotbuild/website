import { format } from 'date-fns';
import {
  ArrayRule,
  DatetimeRule,
  SlugRule,
  SortOrdering,
  StringRule,
  defineField,
  defineType,
} from 'sanity';

import { type IAuthorData } from '@/types/blog';

import { GROUP } from '@/lib/sanity/schemas/shared/group';
import { customIsFeaturedUniqueValidation } from '@/lib/sanity/utils/custom-is-featured-unique-validation';
import { customSlugValidation, customSlugify } from '@/lib/sanity/utils/custom-slug-validation';

const BASE_POST_ORDERINGS: SortOrdering[] = [
  {
    title: 'Featured First, Then Publishing Date',
    name: 'featuredFirst',
    by: [
      { field: 'isFeatured', direction: 'desc' },
      { field: 'publishedAt', direction: 'desc' },
    ],
  },
  {
    name: 'publishingDateAsc',
    title: 'Publishing date New → Old',
    by: [
      {
        field: 'publishedAt',
        direction: 'asc',
      },
      {
        field: 'title',
        direction: 'asc',
      },
    ],
  },
  {
    name: 'publishingDateDesc',
    title: 'Publishing date Old → New',
    by: [
      {
        field: 'publishedAt',
        direction: 'desc',
      },
      {
        field: 'title',
        direction: 'asc',
      },
    ],
  },
];

const BASE_POST_PREVIEW = {
  select: {
    title: 'title',
    publishedAt: 'publishedAt',
    isFeatured: 'isFeatured',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prepare(selection: Record<string, any>) {
    const { title, publishedAt, isFeatured } = selection;
    const dateSegment = publishedAt ? format(new Date(publishedAt), 'yyyy/MMMM') : 'No date';

    return {
      title: isFeatured ? `★ ${title}` : title,
      subtitle: `Published: ${dateSegment}${isFeatured ? ' (Featured)' : ''}`,
    };
  },
};

export default defineType({
  name: 'blogPost',
  type: 'document',
  title: 'blog post',
  groups: [GROUP.content, GROUP.seo],
  fields: [
    // Content fields
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Titles should be catchy, descriptive, and not too long',
      group: GROUP.content.name,
      validation: (rule: StringRule) => rule.error('You have to fill in this field.').required(),
    }),
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Caption (optional)',
      group: GROUP.content.name,
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Some frontends will require a slug to be set to be able to show the post',
      group: GROUP.content.name,
      options: {
        source: 'title',
        slugify: customSlugify,
      },
      validation: (rule: SlugRule) => rule.required().custom(customSlugValidation).error(),
    }),
    defineField({
      name: 'isFeatured',
      type: 'boolean',
      title: 'Featured Post',
      description: 'Is this a featured post?',
      initialValue: false,
      group: GROUP.content.name,
      validation: (Rule) =>
        Rule.custom(async (isFeatured = false, context) =>
          customIsFeaturedUniqueValidation('blogPost', isFeatured, context),
        ),
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'author' }] }],
      group: GROUP.content.name,
      validation: (rule: ArrayRule<IAuthorData>) =>
        rule.min(1).error('You have to fill in this field.').required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published at',
      description: 'This can be used to schedule post for publishing',
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
  orderings: BASE_POST_ORDERINGS,
  preview: BASE_POST_PREVIEW,
});
