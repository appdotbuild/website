import codeBlock from './code-block';
import codeTabs from './code-tabs';
import content from './content';
import detailsToggleBlock from './details-toggle-block';
import noteBlock from './note-block';
import quoteBlock from './quote-block';
import relatedPostsBlock from './related-posts-block';
import tableBlock from './table-block';
import video from './video';
import youtubeVideo from './youtube-video';

const CONTENT_TYPES = [
  content,
  detailsToggleBlock,
  tableBlock,
  youtubeVideo,
  video,
  quoteBlock,
  codeBlock,
  noteBlock,
  ...relatedPostsBlock,
  ...codeTabs,
];

export default CONTENT_TYPES;
