import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names with Tailwind Merge.
 *
 * @param args - Class values to merge.
 * @returns Merged class names.
 */
export function cn(...args: ClassValue[]): string {
  return twMerge(clsx(args));
}
