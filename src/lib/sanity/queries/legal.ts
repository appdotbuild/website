import { groq } from 'next-sanity';

export const legalPagesQuery = groq`
  *[_type == "legalPage"] | order(updatedAt desc) {
    _id,
    title,
    "slug": slug.current,
    updatedAt
  }
`;

export const legalPageBySlugQuery = groq`
  *[_type == "legalPage" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    updatedAt,
    content,
    "seo": {
      "title": coalesce(seo.title, title, ""),
      "description": coalesce(seo.description, caption, ""),
      "socialImage": coalesce(seo.socialImage->url + "?w=1200&h=630&fit=crop&auto=format", ""),
      "noIndex": seo.noIndex == true
    }
  }
`;
