import React, { type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge'; // helps cleanly merge Tailwind classes
import { Link } from 'react-router-dom'; // optional, for `to` support
type ButtonVariants = 'primary' | 'secondary' | 'destructive' | 'transDestructive';
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: ButtonVariants;
  className?: string;
  to?: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button';
  size?: 'base' | 'small';
};

function Button({
  children,
  variant = 'primary',
  size = 'base',
  className,
  onClick,
  to,
  fullWidth = true,
  icon,
  type = 'button',
  ...rest
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed capitalize';

  const variants: Record<ButtonVariants, string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300',
    secondary: 'border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-400',
    destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300',
    transDestructive:
      'border border-red-200 text-red-600 rounded-md hover:bg-red-50 disabled:bg-red-300 ',
  };

  const btnSize = size === 'base' ? 'px-4 py-3 text-base' : 'px-3 py-1.5 text-sm';

  const combined = twMerge(
    base,
    variants[variant],
    btnSize,
    fullWidth ? 'w-full' : 'w-auto',
    className
  );

  // If `to` is provided, render as a <Link> instead of <button>
  if (to) {
    return (
      <Link to={to} className={combined}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combined} {...rest} onClick={onClick} type={type}>
      <div className="flex gap-2">
        {children} {icon}
      </div>
    </button>
  );
}

export default Button;
