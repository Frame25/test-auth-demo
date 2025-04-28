import { useContext } from 'react';

import { ToastContext } from './ToastProvider';

export * from './ToastProvider';
export * from './Toast';
export * from './ToastRoot';

export const useToasts = () => useContext(ToastContext);
