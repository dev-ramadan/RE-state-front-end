// src/ui/PasswordInput.tsx
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Input from '../../ui/Input';

type PasswordInputProps = React.ComponentPropsWithoutRef<'input'>;

export default function PasswordInput({ ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        type={visible ? 'text' : 'password'}
        placeholder={props.placeholder ?? '••••••••'}
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck="false"
        autoComplete="current-password"
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition duration-150"
      >
        {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    </div>
  );
}
