import { Studio } from './Studio';

export { metadata } from 'next-sanity/studio';

export const dynamic = 'force-static';

export default function StudioPage() {
  return <Studio />;
}
