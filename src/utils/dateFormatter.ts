export const formatDate = (date: string | Date): string => {
  if (!date) return '';
  const d = new Date(date);
  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(d);
};

/**
 * Formats a date into a full readable string including time.
 * Example: "January 2, 2026 at 2:30 PM"
 */
export const formatDateTime = (date: string | Date): string => {
  if (!date) return '';
  const d = new Date(date);
  return new Intl.DateTimeFormat('en-PH', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(d); // e.g., "January 2, 2026, 2:30 PM"
};

/**
 * Formats a date for HTML input elements (type="date").
 * Example: "2026-01-02"
 */
export const formatDateForInput = (date: string | Date): string => {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

/**
 * Calculates relative time (e.g., "2 hours ago", "Just now").
 * Great for notifications or forum posts.
 */
export const formatRelativeTime = (date: string | Date): string => {
  if (!date) return '';
  const d = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return formatDate(d); // Fallback to standard date if older than a week
};