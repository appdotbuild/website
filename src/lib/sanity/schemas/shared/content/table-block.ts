import { ThListIcon } from '@sanity/icons';
import { TablePreview } from '@sanity/table';
import { PreviewValue } from 'sanity';

const TABLE_TYPES = [
  { title: 'With top header', value: 'withTopHeader' },
  { title: 'Without header', value: 'withoutHeader' },
];

const TABLE_THEMES = [
  { title: 'Outline', value: 'outline' },
  { title: 'Filled', value: 'filled' },
];

const tableBlock = {
  title: 'Table',
  name: 'tableBlock',
  icon: ThListIcon,
  type: 'object',
  fields: [
    {
      title: 'Type',
      type: 'string',
      name: 'type',
      options: {
        list: TABLE_TYPES,
      },
      initialValue: 'withTopHeader',
    },
    {
      title: 'Theme',
      type: 'string',
      name: 'theme',
      options: {
        list: TABLE_THEMES,
      },
    },
    {
      title: 'Table',
      name: 'table',
      type: 'table',
    },
  ],
  components: {
    preview: TablePreview,
  },
  preview: {
    select: {
      table: 'table',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare: (value: Record<string, any>) => {
      return {
        rows: value?.table?.rows ? value.table.rows : [],
      } as PreviewValue;
    },
  },
};

export default tableBlock;
