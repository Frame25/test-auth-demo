'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/shared/lib/utils';

import { Input, type InputProps } from './Input';

export function InputPassword({ className, ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      className={cn('w-full', className)}
      type={showPassword ? 'text' : 'password'}
      after={
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      }
      {...props}
    />
  );
}

export default InputPassword;
