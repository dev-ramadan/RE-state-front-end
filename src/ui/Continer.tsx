import type { ReactNode } from 'react';

function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <main className={`min-h-screen bg-gray-50 py-8 ${className}`}>{children}</main>;
}

export default Container;
