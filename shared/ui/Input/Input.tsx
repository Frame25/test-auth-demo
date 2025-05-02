'use client';

import { cn, uuid } from '@/shared/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  React.RefAttributes<HTMLInputElement> & {
    after?: React.ReactNode;
    before?: React.ReactNode;
    error?: string | null;
    label?: string;
    required?: boolean;
    classNames?: { wrapper?: string; input?: string; label?: string };
  };

export function Input({
  className,
  after,
  before,
  error,
  label,
  required,
  classNames,
  id = uuid(),
  ...props
}: InputProps) {
  return (
    <div className={className}>
      {label && (
        <label className={cn('block text-sm font-semibold', classNames?.label)} htmlFor={id}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div
        className={cn(
          'border-foreground/30 flex gap-2 rounded border border-solid p-2',
          classNames?.wrapper
        )}>
        {before}
        <input
          aria-describedby={error ? id + '-error' : undefined}
          aria-invalid={!!error}
          {...(!label && { 'aria-label': props.placeholder || '' })}
          id={id}
          required={required}
          className={cn(
            'bg-background text-foreground placeholder:text-foreground/50 w-full',
            classNames?.input
          )}
          {...props}
        />
        {after}
      </div>
      {error && (
        <p aria-live="assertive" className="text-sm text-red-500" id={id + '-error'} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
