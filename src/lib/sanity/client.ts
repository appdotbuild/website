import { QueryParams, createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-19';
const isProduction = process.env.NODE_ENV === 'production';
const token = process.env.SANITY_API_PREVIEW_TOKEN;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: isProduction,
});

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
  perspective: 'drafts',
});

export const getClient = (preview = false) => (preview ? previewClient : client);

export async function sanityFetch<QueryResponse>({
  query,
  qParams = {},
  preview = false,
  tags = [],
}: {
  query: string;
  qParams?: QueryParams;
  preview?: boolean;
  tags?: string[];
}): Promise<QueryResponse> {
  return getClient(preview).fetch<QueryResponse>(query, qParams, {
    cache: 'force-cache',
    next: { tags },
  });
}
