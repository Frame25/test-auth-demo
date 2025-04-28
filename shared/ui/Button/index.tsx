'use client';

import { cn } from '@/shared/lib/utils';

export function Button({
  children,
  className,
  disabled,
  variant = 'default',
  size = 'md',
  onClick,
}: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variant?:
    | 'default'
    | 'outline'
    | 'ghost'
    | 'link'
    | 'secondary'
    | 'danger'
    | 'success'
    | 'warning';
  size?: 'sm' | 'md' | 'lg';
  onClick?: (arg?: any) => void;
}) {
  const variants = {
    default: 'bg-blue-500 text-white',
    outline: 'border border-solid border-black text-black',
    ghost: 'bg-transparent text-black',
    link: 'text-black',
    secondary: 'bg-purple-500 text-white',
    danger: 'bg-red-500 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white',
  };

  return (
    <button
      disabled={disabled}
      className={cn(
        'cursor-pointer rounded select-none',
        disabled && 'pointer-events-none cursor-not-allowed opacity-50',
        variants[variant],
        size === 'sm' && 'px-2 py-1',
        size === 'md' && 'px-4 py-2',
        size === 'lg' && 'px-6 py-3',
        className
      )}
      onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
