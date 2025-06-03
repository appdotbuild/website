import { CodeBlockIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const codeBlock = defineType({
  name: 'codeBlock',
  type: 'object',
  icon: CodeBlockIcon,
  title: 'Code',
  fields: [
    defineField({
      name: 'fileName',
      title: 'File Name (optional)',
      type: 'string',
    }),
    defineField({
      name: 'language',
      type: 'string',
      title: 'Language',
      options: {
        list: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'JSX', value: 'jsx' },
          { title: 'Ruby', value: 'ruby' },
          { title: 'Python', value: 'python' },
          { title: 'Go', value: 'go' },
          { title: 'PHP', value: 'php' },
          { title: 'Bash', value: 'bash' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'JSON', value: 'json' },
          { title: 'YAML', value: 'yaml' },
        ],
      },
    }),
    defineField({
      name: 'code',
      type: 'text',
      title: 'Code',
    }),
  ],
  preview: {
    select: {
      language: 'language',
      code: 'code',
    },
    prepare({ language, code }: { language: string; code: string }) {
      return {
        title: language,
        subtitle: code,
      };
    },
  },
});

export default codeBlock;
