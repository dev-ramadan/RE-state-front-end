import { MapPinHouse } from 'lucide-react';
import Input from '../../ui/Input';
import InputField from '../../ui/InputField';
import Step from './Step';
import { useFormContext } from 'react-hook-form';
import { addressValidation, cityValidation, googleMapsUrlValidation } from '../../utils/validation';
import ErrorMessage from '../../ui/ErrorMessage';

function LocationStep() {
  const { register } = useFormContext();
  return (
    <Step title="Location Details">
      {/* street  address */}
      <InputField id="adress" label="street address *" icon={<MapPinHouse />}>
        <Input
          {...register('address', addressValidation)}
          className="pl-10 "
          id="adress"
          type="text"
          placeholder="enter the property address e.g., 15 El Tahrir St, Cairo, Egypt"
        />
        <ErrorMessage name="address" />
      </InputField>
      {/* city */}
      <InputField id="city" label="city *">
        <Input id="city" type="text" placeholder="city" {...register('city', cityValidation)} />
        <ErrorMessage name="city" />
      </InputField>
      {/* googleMapURL */}
      <InputField id="googleMapsUrl" label="googleMapsUrl *">
        <Input
          id="googleMapsUrl"
          type="text"
          placeholder="googleMapsUrl"
          {...register('googleMapsUrl', googleMapsUrlValidation)}
        />
        <ErrorMessage name="googleMapsUrl" />
      </InputField>
    </Step>
  );
}

export default LocationStep;
