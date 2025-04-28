'use client';

import { X } from 'lucide-react';
import { useContext } from 'react';

import { cn } from '@/shared/lib/utils';

import { ToastContext } from './ToastProvider';

export type ToastProps = {
  id: string;
  title?: string;
  content: string;
  variant?: 'default' | 'info' | 'danger' | 'warning' | 'success';
  closable?: boolean;
  timeout?: number | null;
  className?: string;
};

export function Toast({
  id,
  title,
  content,
  variant = 'default',
  closable,
  timeout,
  className,
}: ToastProps) {
  const { remove } = useContext(ToastContext);
  const variantClass = {
    default: 'bg-foreground/10',
    info: 'bg-blue-300 text-white',
    danger: 'bg-red-300 text-white',
    warning: 'bg-yellow-300 text-black',
    success: 'bg-green-300 text-white',
  }[variant];

  const handleClose = () => {
    remove?.(id);
  };

  return (
    <div
      data-id={id}
      className={cn(
        'pointer-events-auto relative flex max-w-sm flex-col gap-2 overflow-hidden rounded-lg p-2',
        variantClass,
        className
      )}>
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-sm">{content}</div>
      {Boolean(closable || !timeout) && (
        <button
          className="pointer-events-auto absolute top-0 right-0 z-10 cursor-pointer rounded-bl-lg bg-black/50 p-2 transition duration-500 hover:bg-black/70"
          type="button"
          onClick={handleClose}>
          <X className="size-4 text-white" />
        </button>
      )}
    </div>
  );
}

export default Toast;
