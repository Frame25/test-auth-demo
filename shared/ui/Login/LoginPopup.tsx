'use client';

import { useDisclosure } from '@/shared/lib/popups';
import { Button } from '@/shared/ui/Button';
import { Popup } from '@/shared/ui/Popup';

import { LoginForm, type LoginFormSuccessFunction } from './LoginForm';

export function LoginPopup({ onLogin }: { onLogin: LoginFormSuccessFunction }) {
  const { isOpen, toggle, setIsOpen } = useDisclosure();

  return (
    <>
      <Button variant="secondary" onClick={toggle}>
        Login
      </Button>
      <Popup title="Login" visible={isOpen} onClose={() => setIsOpen(false)}>
        <LoginForm onLogin={onLogin} />
      </Popup>
    </>
  );
}

export default LoginPopup;
