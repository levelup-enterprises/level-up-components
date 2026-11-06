import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: React.HTMLAttributes<any> | ClassValue | any): string {
  return twMerge(clsx(inputs));
}
