import type { ReactNode } from 'react';

type gridOptions = {
  children: ReactNode;
  className?: string;
};
function Grid({ children, className, ...res }: gridOptions) {
  return (
    <div className={`grid ${className}`} {...res}>
      {children}
    </div>
  );
}

export default Grid;
