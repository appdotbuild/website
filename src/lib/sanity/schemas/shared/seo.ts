import { StringRule, defineField, defineType } from 'sanity';

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule: StringRule) => rule.max(60).error('Title must be less than 60 characters'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (rule: StringRule) =>
        rule.max(160).error('Description must be less than 160 characters'),
    }),
    defineField({
      name: 'socialImage',
      title: 'Social Image',
      type: 'image',
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
    }),
  ],
});
