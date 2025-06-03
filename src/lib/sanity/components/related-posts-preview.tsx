import React from 'react';

import { Flex, Stack, Text } from '@sanity/ui';
import type { PreviewProps } from 'sanity';

interface RelatedItem {
  _type: string;
  title: string;
  label?: string;
  url?: string;
  isExternal?: boolean;
  _ref?: string;
  _id?: string;
}

interface RelatedPostsPreviewProps extends PreviewProps {
  items: RelatedItem[];
}

function RelatedItemCard({ item, isLast }: { item: RelatedItem; isLast: boolean }) {
  const isRelatedLink = item._type === 'relatedLink';

  const title = isRelatedLink
    ? item.title
    : 'Blog Post (id: ' + item._ref?.substring(0, 8) + '...)';
  const subtitle = isRelatedLink ? item.label : '';

  return (
    <Flex
      gap={3}
      align="flex-start"
      padding={3}
      style={{
        borderBottom: isLast ? 'none' : '1px solid var(--card-border-color)',
      }}
    >
      <Stack space={1} style={{ flex: 1 }}>
        {subtitle && (
          <Flex align="center" gap={2}>
            <Text size={0} muted>
              {subtitle}
            </Text>
          </Flex>
        )}
        <Text weight="semibold" size={1}>
          {title}
        </Text>
      </Stack>

      <Text size={0} style={{ flexShrink: 0 }} muted>
        {isRelatedLink ? 'Link' : 'Post'}
      </Text>
    </Flex>
  );
}

export function RelatedPostsPreview(props: PreviewProps) {
  const { items = [] } = props as RelatedPostsPreviewProps;

  if (!items || items.length === 0) {
    return (
      <Flex padding={4} align="center" justify="center">
        <Text muted>No related items added yet</Text>
      </Flex>
    );
  }

  return (
    <Stack>
      {items.map((item, index) => (
        <RelatedItemCard key={index} item={item} isLast={index === items.length - 1} />
      ))}
    </Stack>
  );
}
