import { CustomValidator } from 'sanity';

export const customLinkValidation: CustomValidator<string | undefined> = (value, context) => {
  const isRequired = context?.type?.options?.required || false;

  if (
    (!isRequired && !value) ||
    (value &&
      (value.startsWith('/') ||
        value.startsWith('#') ||
        value.match(/^(https?:\/\/|mailto:|tel:)/)))
  ) {
    return true;
  }

  return 'Please enter a valid URL (starting with "/" for internal links, "http://" / "https://" for external links, "mailto:" for email links or "tel:" for phone links)';
};
