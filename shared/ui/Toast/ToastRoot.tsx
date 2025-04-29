'use client';

import { cn } from '@/shared/lib/utils';

import type { ToastProps } from './Toast';
import { Toast } from './Toast';

export type ToastPosition = 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';

export function ToastRoot({
  items = [],
  position = 'bottom-right',
}: {
  items: ToastProps[];
  position?: ToastPosition;
}) {
  return (
    <div
      className={cn(
        'pointer-events-none fixed z-10 flex h-fit w-fit flex-col gap-2 p-4',
        position === 'top-right' && 'top-0 right-0',
        position === 'bottom-right' && 'right-0 bottom-0',
        position === 'top-left' && 'top-0 left-0',
        position === 'bottom-left' && 'bottom-0 left-0'
      )}>
      {items.map((item) => (
        <Toast key={item.id} {...item} />
      ))}
    </div>
  );
}

export default ToastRoot;
