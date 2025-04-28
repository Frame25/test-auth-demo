'use client';

import { FocusTrap } from 'focus-trap-react';
import { X } from 'lucide-react';
import { useCallback, useContext, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { cn, uuid } from '@/shared/lib/utils';

import { PopupContext } from './PopupProvider';

export function PopupTitle({
  children,
  id,
  className,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <div
      className={cn('border-foreground/30 mb-4 border-b pr-4 pb-2 text-lg font-bold', className)}
      id={id}>
      {children}
    </div>
  );
}

export function PopupFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('border-foreground/30 mt-4 border-t pt-2 text-lg font-bold', className)}>
      {children}
    </div>
  );
}

export function Popup({
  children,
  classNames,
  size = 'md',
  visible,
  title,
  footer,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  onClose,
}: {
  children: React.ReactNode;
  classNames?: {
    overlay?: string;
    container?: string;
    closeButton?: string;
    title?: string;
    footer?: string;
  };
  visible?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'full';
  title?: React.ReactNode;
  footer?: React.ReactNode;
  'aria-label'?: string;
  'aria-describedby'?: string;
  onClose?: () => void;
}) {
  const ref = useContext(PopupContext);
  const titleId = useRef(`popup-title-${uuid()}`).current;

  const sizeClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    full: 'rounded-none h-full w-full overflow-scroll',
  }[size];

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onClose) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (visible) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [visible, handleKeyDown]);

  useEffect(() => {
    if (visible) {
      // TODO: Hide other content from screen readers
      // document.body?.setAttribute('aria-hidden', 'true');
      return () => {
        // document.body?.removeAttribute('aria-hidden');
      };
    }
  }, [visible]);

  if (!ref?.current) return null;

  return (
    <>
      {createPortal(
        visible && (
          <FocusTrap>
            <div>
              <div
                role="presentation"
                className={cn(
                  'fixed top-0 left-0 h-screen w-screen bg-black/50',
                  classNames?.overlay
                )}
                onClick={onClose}></div>
              <div
                aria-describedby={ariaDescribedBy}
                aria-label={typeof title === 'string' ? title : ariaLabel}
                aria-labelledby={title ? titleId : undefined}
                aria-modal="true"
                role="dialog"
                className={cn(
                  'bg-background fixed top-1/2 left-1/2 flex max-h-full w-full -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg p-4',
                  sizeClass,
                  classNames?.container
                )}>
                <div className="flex flex-col overflow-scroll">
                  {title && (
                    <PopupTitle className={classNames?.title} id={titleId}>
                      {title}
                    </PopupTitle>
                  )}
                  <div className="shrink-1 overflow-scroll">{children}</div>
                  {footer && <PopupFooter className={classNames?.footer}>{footer}</PopupFooter>}
                </div>
                {onClose && (
                  <button
                    aria-label="Close dialog"
                    type="button"
                    className={cn(
                      'group/popup-close absolute top-0 right-0 cursor-pointer rounded-bl-lg bg-black/70 p-2 transition duration-500 hover:bg-black/90',
                      classNames?.closeButton
                    )}
                    onClick={onClose}>
                    <X className="size-4 text-white transition-all duration-500 group-hover/popup-close:scale-110" />
                  </button>
                )}
              </div>
            </div>
          </FocusTrap>
        ),
        ref.current
      )}
    </>
  );
}

export default Popup;
