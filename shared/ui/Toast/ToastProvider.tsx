'use client';

import { createContext, useEffect, useRef, useState } from 'react';

import { uuid } from '@/shared/lib/utils';

import type { ToastProps } from './Toast';
import type { ToastPosition } from './ToastRoot';
import { ToastRoot } from './ToastRoot';

export type NotifyProps = Omit<ToastProps, 'id'> & { id?: string };

export type ToastContextType = {
  notify?: (props: NotifyProps) => void;
  items?: ToastProps[];
  remove?: (id: string) => void;
};

export const ToastContext = createContext<ToastContextType>({});

export function ToastProvider({
  children,
  position,
}: {
  children: React.ReactNode;
  position?: ToastPosition;
}) {
  const [items, setItems] = useState<ToastProps[]>([]);
  const itemsRef = useRef<ToastProps[]>([]);

  function notify(props: NotifyProps) {
    if (!props.id) {
      const id = uuid();
      props.id = id;
    }
    if (!props.timeout && props.timeout !== null) {
      props.timeout = 5000;
    }

    setItems([props as ToastProps, ...items]);
    if (props.timeout) {
      setTimeout(() => {
        setItems(itemsRef.current.filter((item) => item.id !== props.id));
      }, props.timeout);
    }
  }

  const remove = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  return (
    <ToastContext.Provider value={{ items, notify, remove }}>
      {children}
      <ToastRoot items={items} position={position} />
    </ToastContext.Provider>
  );
}

export default ToastProvider;
