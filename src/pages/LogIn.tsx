import { Building2 } from 'lucide-react';
import InputField from '../ui/InputField';
import Input from '../ui/Input';
import PasswordInput from '../components/auth/PasswordInput';
import AuthActions from '../components/auth/AuthActions';
import { Link, useNavigate } from 'react-router-dom';
import FormHeader from '../components/auth/FormHeader';
import { useForm } from 'react-hook-form';
import { nameValidation, passwordValidtion } from '../utils/validation';
import ErrorMessage from '../ui/ErrorMessage';
import type { UserSignIn } from '../types/User';
import Container from '../ui/Continer';
import { useHomePageRedirect, useLogin } from '../hooks/useAuth';
import Loader from '../ui/Loader';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignIn>({
    defaultValues: {
      userName: '',
      password: '',
    },
    mode: 'onSubmit',
  });
  const { mutate: login, isPending } = useLogin();
  const navigate = useNavigate();
  async function onSubmit({ userName, password }: UserSignIn) {
    login(
      { userName, password },
      {
        onSuccess: () => {
          navigate('/');
        },
      }
    );
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
          {/* userName */}
          <InputField id="userName" label="User Name *">
            <Input
              id="userName"
              type="text"
              placeholder="user name"
              {...register('userName', nameValidation)}
            />
            {errors.userName && <ErrorMessage>{errors.userName.message}</ErrorMessage>}
          </InputField>
          {/* password */}
          <InputField id="password" label="Password *">
            <PasswordInput id="password" {...register('password', passwordValidtion)} />
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          </InputField>
          {/* actions  */}
          <AuthActions actionFor="Sign In" />
        </form>
        {/* footer */}
        <p className="text-gray-600 text-sm mt-6">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
      {/* toasts rendered globally via Toaster in App */}
    </Container>
  );
}

export default Login;
