import type { ReactNode } from 'react';
type FormHeaderProps = {
  Hchildren?: ReactNode;
  Pchildren?: ReactNode;
  icon?: ReactNode;
  Hcolor?: string;
  Pcolor?: string;
};
function FormHeader({ Hchildren, Pchildren, icon, Hcolor, Pcolor }: FormHeaderProps) {
  return (
    <div className="mb-8">
      {icon && (
        <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
          {icon}
        </div>
      )}
      <h1 className={`text-xl md:text-3xl font-extrabold text-${Hcolor}`}>{Hchildren}</h1>
      <p className={`text-${Pcolor} mt-2 text-base`}>{Pchildren}</p>
    </div>
  );
}

export default FormHeader;
