import { type ReactNode, type SelectHTMLAttributes } from 'react';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  children: ReactNode;
  disabled?: boolean;
};

function Select({ children, disabled, ...rest }: SelectProps) {
  return (
    <select
      disabled={disabled}
      {...rest}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      {children}
    </select>
  );
}

export default Select;
