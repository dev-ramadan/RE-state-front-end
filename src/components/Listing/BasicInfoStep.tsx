import Input from '../../ui/Input';
import InputField from '../../ui/InputField';
import Step from './Step';
import Select from '../../ui/Select';
import Option from '../../ui/Option';
import { PropertyPurposeOptions, PropertyTypeOptions } from '../../constants/options';
import { useFormContext } from 'react-hook-form';
import { PropertyNameValidation } from '../../utils/validation';
import { ControlledSelector } from '../../ui/ControllerSelector';
import ErrorMessage from '../../ui/ErrorMessage';
import type { Compound } from '../../types/compound';
import { useCompounds } from '../../hooks/useCompound';

function BasicInfoStep() {
  const { register, control } = useFormContext();
  // Access the client
  const { isLoading, isError, data: compoundOptions } = useCompounds();
  return (
    <Step title="basic information">
      {/* property title */}
      <InputField id="title" label="Property title *">
        <Input
          id="title"
          type="text"
          placeholder="e.g., Beautiful 3BR House with Garden"
          {...register('title', PropertyNameValidation)}
        />
        <ErrorMessage name="title" />
      </InputField>
      {/*  Listing purpose sale/rent*/}
      <ControlledSelector
        control={control}
        name="propertyPurpose"
        options={PropertyPurposeOptions}
        rules={{ required: 'property Purpose is required' }}
        title="Listing purpose *"
      />
      {/* Property type  res/com*/}
      <InputField id="propertyType" label="Property type *">
        <Select {...register('propertyType', { required: 'Please select a propertyType' })}>
          {PropertyTypeOptions.map((opt) => (
            <Option label={opt.label} value={opt.value} key={opt.value} />
          ))}
        </Select>
        <ErrorMessage name="propertyType" />
      </InputField>
      {/* Compound */}
      <InputField id="compound" label="Compound">
        <Select disabled={isLoading || isError} {...register('compoundId')}>
          <Option key={'0'} value="" label="" />
          {isLoading && <Option label="Loading compounds..." value="" />}
          {isError && <Option label="Failed to load compounds" value="" />}
          {!isLoading &&
            !isError &&
            compoundOptions &&
            compoundOptions?.data?.items?.map((compound: Compound) => (
              <Option key={compound.compoundId} value={compound.compoundId} label={compound.name} />
            ))}
        </Select>
        <ErrorMessage name="compoundId" />
      </InputField>
    </Step>
  );
}

export default BasicInfoStep;
