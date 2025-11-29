import { type ReactNode } from 'react';

type stepProps = {
  children: ReactNode;
  title: string;
};
function Step({ children, title }: stepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 capitalize">{title}</h2>
      {children}
    </div>
  );
}

export default Step;
