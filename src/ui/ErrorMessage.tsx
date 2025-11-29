import { useFormContext, type FieldError, type FieldErrorsImpl, type Merge } from 'react-hook-form';

type ErrorType = string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;

type ErrorMessageProps = { name: string; children?: never } | { name?: never; children: ErrorType };

export default function ErrorMessage(props: ErrorMessageProps) {
  const form = useFormContext();
  let message: string | undefined;

  if ('name' in props && props.name) {
    const fieldError = form?.formState?.errors?.[props.name as keyof typeof form.formState.errors];
    if (fieldError && typeof fieldError === 'object' && 'message' in fieldError) {
      message = fieldError.message as string;
    }
  } else if ('children' in props) {
    const { children } = props;
    if (typeof children === 'string') {
      message = children;
    } else if (typeof children === 'object' && children && 'message' in children) {
      message = children.message as string;
    }
  }

  return message ? (
    <p className="text-red-500 text-sm mt-1 font-medium capitalize">{message}</p>
  ) : null;
}
