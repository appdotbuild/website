import { SanityClient } from 'sanity';

function getLocalStorageCache() {
  const cache = localStorage.getItem('sanityDocumentCache');

  return cache ? JSON.parse(cache) : {};
}

/**
 * Get document from localStorage or get document from Sanity api
 * @param ref
 * @param client
 */
async function getDocumentWithCache(ref: string, client: SanityClient) {
  const cache = getLocalStorageCache();

  if (cache[ref]) {
    return cache[ref];
  }

  const document = await client.getDocument(ref);

  if (document) {
    cache[ref] = { _type: document._type };
    localStorage.setItem('sanityDocumentCache', JSON.stringify(cache));
  }

  return document;
}

export default getDocumentWithCache;
