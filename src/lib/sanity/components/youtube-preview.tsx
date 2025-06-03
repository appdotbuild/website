import Image from 'next/image';

import { type SanityImageSource } from '@sanity/image-url/lib/types/types';
import { Flex, Text } from '@sanity/ui';
import type { PreviewProps } from 'sanity';

import { extractYouTubeId } from '@/lib/utils';

import { getProcessedImageUrl } from '../utils/get-url-for-image';

interface YouTubePreviewProps extends PreviewProps {
  youtubeId: string;
  cover?: SanityImageSource;
}

export function YouTubePreview(props: PreviewProps) {
  const { youtubeId = '', cover } = props as YouTubePreviewProps;
  const id = extractYouTubeId(youtubeId);

  if (!id) {
    return (
      <Flex padding={3} align="center" justify="center">
        <Text>Add a YouTube URL</Text>
      </Flex>
    );
  }

  const coverUrl = cover
    ? getProcessedImageUrl(cover) || `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
    : `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

  return (
    <Flex padding={3} justify="center" direction="column" gap={4}>
      <Text size={1}>{youtubeId}</Text>
      <Image
        src={coverUrl}
        style={{
          width: '100%',
          height: 'auto',
        }}
        alt="YouTube cover"
        width={704}
        height={704 / (16 / 9)}
      />
    </Flex>
  );
}
