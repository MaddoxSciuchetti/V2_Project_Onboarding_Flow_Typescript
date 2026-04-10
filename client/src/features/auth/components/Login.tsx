import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { login } from '../api/auth.api';
import { LoginFormValues, loginSchema } from '../schemas/auth.schemas';
import { LoginAction } from './LoginAction';
import { InputFields } from './LoginBody';
import { PasswordForgot } from './PasswordForgot';
import DoorManCard from './resuable/DoorManCard';
import DoorManFooter from './resuable/DoorManFooter';

type LoginApiError = {
  status?: number;
  errorCode?: string;
  message?: string;
};

export function LoginComponent() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    mutate: signin,
    error,
    isPending,
  } = useMutation<unknown, LoginApiError, LoginFormValues>({
    mutationFn: login,
    onSuccess: () => {
      navigate({ to: '/worker-lifycycle' });
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    signin(data);
  };

  const authErrorMessage =
    error?.message || 'Nutzer nicht gefunden oder Zugangsdaten sind falsch.';

  return (
    <DoorManCard>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        {error && (
          <p className="mb-4 rounded-md border border-(--destructive) bg-(--destructive)/10 px-3 py-2 text-sm text-(--destructive)">
            {authErrorMessage}
          </p>
        )}
        <InputFields errors={errors} register={register} />
        <PasswordForgot />
        <LoginAction isPending={isPending} />
        <DoorManFooter
          description={`Don't have an account? ${''}`}
          action="Sign up"
          nav={() => navigate({ to: `/signup` })}
        />
      </form>
    </DoorManCard>
  );
}
