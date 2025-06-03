import { CustomValidator, Slug } from 'sanity';
import slugify from 'slugify';

export const customSlugify = (input: string): string => {
  return slugify(input, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
  }).slice(0, 200);
};

export const customSlugValidation: CustomValidator<Slug | undefined> = (slug) => {
  if (typeof slug === 'undefined') {
    return true;
  }

  if (!slug.current.match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)) {
    return 'Invalid slug format. Use lowercase letters, numbers, and hyphens only. Cannot start or end with hyphen.';
  }

  if (slug.current.length > 200) {
    return 'Slug is too long. Maximum length is 200 characters.';
  }

  return true;
};
