import type { ReactNode } from 'react';

type OptionSelectorOptionProps<T extends string> =
  | {
      multiple: false;
      value: T;
      onChange: (type: T) => void;
      icon: ReactNode;
      option: T;
      label?: string;
    }
  | {
      multiple: true;
      value: T[];
      onChange: (type: T[]) => void;
      icon: ReactNode;
      option: T;
      label?: string;
    };

function OptionSelectorOption<T extends string>({
  onChange,
  value,
  icon,
  option,
  label,
  multiple,
}: OptionSelectorOptionProps<T>) {
  const isSelected = multiple ? value.includes(option) : value === option;

  function handleChange() {
    if (multiple) {
      const typedValue = value as T[];
      const typedOnChange = onChange as (type: T[]) => void;

      const newValue = typedValue.includes(option)
        ? typedValue.filter((v) => v !== option)
        : [...typedValue, option];

      typedOnChange(newValue);
    } else {
      const typedOnChange = onChange as (type: T) => void;
      typedOnChange(option);
    }
  }

  return (
    <button
      type="button"
      onClick={handleChange}
      className={`p-4 rounded-xl border-2 transition-all duration-200 shadow-sm flex flex-col items-center group ${
        isSelected
          ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold'
          : 'border-gray-200 bg-white hover:bg-gray-50'
      }`}
    >
      <span className="h-6 w-6 mb-1 transition-colors group-hover:text-blue-600">{icon}</span>
      {label && <span className="text-l font-semibold capitalize">{label}</span>}
      {!label && <span className="text-l  font-semibold capitalize">{option}</span>}
    </button>
  );
}

export default OptionSelectorOption;
