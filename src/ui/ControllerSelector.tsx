import { Controller, type Control, type Path } from 'react-hook-form';
import OptionSelector from './OptionSelector';

type ControlledSelectorProps<T extends Record<string, any>> = {
  name: Path<T>;
  control: Control<T>;
  rules?: object;
  title: string;
  options: { value: string | number; icon: React.ReactNode; label?: string }[];
  className?: string;
  multiple?: boolean;
};

export function ControlledSelector<T extends Record<string, any>>({
  name,
  control,
  rules,
  title,
  options,
  multiple = false,
  className = '',
}: ControlledSelectorProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <OptionSelector
          title={title}
          value={field.value}
          onChange={field.onChange}
          options={options}
          className={className}
          multiple={multiple}
        />
      )}
    />
  );
}
