import { Children, isValidElement } from 'react';

import { type ClassValue, clsx } from 'clsx';
import slugify from 'slugify';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names using clsx and tailwind-merge
 * @param inputs - Array of class values to be merged
 *
 * @returns Combined and optimized class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats an author's name by abbreviating the last name
 * @param name - Full author name
 *
 * @returns Formatted author name with abbreviated last name
 */
export function getFormattedAuthorsName(name: string): string {
  const parts = name.split(' ');

  if (parts.length > 1) {
    parts[1] = parts[1][0] + '.';
  }

  return parts.join(' ');
}

/**
 * Formats a date into a readable string format
 * @param date - Date to format
 * @param formatType - Type of format to use: 'short' (MONTH DAY, YEAR) or 'long' (DAYth of MONTH, YEAR)
 *
 * @returns Formatted date string
 */
export function getFormattedDate(
  date: string | number | Date,
  formatType: 'short' | 'long' = 'short',
): string {
  const dateObj = new Date(date);

  if (formatType === 'long') {
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('en-US', { month: 'long' });
    const year = dateObj.getFullYear();

    // Add appropriate ordinal suffix
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const formatOrdinals = (day: number) => {
      const suffixes = ['th', 'st', 'nd', 'rd'];
      const relevantDigits = day % 100;
      const suffix =
        relevantDigits >= 11 && relevantDigits <= 13 ? 'th' : suffixes[day % 10] || 'th';

      return `${day}${suffix}`;
    };

    return `${formatOrdinals(day)} of ${month}, ${year}`;
  }

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  const formattedDate = dateObj.toLocaleDateString('en-GB', options);
  const [day, month, year] = formattedDate.split(' ');

  return `${month.toUpperCase()} ${day}, ${year}`;
}

/**
 * Calculates the estimated reading time for content
 * @param data - Content to analyze
 * @param extractContent - Optional function to extract content from data
 * @param wordsPerMinute - Reading speed in words per minute (default: 200)
 *
 * @returns Formatted reading time string
 */
export function getTimeToRead<T>(
  data: T,
  extractContent?: (data: T) => string,
  wordsPerMinute: number = 200,
): string {
  const content = extractContent ? extractContent(data) : String(data);
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);

  return `${minutes} min`;
}

/**
 * Generates a unique slug for headings with collision handling
 * @param text - Heading text to convert to slug
 * @param idCount - Record to track slug occurrences for uniqueness
 *
 * @returns Unique slug string
 */
export function generateHeadingSlug(text: string, idCount: Record<string, number>): string {
  let baseSlug = slugify(text, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
  });

  if (/^\d/.test(baseSlug)) {
    baseSlug = `h-${baseSlug}`;
  }

  if (idCount[baseSlug] !== undefined) {
    idCount[baseSlug]++;

    return `${baseSlug}-${idCount[baseSlug]}`;
  } else {
    idCount[baseSlug] = 0;

    return baseSlug;
  }
}

/**
 * Recursively extracts text content from React children
 * @param children - React children to extract text from
 *
 * @returns Plain text string from all nested children
 */
export function extractTextFromChildren(children: React.ReactNode): string {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        return child.toString();
      }
      if (isValidElement(child)) {
        return extractTextFromChildren(child.props.children);
      }

      return '';
    })
    .join('');
}

/**
 * Extracts and cleans a text excerpt from markdown content
 * @param {Object} params - The parameters object
 * @param {string} params.content - The raw content to extract from
 * @param {number} [params.length=5000] - Maximum length of the excerpt (defaults to 5000 characters)
 *
 * @returns {string} Clean text excerpt, truncated with ellipsis if exceeding max length
 */
export function getExcerpt({ content, length = 5000 }: { content: string; length?: number }) {
  return content.length > length ? `${content.substring(0, length)}...` : content;
}

/**
 * Extracts the YouTube ID from a YouTube URL or returns the ID if already provided
 * @param url - The YouTube URL or ID to extract/validate
 *
 * @returns The extracted/validated YouTube ID or null if invalid
 */
export function extractYouTubeId(url: string): string | null {
  // Check if the string is already a valid YouTube ID (11 characters)
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return url;
  }

  // Otherwise try to extract from URL
  const match = url.match(
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\?.*|&.*)?$/,
  );

  return match ? match[1] : null;
}
