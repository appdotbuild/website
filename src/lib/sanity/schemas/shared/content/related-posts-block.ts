import { defineField, defineType } from 'sanity';

import { RelatedPostsPreview } from '../../../components/related-posts-preview';

const relatedLink = defineType({
  name: 'relatedLink',
  title: 'Related Link',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Label',
      description: 'Short text (e.g. section or date)',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'url',
      title: 'URL',
      type: 'string',
      description: 'Can be an absolute URL (https://example.com) or a relative path (/blog)',
      validation: (rule) =>
        rule.required().custom((url) => {
          const urlString = String(url);

          if (urlString.match(/^https?:\/\//)) {
            const urlPattern =
              /^(https?:\/\/)([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\/[a-zA-Z0-9_\-~:/?#[\]@!$&'()*+,;=]*)?$/;
            if (!urlPattern.test(urlString)) {
              return 'Invalid absolute URL. Example: https://example.com/page';
            }
          } else if (!urlString.startsWith('/')) {
            return 'Relative URL must start with /. Example: /blog/my-post';
          } else if (!/^\/[a-zA-Z0-9_\-~:/?#[\]@!$&'()*+,;=]*$/.test(urlString)) {
            return 'Relative URL contains invalid characters';
          }

          return true;
        }),
    },
    {
      name: 'isExternal',
      title: 'External link',
      type: 'boolean',
      description: 'Check if the link leads to an external resource. It will open in a new tab.',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      label: 'label',
      url: 'url',
      isExternal: 'isExternal',
    },
    prepare({ title, label, url, isExternal }) {
      return {
        title,
        subtitle: label ? `${label} | ${url}` : url,
        isExternal,
      };
    },
  },
});

const relatedPostsBlock = defineType({
  name: 'relatedPostsBlock',
  title: 'Related Posts',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      type: 'array',
      title: 'Related Items',
      description: 'Select related blog posts or add custom links',
      of: [
        {
          type: 'reference',
          title: 'Blog Post',
          to: [{ type: 'blogPost' }],
        },
        {
          type: 'relatedLink',
          title: 'Related Link',
        },
      ],
      validation: (rule) =>
        rule.custom((items) => {
          if (!items || items.length === 0) {
            return {
              message: 'At least 1 related item is required',
            };
          }

          return true;
        }),
    }),
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare(selection) {
      const { items = [] } = selection;

      return {
        title: 'Related Items',
        subtitle: `${items.length} item${items.length === 1 ? '' : 's'}`,
        items,
      };
    },
  },
  components: {
    preview: RelatedPostsPreview,
  },
});

const relatedPostsSchemas = [relatedPostsBlock, relatedLink];

export default relatedPostsSchemas;
