'use client';

export function PopupRoot({ ref }: { ref: React.RefObject<HTMLDivElement | null> }) {
  return <div className="fixed bottom-0 left-0" ref={ref}></div>;
}

export default PopupRoot;
