import { useFormContext } from 'react-hook-form';
import {
  bathroomsOptions,
  bedroomsOptions,
  FloorNumberOptions,
  FloorsOptions,
  KitchenTypeOptions,
} from '../../constants/options';
import Grid from '../../ui/Grid';
import Input from '../../ui/Input';
import InputField from '../../ui/InputField';
import Option from '../../ui/Option';
import Select from '../../ui/Select';
import Step from './Step';
import { nameValidation, priceValidation, sizeValidation } from '../../utils/validation';
import ErrorMessage from '../../ui/ErrorMessage';
import BooleanInputField from '../../ui/BooleanInputFIeld';

function PricePropertyDetailsStep() {
  const { register, watch } = useFormContext();
  const propertyType = watch('propertyType');
  return (
    <Step title="Price & Property Details">
      {/* price */}
      <InputField id="price" label="price *">
        <Input
          id="price"
          type="number"
          placeholder="enter price"
          {...register('price', priceValidation)}
        />
        <ErrorMessage name="price" />
      </InputField>
      {propertyType == 0 && (
        <>
          {/*  bedrooms and bathrooms */}
          <Grid className="grid-cols-2 gap-6">
            {/* bedrooms */}
            <InputField id="bedrooms" label="Bedrooms *">
              <Select {...register('bedrooms', { required: 'Please select number of bedrooms' })}>
                {bedroomsOptions.map((opt) => (
                  <Option label={opt.label} value={opt.value} key={opt.value} />
                ))}
              </Select>
              <ErrorMessage name="bedrooms" />
            </InputField>
            {/* Bathrooms */}
            <InputField id="bathrooms" label="Bathrooms *">
              <Select {...register('bathrooms', { required: 'Please select number of bathrooms' })}>
                {bathroomsOptions.map((opt) => (
                  <Option label={opt.label} value={opt.value} key={opt.value} />
                ))}
              </Select>
              <ErrorMessage name="bathrooms" />
            </InputField>
          </Grid>
          <Grid className="grid-cols-2 gap-6">
            {/* KitchenType */}
            <InputField id="kitchenType" label="KitchenType *">
              <Select
                {...register('kitchenType', { required: 'Please select number of KitchenType' })}
              >
                {KitchenTypeOptions.map((opt) => (
                  <Option label={opt.label} value={opt.value} key={opt.value} />
                ))}
              </Select>
              <ErrorMessage name="kitchenType" />
            </InputField>
            {/* floors */}
            <InputField id="floors" label="floors *">
              <Select {...register('floors', { required: 'Please select number of floors' })}>
                {FloorsOptions.map((opt) => (
                  <Option label={opt.label} value={opt.value} key={opt.value} />
                ))}
              </Select>
              <ErrorMessage name="floors" />
            </InputField>
          </Grid>
        </>
      )}
      {propertyType == 1 && (
        <Grid className="grid-cols-2 gap-6">
          {/* businessType */}
          <InputField id="businessType" label="businessType *">
            <Input
              id="businessType"
              type="text"
              placeholder="enter businessType"
              {...register('businessType', nameValidation)}
            />
            <ErrorMessage name="businessType" />
          </InputField>
          {/* floorNumber */}
          <InputField id="floorNumber" label="floorNumber *">
            <Select
              {...register('floorNumber', { required: 'Please select number of floorNumber' })}
            >
              {FloorNumberOptions.map((opt) => (
                <Option label={opt.label} value={opt.value} key={opt.value} />
              ))}
            </Select>
            <ErrorMessage name="floorNumber" />
          </InputField>
        </Grid>
      )}
      {/* size */}
      <InputField id="square" label="size *">
        <Input
          id="square"
          type="number"
          placeholder="enter size"
          {...register('square', sizeValidation)}
        />
        <ErrorMessage name="square" />
      </InputField>
      {propertyType == 1 && (
        <InputField id="hasStorage" label="Has Storage">
          <BooleanInputField
            id="hasStorage"
            className="w-5 h-5 accent-blue-600"
            {...register('hasStorage')}
          />
          <ErrorMessage name="hasStorage" />
        </InputField>
      )}
    </Step>
  );
}

export default PricePropertyDetailsStep;
