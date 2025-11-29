import { capitalize } from '../utils/helper';

type OptionProps = {
  value: string | number;
  label: string;
};

function Option({ value, label }: OptionProps) {
  return (
    <option value={value} className="">
      {capitalize(label)}
    </option>
  );
}

export default Option;
