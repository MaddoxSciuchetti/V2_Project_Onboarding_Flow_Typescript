import CenteredDiv from '@/components/alerts/layout-wrapper/CenteredDiv';
import LoadingAlert from '@/components/alerts/LoadingAlert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { login } from '../api/auth.api';
import DoorManCard from './resuable/doorManCard';

export function LoginComponent() {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const {
    mutate: signin,
    isError,
    isPending,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate({ to: '/worker-lifycycle' });
    },
  });

  if (isPending)
    return (
      <CenteredDiv>
        <LoadingAlert />
      </CenteredDiv>
    );
  if (isError)
    return (
      <CenteredDiv>
        <Spinner className="w-8" />
      </CenteredDiv>
    );

  return (
    <DoorManCard>
      <div className="flex flex-col">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-amber-50 text-sm font-medium"
            >
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              placeholder="m@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="text-white bg-gray-600 border-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-white text-sm font-medium"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  signin({ email, password });
                }
              }}
              className="text-white bg-gray-600 border-gray-500"
            />
          </div>
        </div>

        <div className="mt-4">
          <Button
            onClick={() => navigate({ to: '/password/forgot' })}
            className="text-white hover:text-gray-300 underline text-sm"
          >
            Forgot Password?
          </Button>
        </div>

        <div className="mt-6 space-y-3">
          <Button
            variant={'outline'}
            type="submit"
            onClick={() => signin({ email, password })}
            className="w-full text-white cursor-pointer"
          >
            Login
          </Button>

          <div className="flex items-center justify-center gap-1 text-sm text-amber-50">
            Don&apos;t have an account?{' '}
            <Button
              type="button"
              variant="link"
              onClick={(e) => {
                e.stopPropagation();
                navigate({ to: '/signup' });
              }}
              className="cursor-pointer h-auto p-0 text-white hover:text-gray-300"
            >
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </DoorManCard>
  );
}
