import InputField from '../../ui/InputField';
import TextArea from '../../ui/TextArea';
import Step from './Step';
import { useFormContext } from 'react-hook-form';
import { descriptionValidation } from '../../utils/validation';
import ErrorMessage from '../../ui/ErrorMessage';
import Grid from '../../ui/Grid';
import BooleanInputField from '../../ui/BooleanInputFIeld';

function DescriptionAmenitiesStep() {
  const { register } = useFormContext();
  return (
    <Step title="Description & Amenities">
      {/* Property Description  */}
      <InputField id="description" label="Property Description *">
        <TextArea
          {...register('description', descriptionValidation)}
          placeholder="Describe your property, its features, neighborhood, and what makes it special..."
          rows={6}
        />
        <ErrorMessage name="description" />
      </InputField>

      {/* amenity options */}
      <Grid className="grid-cols-3 gap-6">
        <InputField id="amenity.hasElectricityLine" label="has Electricity Line">
          <BooleanInputField
            id="amenity.hasElectricityLine"
            className="w-5 h-5 accent-blue-600"
            {...register('amenity.hasElectricityLine')}
          />
          <ErrorMessage name="amenity.hasElectricityLine" />
        </InputField>
        <InputField id="amenity.hasWaterLine" label="Has Water Line">
          <BooleanInputField
            id="amenity.hasWaterLine"
            className="w-5 h-5 accent-blue-600"
            {...register('amenity.hasWaterLine')}
          />
          <ErrorMessage name="amenity.hasWaterLine" />
        </InputField>
        <InputField id="amenity.hasGasLine" label="Has Gas Line">
          <BooleanInputField
            id="amenity.hasGasLine"
            className="w-5 h-5 accent-blue-600"
            {...register('amenity.hasGasLine')}
          />
          <ErrorMessage name="amenity.hasGasLine" />
        </InputField>
      </Grid>
    </Step>
  );
}

export default DescriptionAmenitiesStep;
