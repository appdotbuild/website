import { ValidationContext } from 'sanity';

const featuredPostCount = 1;

export const customIsFeaturedUniqueValidation = async (
  schemaType: string,
  isFeatured: boolean,
  context: ValidationContext,
) => {
  if (!isFeatured) {
    return true;
  }

  const currentId = context.document?._id;
  const currentDocumentId = currentId?.replace(/^drafts\./, '');

  const client = context.getClient({
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  });

  const query = `*[
    _type == $schemaType &&
    isFeatured == true &&
    !(_id in path('drafts.**')) &&
    _id != $currentDocumentId
  ]{
    _id
  }`;

  const featuredPosts = await client.fetch(query, {
    schemaType,
    currentDocumentId,
  });

  if (featuredPosts.length >= featuredPostCount) {
    return `You can only have ${featuredPostCount} featured post${
      featuredPostCount > 1 ? 's' : ''
    }.`;
  }

  return true;
};
