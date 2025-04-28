'use client';

import { createContext, useRef } from 'react';

import PopupRoot from './PopupRoot';

export const PopupContext = createContext<React.RefObject<HTMLDivElement | null> | null>(null);

export function PopupProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <PopupContext.Provider value={ref}>
      {children}
      <PopupRoot ref={ref} />
    </PopupContext.Provider>
  );
}

export default PopupProvider;
