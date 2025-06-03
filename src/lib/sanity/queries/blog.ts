import { groq } from 'next-sanity';

import { ROUTE } from '@/constants/route';

const commonPostFields = `
  _type,
  title,
  slug,
  caption,
  publishedAt,
  isFeatured,
  "pathname": "${ROUTE.blog}/" + slug.current
`;

const postCardFields = `
  ${commonPostFields},
  "authors": authors[]->{
    name,
    position,
    "photo": photo.asset->url + "?w=64&h=64&fit=crop&auto=format",
    },
`;

const fullPostFields = `
  ${commonPostFields},
  "content": content[] {
    ...,
    _type == "relatedPostsBlock" => {
      _type,
      "items": items[] {
        ...,
        _type == "reference" => {
          ...,
          "_refType": @->_type,
          "title": @->title,
          "slug": @->slug,
          "pathname": "${ROUTE.blog}/" + @->slug.current,
          "publishedAt": @->publishedAt,
          "authors": @->authors[]->{
            name,
            "photo": photo.asset->url + "?w=64&h=64&fit=crop&auto=format"
          }
        }
      }
    },
    _type == "quoteBlock" => {
      ...,
      "authors": authors[]{
        ...,
        "photo": photo.asset->url + "?w=64&h=64&fit=crop&auto=format"
      }
    }
  },
  "authors": authors[]->{
    name,
    position,
    "photo": photo.asset->url + "?w=88&h=88&fit=crop&auto=format"
  },
  "seo": {
    "title": coalesce(seo.title, title, ""),
    "description": coalesce(seo.description, caption, ""),
    "socialImage": coalesce(seo.socialImage->url + "?w=1200&h=630&fit=crop&auto=format", "/social-previews/index.jpg"),
    "noIndex": seo.noIndex == true
  }
`;

// Query for all posts with pagination
export const postsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    ${postCardFields}
  }
`;

// Query for a single post by slug
export const postBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    ${fullPostFields}
  }
`;

// Query for pagination
export const totalPostsQuery = groq`{
  "total": count(*[_type == "blogPost"]),
  "nonFeatured": count(*[_type == "blogPost" && (!defined(isFeatured) || isFeatured == false)])
}
`;

// Query for paginated posts
export const paginatedPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc)[$start...$end] {
    ${postCardFields}
  }
`;

// Query for paginated non-featured posts
export const paginatedNonFeaturedPostsQuery = groq`
  *[_type == "blogPost" && (!defined(isFeatured) || isFeatured == false)] | order(publishedAt desc)[$start...$end] {
    ${postCardFields}
  }
`;
