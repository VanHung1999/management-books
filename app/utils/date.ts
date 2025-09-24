/**
 * Date formatting utility functions
 */

/**
 * Format date to a readable string
 * @param date - Date object or date string
 * @param options - Intl.DateTimeFormatOptions
 * @param locale - Locale string (default: 'en-US')
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  },
  locale: string = 'en-US'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, options);
}

/**
 * Format date to short format (MM/DD/YYYY)
 * @param date - Date object or date string
 * @param locale - Locale string (default: 'en-US')
 * @returns Formatted date string
 */
export function formatDateShort(
  date: Date | string,
  locale: string = 'en-US'
): string {
  return formatDate(date, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }, locale);
}

/**
 * Format date to long format (Month Day, Year)
 * @param date - Date object or date string
 * @param locale - Locale string (default: 'en-US')
 * @returns Formatted date string
 */
export function formatDateLong(
  date: Date | string,
  locale: string = 'en-US'
): string {
  return formatDate(date, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }, locale);
}

/**
 * Format date with time
 * @param date - Date object or date string
 * @param options - Intl.DateTimeFormatOptions
 * @param locale - Locale string (default: 'en-US')
 * @returns Formatted date and time string
 */
export function formatDateTime(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  },
  locale: string = 'en-US'
): string {
  return formatDate(date, options, locale);
}

/**
 * Format date to relative time (e.g., "2 days ago", "in 3 hours")
 * @param date - Date object or date string
 * @param locale - Locale string (default: 'en-US')
 * @returns Relative time string
 */
export function formatRelativeTime(
  date: Date | string,
  locale: string = 'en-US'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, 'second');
  } else if (diffInSeconds < 3600) {
    return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
  } else if (diffInSeconds < 86400) {
    return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
  } else if (diffInSeconds < 2592000) {
    return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
  } else if (diffInSeconds < 31536000) {
    return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
  } else {
    return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
  }
}

/**
 * Format date to ISO string (YYYY-MM-DD)
 * @param date - Date object or date string
 * @returns ISO date string
 */
export function formatDateISO(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString().split('T')[0];
}

/**
 * Format date to Vietnamese locale
 * @param date - Date object or date string
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string in Vietnamese
 */
export function formatDateVietnamese(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
): string {
  return formatDate(date, options, 'vi-VN');
}

/**
 * Check if date is today
 * @param date - Date object or date string
 * @returns True if date is today
 */
export function isToday(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  return dateObj.toDateString() === today.toDateString();
}

/**
 * Check if date is yesterday
 * @param date - Date object or date string
 * @returns True if date is yesterday
 */
export function isYesterday(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return dateObj.toDateString() === yesterday.toDateString();
}

/**
 * Get date range text (e.g., "Jan 1 - Jan 31, 2024")
 * @param startDate - Start date
 * @param endDate - End date
 * @param locale - Locale string (default: 'en-US')
 * @returns Date range string
 */
export function formatDateRange(
  startDate: Date | string,
  endDate: Date | string,
  locale: string = 'en-US'
): string {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  
  const startFormatted = start.toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric'
  });
  
  const endFormatted = end.toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  return `${startFormatted} - ${endFormatted}`;
}
