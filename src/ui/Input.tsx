import type React from 'react';
import { twMerge } from 'tailwind-merge';
type InputProps = React.ComponentPropsWithoutRef<'input'> & {
  className?: string;
};
function Input({ className, ...rest }: InputProps) {
  var base =
    'capitalize w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150';
  const combined = twMerge(base, className);
  return <input className={combined} {...rest} />;
}

export default Input;
