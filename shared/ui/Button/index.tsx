'use client';

import Link from 'next/link';

import { cn } from '@/shared/lib/utils';

type commonProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  href?: string;
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
};

export type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> &
  commonProps;

export type LinkButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & commonProps;

export function Button({
  children,
  className,
  disabled,
  variant = 'default',
  size = 'md',
  href,
  onClick,
  ...props
}: ButtonProps & LinkButtonProps) {
  const variants = {
    default: 'bg-blue-500 text-white hover:bg-blue-600',
    outline: 'border border-solid border-black text-black hover:bg-gray-100',
    ghost: 'bg-transparent text-black hover:bg-gray-100',
    link: 'text-black hover:underline',
    secondary: 'bg-purple-500 text-white hover:bg-purple-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    success: 'bg-green-500 text-white hover:bg-green-600',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
  };

  const baseStyles = cn(
    'inline-flex items-center justify-center rounded select-none transition-colors',
    disabled && 'pointer-events-none cursor-not-allowed opacity-50',
    variants[variant],
    size === 'sm' && 'px-2 py-1 text-sm',
    size === 'md' && 'px-4 py-2',
    size === 'lg' && 'px-6 py-3 text-lg',
    className
  );

  if (href) {
    return (
      <Link
        className={baseStyles}
        href={href}
        onClick={onClick}
        {...(props as LinkButtonProps)}
        aria-disabled={disabled}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={baseStyles}
      disabled={disabled}
      type="button"
      onClick={onClick}
      {...(props as ButtonProps)}>
      {children}
    </button>
  );
}

export default Button;
