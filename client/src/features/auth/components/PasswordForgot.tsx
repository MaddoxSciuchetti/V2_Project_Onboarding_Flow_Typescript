import { Link, useNavigate } from '@tanstack/react-router';

export function PasswordForgot() {
  const navigate = useNavigate();
  return (
    <div className="">
      <Link
        to="/password/forgot"
        onClick={() => navigate({ to: '/password/forgot' })}
        className="text-label-xs underline text-sm hover:text-accent-foreground"
      >
        Forgot Password?
      </Link>
    </div>
  );
}
