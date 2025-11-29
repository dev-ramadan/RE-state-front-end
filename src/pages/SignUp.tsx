import { Building2, Mail, Phone, User } from 'lucide-react';
import Loader from '../ui/Loader';
import InputField from '../ui/InputField';
import Input from '../ui/Input';
import PasswordInput from '../components/auth/PasswordInput';
import AuthActions from '../components/auth/AuthActions';
import { Link, useNavigate } from 'react-router';
import FormHeader from '../components/auth/FormHeader';
import { useForm } from 'react-hook-form';
import {
  agencyNameValidation,
  emailValidation,
  experienceYearsValidation,
  licenseIDValidation,
  nameValidation,
  nationalIDValidation,
  passwordValidtion,
  phoneValidation,
  taxIdentificationNumberValidation,
} from '../utils/validation';
import type { agentRegister, brokerRegister, customerRegister, RegitserForm } from '../types/User';
import { ControlledSelector } from '../ui/ControllerSelector';
import ErrorMessage from '../ui/ErrorMessage';
import Container from '../ui/Continer';
import Grid from '../ui/Grid';
import { useHomePageRedirect, useRegister } from '../hooks/useAuth';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

const defaultCustomer: customerRegister = {
  userName: '',
  email: '',
  password: '',
  phone: '',
  roleDiscriminator: 3,
};

const defaultAgent: agentRegister = {
  ...defaultCustomer,
  roleDiscriminator: 1,
  agencyName: '',
  taxIdentificationNumber: 0,
  experienceYears: 0,
};
const defaultBroker: brokerRegister = {
  ...defaultCustomer,
  roleDiscriminator: 2,
  nationalID: '',
  licenseID: '',
};

function Signup() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<RegitserForm>({
    defaultValues: defaultCustomer,
    mode: 'onSubmit',
  });
  const { mutate: registerUser, isPending } = useRegister();
  const navigate = useNavigate();
  const role = watch('roleDiscriminator');
  getValues();
  useHomePageRedirect();

  useEffect(() => {
    if (role === 1) reset(defaultAgent);
    else if (role === 2) reset(defaultBroker);
    else reset(defaultCustomer);
  }, [role, reset]);

  async function onSubmit(formData: RegitserForm) {
    formData;
    registerUser(formData, {
      onSuccess: () => {
        toast.success('Account created successfully');
        setTimeout(() => navigate('/'), 1400);
      },
    });
  }
  useHomePageRedirect();

  if (isPending) return <Loader />;
  return (
    <Container className="flex items-center justify-center bg-blue-100 text-black p-6 ">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md text-center">
        {/* Header */}
        <FormHeader
          Hcolor={'gray-900'}
          Pcolor={'gray-600'}
          Hchildren={'First Estate'}
          Pchildren={'Welcome back! Sign in to continue.'}
          icon={<Building2 className="h-8 w-8" />}
        />
        {/* Sign in Form */}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* select Type */}
          <ControlledSelector
            name="roleDiscriminator"
            control={control}
            rules={{ required: 'Please select a user type' }}
            title="I am signing up as a:"
            className="border-b border-gray-300"
            options={[
              { value: 3, label: 'customer', icon: <User /> },
              { value: 1, label: 'agent', icon: <Building2 /> },
              { value: 2, label: 'broker', icon: <Building2 /> },
            ]}
          />
          {/* email */}
          <InputField id="email" label="Email address" icon={<Mail />}>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="pl-10"
              {...register('email', emailValidation)}
            />
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </InputField>
          {/* password */}
          <InputField id="password" label="Password">
            <PasswordInput id="password" {...register('password', passwordValidtion)} />
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          </InputField>
          {/* full Name */}
          <InputField id="name" label="User Name">
            <Input
              type="text"
              id="name"
              placeholder="Your User Name"
              {...register('userName', nameValidation)}
            />

            {errors.userName && <ErrorMessage>{errors.userName.message}</ErrorMessage>}
          </InputField>
          {/* phoneNumber number */}
          <InputField id="phone" label="phone Number" icon={<Phone />}>
            <Input
              type="tel"
              id="phone"
              placeholder="(555) 555 - 555"
              className="pl-10"
              {...register('phone', phoneValidation)}
            />
            {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
          </InputField>

          {/* AgencyName */}
          {role == 1 && (
            <>
              <InputField id="agencyName" label="agencyName">
                <Input
                  type="text"
                  id="agencyName"
                  placeholder="Your Agency Name"
                  {...register('agencyName', agencyNameValidation)}
                />
                {errors.agencyName?.message && (
                  <ErrorMessage>{errors.agencyName.message}</ErrorMessage>
                )}
              </InputField>
              {/* Experience Information */}
              <Grid className="grid grid-cols-2 gap-4">
                {/* Tax Identification Number */}
                <InputField id="taxIdentificationNumber" label="Tax Identification Number">
                  <Input
                    type="number"
                    id="taxIdentificationNumber"
                    placeholder="Enter your tax identification number"
                    {...register('taxIdentificationNumber', taxIdentificationNumberValidation)}
                  />
                  {errors.taxIdentificationNumber && (
                    <ErrorMessage>{errors.taxIdentificationNumber.message}</ErrorMessage>
                  )}
                </InputField>
                {/* Experience Years */}
                <InputField id="experienceYears" label="Years of Experience">
                  <Input
                    type="number"
                    id="experienceYears"
                    placeholder="Enter total years of experience"
                    {...register('experienceYears', experienceYearsValidation)}
                  />
                  {errors.experienceYears && (
                    <ErrorMessage>{errors.experienceYears.message}</ErrorMessage>
                  )}
                </InputField>
              </Grid>
            </>
          )}
          {role == 2 && (
            <>
              <InputField id="nationalID" label="Years of Experience">
                <Input
                  type="number"
                  id="nationalID"
                  placeholder="Enter total years of experience"
                  {...register('nationalID', nationalIDValidation)}
                />
                {errors.nationalID && <ErrorMessage>{errors.nationalID.message}</ErrorMessage>}
              </InputField>
              <InputField id="licenseID" label="Years of Experience">
                <Input
                  type="number"
                  id="licenseID"
                  placeholder="Enter total years of experience"
                  {...register('licenseID', licenseIDValidation)}
                />
                {errors.experienceYears && (
                  <ErrorMessage>{errors.experienceYears.message}</ErrorMessage>
                )}
              </InputField>
            </>
          )}
          {/* actions  */}
          <AuthActions actionFor="create account" />
        </form>
        {/* footer */}
        <p className="text-gray-600 text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
      {/* toasts are rendered globally via Toaster in App */}
    </Container>
  );
}

export default Signup;
