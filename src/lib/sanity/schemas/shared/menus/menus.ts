import { StringRule, UrlRule, defineField, defineType } from 'sanity';

import MenuIconInput from '@/lib/sanity/components/menu-icon-input';
import { customLinkValidation } from '@/lib/sanity/utils/custom-link-validation';

import { MENU_ICONS } from '@/constants/menu-icons';

const subMenuLink = defineType({
  name: 'subMenuLink',
  title: 'Sub Menu Link',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: Object.keys(MENU_ICONS).map((key) => ({
          title: key,
          value: key,
        })),
        layout: 'radio',
      },
      components: {
        input: MenuIconInput,
      },
      validation: (rule: StringRule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule: StringRule) => rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'string',
      validation: (rule: StringRule) => rule.required().custom(customLinkValidation),
    }),
  ],
});

const menuItem = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule: StringRule) => rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'string',
      hidden: ({ parent }: { parent: { isSection: boolean } }) => parent?.isSection,
      validation: (rule: StringRule) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rule.custom((value: string | undefined, context: any) => {
          const isSection = context.parent?.isSection;

          if (!isSection) {
            if (!value) {
              return 'Link is required';
            }
            if (
              !value.startsWith('/') &&
              !value.startsWith('#') &&
              !value.match(/^(https?:\/\/|mailto:|tel:)/)
            ) {
              return 'Please enter a valid URL (starting with "/" for internal links or "http://" / "https://" for external links)';
            }
          }

          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      link: 'link',
    },
    prepare(selection: { title?: string; isSection?: boolean; link?: string }) {
      const { title, link } = selection;

      return {
        title: `${title ?? ''}`,
        subtitle: link,
      };
    },
  },
});

const headerSettings = defineType({
  name: 'headerSettings',
  title: 'Header Settings',
  type: 'object',
  fields: [
    defineField({
      name: 'linkName',
      title: 'Header Link Text',
      type: 'string',
      validation: (rule: StringRule) => rule.required(),
    }),
    defineField({
      name: 'linkUrl',
      title: 'Header Link URL',
      type: 'string',
      validation: (rule: StringRule) => rule.required().custom(customLinkValidation),
    }),
    defineField({
      name: 'buttonName',
      title: 'Header Button Text',
      type: 'string',
      validation: (rule: StringRule) => rule.required(),
    }),
    defineField({
      name: 'buttonUrl',
      title: 'Header Button URL',
      type: 'url',
      validation: (rule: UrlRule) => rule.required(),
    }),
  ],
});

const headerMenu = defineType({
  name: 'headerMenu',
  title: 'Header Menu',
  type: 'document',
  fields: [
    {
      name: 'menuItems',
      title: 'Menu Items',
      type: 'array',
      of: [{ type: 'menuItem' }],
    },
    {
      name: 'headerSettings',
      title: 'Header Right Side',
      type: 'headerSettings',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare() {
      return {
        title: 'Header Menu',
      };
    },
  },
});

const menuLink = defineType({
  name: 'menuLink',
  title: 'Menu Link',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule: StringRule) => rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'string',
      validation: (rule: StringRule) => rule.required().custom(customLinkValidation),
    }),
  ],
});

const footerMenu = defineType({
  name: 'footerMenu',
  title: 'Footer Menu',
  type: 'document',
  fields: [
    {
      name: 'links',
      title: 'Footer Links',
      type: 'array',
      of: [{ type: 'menuLink' }],
    },
    {
      name: 'social',
      title: 'Footer Social',
      type: 'array',
      of: [{ type: 'subMenuLink' }],
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare() {
      return {
        title: 'Footer Menu',
      };
    },
  },
});

export default [headerMenu, headerSettings, footerMenu, menuItem, subMenuLink, menuLink];
