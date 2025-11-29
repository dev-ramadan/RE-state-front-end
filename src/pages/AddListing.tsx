import { FormProvider, useForm } from 'react-hook-form';
import BasicInfoStep from '../components/Listing/BasicInfoStep';
import DescriptionAmenitiesStep from '../components/Listing/DescriptionAmenitiesStep';
import LocationStep from '../components/Listing/LocationStep';
import PricePropertyDetailsStep from '../components/Listing/PricePropertyDetailsStep';
import Button from '../ui/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import ImageUploadStep from '../components/Listing/ImageUploadStep';
import { CheckCircle } from 'lucide-react';
import type { ListingFormInputs } from '../types/property';
import PageHeader from '../components/Listing/PageHeader';
import { defaultResidentialValues } from '../constants/ListingDefaults';
import { commercialStepFields, residentialStepFields } from '../constants/ListingFields';
import Input from '../ui/Input';
import Loader from '../ui/Loader';
import { useAddProperty } from '../hooks/useProperty';
import Container from '../ui/Continer';
import { useAuth } from '../context/AuthContext';

function AddListing() {
  const { user } = useAuth();
  const methods = useForm<ListingFormInputs>({
    mode: 'onChange',
    defaultValues: {
      ...defaultResidentialValues,
      userId: user?.userId,
    },
  });
  const [step, setStep] = useState<number>(1);
  const { mutate: AddProperty, isPending } = useAddProperty();
  const navigate = useNavigate();

  async function nextStep() {
    // invalid step
    if (step >= 5) return;
    // Get property type (0 = residential, 1 = commercial)
    const propertyType = methods.getValues('propertyType');
    const fieldsToValidate =
      propertyType === 0 ? residentialStepFields[step] : commercialStepFields[step];
    const isStepValid = await methods.trigger(fieldsToValidate);
    if (!isStepValid) return; // stop if validation fails
    // next step
    setStep((s) => s + 1);
  }
  function prevStep() {
    if (step <= 1) return;
    setStep((step) => step - 1);
  }
  function onSubmit(formData: ListingFormInputs) {
    AddProperty(formData, {
      onSuccess: () => {
        setStep(6);
        toast.success('Listing created successfully');
        setTimeout(() => navigate('/'), 2000);
      },
    });
  }
  //  scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  if (step === 6) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Listing Created!</h2>
          <p className="text-gray-600 mb-4">
            Your property has been successfully listed on First Estate.
          </p>
          <p className="text-sm text-gray-500">Redirecting to home page...</p>
        </div>
      </div>
    );
  }
  if (isPending) {
    return <Loader />;
  }
  return (
    <Container>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="Create New Listing"
          subtitle="Fill out the details below to publish your listing."
          step={step}
          totalSteps={5}
          color="bg-indigo-600"
        />
        {/* Form Content */}
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="bg-white rounded-lg shadow-sm p-6 mb-20"
          >
            {/* defaults */}
            <Input
              type="hidden"
              {...methods.register('userId', { required: 'user id is required' })}
            />
            <Input
              type="hidden"
              {...methods.register('propertyStatus', { required: 'propertyStatus  is required' })}
            />
            {/*  information steps */}
            {step == 1 && <BasicInfoStep />}
            {step == 2 && <LocationStep />}
            {step == 3 && <PricePropertyDetailsStep />}
            {step == 4 && <DescriptionAmenitiesStep />}
            {step == 5 && <ImageUploadStep required={true} />}
            {/* Navigation Buttons */}
            <div className="flex justify-between gap-6 mt-8 pt-6 border-t border-gray-200">
              {step >= 1 && (
                <Button
                  variant="secondary"
                  fullWidth={false}
                  onClick={prevStep}
                  type="button"
                  disabled={step == 1}
                >
                  Previous
                </Button>
              )}
              {step < 5 ? (
                <Button variant="primary" fullWidth={false} onClick={nextStep} type="button">
                  Next
                </Button>
              ) : (
                <Button variant="primary" fullWidth={false} type="submit">
                  Create Listing
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </Container>
  );
}

export default AddListing;
