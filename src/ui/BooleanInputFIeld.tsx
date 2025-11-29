import { twMerge } from 'tailwind-merge';

type BooleanInputFieldProps = {
  id: string;
  label?: string;
  className?: string;
};

function BooleanInputField({ id, label, className, ...res }: BooleanInputFieldProps) {
  return (
    <div className={twMerge('flex flex-col mb-4', className)}>
      <div className="flex items-center gap-3">
        {/* Toggle Switch */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" id={id} className="sr-only peer" {...res} />
          <div
            className="w-11 h-6 bg-gray-300 rounded-full peer-focus:ring-2 
            peer-focus:ring-blue-500 peer-checked:bg-blue-600 transition-all duration-200"
          ></div>
          <div
            className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full 
            transition-transform duration-200 peer-checked:translate-x-5"
          ></div>
        </label>

        {/* Label next to toggle */}
        <span className="text-sm text-gray-700 capitalize">{label}</span>
      </div>
    </div>
  );
}

export default BooleanInputField;
