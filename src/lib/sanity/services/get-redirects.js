// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createClient, groq } = require('next-sanity');

const getClient = () => {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-19';
  const isProduction = process.env.NODE_ENV === 'production';

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: isProduction,
  });
};

const redirectsQuery = groq`
  *[_type == "redirects"] {
    "from": from.current,
    to,
    permanent
  }
`;

const getRedirects = async () => {
  const client = getClient();

  try {
    const allRedirects = await client.fetch(redirectsQuery);

    if (!allRedirects || allRedirects.length === 0) {
      return [];
    }

    return allRedirects.map(({ from, to, permanent }) => ({
      source: from,
      destination: to,
      permanent,
    }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching redirects:', error);

    return [];
  }
};

module.exports = getRedirects;
