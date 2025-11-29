import type { ReactNode } from 'react';
import OptionSelectorOption from './OptionSelectorOption'; // Assuming OptionSelectorOption is in a separate file

type Option<T> = {
  value: T;
  icon: ReactNode;
  label?: string;
};

type SingleSelectProps<T extends string> = {
  multiple?: false;
  title: string;
  value: T;
  onChange: (value: T) => void;
  options: Option<T>[];
  className?: string;
};

type MultiSelectProps<T extends string> = {
  multiple: true;
  title: string;
  value: T[];
  onChange: (value: T[]) => void;
  options: Option<T>[];
  className?: string;
};

type OptionSelectorProps<T extends string> = SingleSelectProps<T> | MultiSelectProps<T>;

function OptionSelector<T extends string>({
  title,
  value,
  onChange,
  options,
  multiple = false,
  className = 'border-2 border-blue-400 p-2.5 rounded-2xl',
}: OptionSelectorProps<T>) {
  return (
    <div className={`mb-6 pb-4 ${className}`}>
      <label className="block text-base font-semibold text-gray-700 mb-3">{title}</label>

      <div className="grid grid-cols-3 gap-3 ">
        {options.map((opt) => {
          const commonProps = {
            icon: opt.icon,
            option: opt.value,
            label: opt.label,
          };

          if (multiple) {
            const multiProps = { value, onChange } as Pick<
              MultiSelectProps<T>,
              'value' | 'onChange'
            >;
            return (
              <OptionSelectorOption
                key={opt.value}
                {...commonProps}
                multiple={true}
                value={multiProps.value}
                onChange={multiProps.onChange}
              />
            );
          } else {
            const singleProps = { value, onChange } as Pick<
              SingleSelectProps<T>,
              'value' | 'onChange'
            >;
            return (
              <OptionSelectorOption
                key={opt.value}
                {...commonProps}
                multiple={false}
                value={singleProps.value}
                onChange={singleProps.onChange}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default OptionSelector;
