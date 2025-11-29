import { type ReactNode } from 'react';

interface CardSectionProps {
  children: ReactNode;
  className?: string;
}

export default function CardSection({ children, className = '' }: CardSectionProps) {
  return <div className={`bg-white rounded-xl shadow-sm p-4 ${className}`}>{children}</div>;
}
