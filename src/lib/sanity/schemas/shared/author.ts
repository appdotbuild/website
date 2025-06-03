import { StringRule, defineField, defineType } from 'sanity';

export default defineType({
  name: 'author',
  type: 'document',
  title: 'Authors',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (rule: StringRule) => rule.error('You have to fill in this field.').required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description (optional)',
    }),
    defineField({
      name: 'position',
      type: 'string',
      title: 'Position (optional)',
    }),
    defineField({
      name: 'photo',
      type: 'image',
      title: 'Photo (optional)',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'photo',
    },
  },
});
