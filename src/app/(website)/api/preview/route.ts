import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Preview api route
 * - verify the secret token in the request
 * - enable draftMode to allow draft content display
 * - disable draftMode to disable draft content display
 * - retrieve redirect_url and perform the redirect
 * @param request
 * @constructor
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const disable = searchParams.get('disable');

  if (disable) {
    const draft = await draftMode();
    draft.disable();
    
return new Response('Draft mode is disabled');
  }

  const secret = searchParams.get('secret');

  if (secret !== process.env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  const redirectUrl = searchParams.get('redirect_url');

  if (redirectUrl) {
    redirect(redirectUrl);
  } else {
    return new Response('Missing redirect URL', { status: 400 });
  }
}
