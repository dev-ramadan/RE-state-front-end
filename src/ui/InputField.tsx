import type { ReactNode } from 'react';

type InputProps = {
  id: string;
  label?: string;
  icon?: ReactNode;
  children: ReactNode;
};
function InputField({ id, label, icon, children }: InputProps) {
  return (
    <div className="text-left relative">
      <label htmlFor={id} className="capitalize block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        {icon && <div className="text-gray-400 absolute left-3 top-4">{icon}</div>}
        {children}
      </div>
    </div>
  );
}

export default InputField;
