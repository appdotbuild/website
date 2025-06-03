export const GROUP = {
  content: {
    title: 'Content',
    name: 'content',
    default: true,
  },
  seo: {
    title: 'SEO',
    name: 'seo',
    icon: () => '🔍',
  },
} as const;

export type GroupNames = keyof typeof GROUP;

export type GroupNameValues = (typeof GROUP)[GroupNames]['name'];
