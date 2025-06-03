import { CodeIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const codeTab = defineType({
  name: 'codeTab',
  title: 'Tab',
  type: 'codeBlock',
});

const codeTabs = defineType({
  name: 'codeTabs',
  type: 'object',
  icon: CodeIcon,
  title: 'Code Tabs',
  fields: [
    defineField({
      name: 'tabs',
      type: 'array',
      title: 'Tabs',
      of: [{ type: 'codeTab' }],
      validation: (rule) => rule.min(2).error('You have to fill in this field.').required(),
    }),
  ],
  preview: {
    select: {
      tabs: 'tabs',
    },
    prepare({ tabs }) {
      const languages =
        tabs?.map((tab: { language: string }) => tab.language).filter(Boolean) || [];

      return {
        title: 'Code Tabs',
        subtitle: languages.length > 0 ? languages.join(', ') : 'No tabs yet',
      };
    },
  },
});

const codeTabsSchemas = [codeTabs, codeTab];

export default codeTabsSchemas;
