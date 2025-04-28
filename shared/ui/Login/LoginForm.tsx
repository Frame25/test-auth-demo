'use client';

import { useFormik } from 'formik';
import { useRef } from 'react';
import { z } from 'zod';

import { users } from '@/shared/data.json';
import { cn } from '@/shared/lib/utils';
import { Input, InputPassword } from '@/shared/ui/Input';
import { useToasts } from '@/shared/ui/Toast';

import Button from '../Button';

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password should contain at least one capital letter, one number and one special symbol'
    ),
});

export type LoginFormSuccessFunction = (values: Record<string, string>) => Promise<any>;

export function LoginForm({
  className,
  onLogin,
}: {
  className?: string;
  onLogin: LoginFormSuccessFunction;
}) {
  const { notify } = useToasts();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const form = useFormik({
    validate(values) {
      const validation = LoginFormSchema.safeParse(values);

      if (!validation.success) {
        return validation.error.errors.reduce((result: Record<string, string>, error) => {
          result[String(error.path[0])] = error.message;
          return result;
        }, {});
      }
    },
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        await onLogin(values);
        notify?.({
          content: 'You logged in successfully',
          variant: 'success',
        });
      } catch (e) {
        console.log('Invalid credentials', e);
        notify?.({
          title: 'Login Error',
          content: 'Please enter a valid email and password',
          variant: 'danger',
        });
      }
    },
  });

  const handleFillDemo = async () => {
    await form.setFieldValue('email', users[0].email);
    await form.setFieldValue('password', users[0].password);
    if (emailInputRef.current) emailInputRef.current.value = users[0].email;
    if (passwordInputRef.current) passwordInputRef.current.value = users[0].password;
  };

  return (
    <form className={cn('flex flex-col gap-2', className)} role="form">
      <div className="mb-4">
        <p id="login-popup-description">Please enter your email and password to login</p>
        <p className="text-sm opacity-50 select-none">
          You can click{' '}
          <button
            className="cursor-pointer font-bold text-sky-500"
            type="button"
            onClick={handleFillDemo}>
            here
          </button>{' '}
          to fill form with demo credetntials
        </p>
      </div>
      <Input
        autoComplete="email"
        className="mb-2"
        error={form.errors.email}
        id="login-email"
        label="Email"
        name="email"
        placeholder="Email"
        ref={emailInputRef}
        type="email"
        onBlur={form.handleBlur}
        onChange={form.handleChange}
      />
      <InputPassword
        autoComplete="current-password"
        error={form.errors.password}
        id="login-password"
        label="Password"
        name="password"
        placeholder="Password"
        ref={passwordInputRef}
        onBlur={form.handleBlur}
        onChange={form.handleChange}
      />

      <Button
        className="mt-8"
        disabled={!form.isValid}
        type="submit"
        variant={form.isValid ? 'success' : 'danger'}
        onClick={form.handleSubmit}>
        Login
      </Button>
    </form>
  );
}

export default LoginForm;
