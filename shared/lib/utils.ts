import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...args: ClassValue[]) => twMerge(clsx(...args));

export const uuid = () => {
  // generate unique id by Math.random()
  return `uuid-${Math.random().toString(36).substring(2)}`;
};
