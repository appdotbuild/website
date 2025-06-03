import { PortableTextBlock } from '@portabletext/react';

export const portableToPlain = (blocks: PortableTextBlock[] | PortableTextBlock): string => {
  const blockArray = Array.isArray(blocks) ? blocks : [blocks];

  return blockArray
    .map((block) => {
      if (block._type === 'block' && block.children) {
        return (block.children as { text: string; _type?: string }[])
          .map((child) => {
            if (child._type && child._type !== 'span') {
              return portableToPlain(child as unknown as PortableTextBlock);
            }

            return child.text || '';
          })
          .join('');
      }

      if (block.children) {
        return portableToPlain(block.children as unknown as PortableTextBlock[]);
      }

      return '';
    })
    .join(' ');
};
