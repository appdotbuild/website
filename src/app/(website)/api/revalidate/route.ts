import { parseBody } from 'next-sanity/webhook';
import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

type WebhookPayload = {
  _type: 'redirects' | 'blogPost' | 'author' | 'legalPage';
};

export async function POST(req: NextRequest) {
  try {
    if (!process.env.SANITY_REVALIDATE_SECRET) {
      return new Response('Missing environment variable SANITY_REVALIDATE_SECRET', { status: 500 });
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
      true,
    );

    if (!isValidSignature) {
      const message = 'Invalid signature';

      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401,
      });
    } else if (!body?._type || !['redirects', 'blogPost', 'author'].includes(body._type)) {
      const message = 'Bad Request';

      return new Response(JSON.stringify({ message, body }), { status: 400 });
    }

    const type = body._type;
    if (type === 'redirects') {
      try {
        const response = await fetch(process.env.VERCEL_DEPLOY_HOOK_URL!, {
          method: 'POST',
        });

        if (!response.ok) {
          return new Response('Deploy hook failed', { status: 500 });
        }

        return new Response('Success', { status: 200 });
      } catch (error: unknown) {
        return new Response(error instanceof Error ? error.message : 'Unknown error', {
          status: 500,
        });
      }
    }

    if (['blogPost', 'author'].includes(type)) {
      revalidateTag('blog');
    } else {
      revalidateTag(type);
    }

    return NextResponse.json({ body });
  } catch (err) {
    return new Response((err as Error).message, { status: 500 });
  }
}
