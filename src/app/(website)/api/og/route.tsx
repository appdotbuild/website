import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';
export const preferredRegion = 'auto';

const DEFAULT_WIDTH = 1200;
const DEFAULT_HEIGHT = 630;

const DEFAULT_TEMPLATES = {
  blog: '/og-images/blog-cover.jpg',
  default: '/og-images/blog-cover.jpg',
} as const;

type TemplateKey = keyof typeof DEFAULT_TEMPLATES;

const getTemplateImage = (key: string): string => {
  return DEFAULT_TEMPLATES[key as TemplateKey] || DEFAULT_TEMPLATES.default;
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const templateKey = searchParams.get('template') || 'default';
    const title = searchParams.get('title') || '';
    const width = parseInt(searchParams.get('width') || `${DEFAULT_WIDTH}`, 10);
    const height = parseInt(searchParams.get('height') || `${DEFAULT_HEIGHT}`, 10);

    const imageUrl = getTemplateImage(templateKey);

    const siteUrl = process.env.NEXT_PUBLIC_DEFAULT_SITE_URL || 'http://localhost:3000';
    const logo = fetch(`${siteUrl}/og-images/logo.png`).then((res) => res.arrayBuffer());
    const background = fetch(`${siteUrl}${imageUrl}`).then((res) => res.arrayBuffer());

    const [logoRes, backgroundRes] = await Promise.all([logo, background]);

    return new ImageResponse(
      (
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            padding: '40px',
            backgroundColor: '#09090b',
            overflow: 'hidden',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              objectFit: 'cover',
            }}
            src={backgroundRes as unknown as string}
            alt=""
            width={width}
            height={height}
          />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            style={{
              position: 'relative',
              zIndex: 10,
            }}
            src={logoRes as unknown as string}
            alt=""
            width={88}
            height={30}
          />

          <h1
            style={{
              position: 'relative',
              zIndex: 10,
              padding: '20px 0',
              fontSize: '72px',
              letterSpacing: '0.01em',
              fontWeight: 400,
              lineHeight: 0.9,
              textAlign: 'center',
              color: 'white',
              maxWidth: '80%',
              marginTop: '10px',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </h1>
        </div>
      ),
      {
        width,
        height,
      },
    );
  } catch (e) {
    return new Response('Failed to generate the image', { status: 500 });
  }
}
