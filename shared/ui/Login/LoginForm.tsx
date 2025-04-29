'use client';

import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { z } from 'zod';

import DATA from '@/shared/data.json';
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
  const router = useRouter();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnChange: true,
    validateOnBlur: true,
    validate: (values) => {
      const validation = LoginFormSchema.safeParse(values);
      if (!validation.success) {
        return validation.error.errors.reduce((result: Record<string, string>, error) => {
          result[String(error.path[0])] = error.message;
          return result;
        }, {});
      }
      return {};
    },
    onSubmit: async (values) => {
      try {
        const result = await onLogin(values);

        if (result.error) {
          notify?.({
            title: 'Login Error',
            content: result.error,
            variant: 'danger',
          });
          return;
        }

        notify?.({
          content: 'You logged in successfully',
          variant: 'success',
        });

        router.push('/');
        router.refresh();
      } catch (e) {
        console.error('Login error:', e);
        notify?.({
          title: 'Login Error',
          content: 'An unexpected error occurred',
          variant: 'danger',
        });
      }
    },
  });

  const handleFillDemo = () => {
    form.setValues(
      {
        email: DATA.users[0].email,
        password: DATA.users[0].password,
      },
      true
    ); // validateForm: true
  };

  return (
    <form
      aria-describedby="login-popup-description"
      aria-label="Login form"
      className={cn('flex flex-col gap-2', className)}
      role="form"
      onSubmit={form.handleSubmit}>
      <div className="mb-4">
        <p id="login-popup-description">Please enter your email and password to login</p>
        <p className="text-sm opacity-50 select-none">
          You can click{' '}
          <button
            aria-label="Fill form with demo credentials"
            className="cursor-pointer font-bold text-sky-500"
            type="button"
            onClick={handleFillDemo}>
            here
          </button>{' '}
          to fill form with demo credentials
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
        value={form.values.email}
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
        value={form.values.password}
        onBlur={form.handleBlur}
        onChange={form.handleChange}
      />

      <Button
        aria-label="Submit login form"
        className="mt-8"
        disabled={!form.isValid || form.isSubmitting}
        type="submit"
        variant={form.isValid ? 'success' : 'danger'}>
        {form.isSubmitting ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
}
