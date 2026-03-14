type PasswordValidationBarProps = {
  password?: string;
  minLength?: number;
};

function PasswordValidationBar({
  password = '',
  minLength = 6,
}: PasswordValidationBarProps) {
  const hasMinLength = password.length >= minLength;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);

  const fulfilledRules = [
    hasMinLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecial,
  ].filter(Boolean).length;

  // Milestone-based progress: 0%, 20%, 40%, 60%, 80%, 100%
  const progressPercent = (fulfilledRules / 5) * 100;

  const getStrength = () => {
    if (password.length === 0) {
      return {
        width: '0%',
        barClass: 'bg-(--muted)',
      };
    }

    if (fulfilledRules <= 2) {
      return {
        width: `${progressPercent}%`,
        barClass: 'bg-(--destructive)',
      };
    }

    if (fulfilledRules < 5) {
      return {
        width: `${progressPercent}%`,
        barClass: 'bg-orange-500',
      };
    }

    return {
      width: '100%',
      barClass: 'bg-green-600',
    };
  };

  const strength = getStrength();

  return (
    <div className="mt-2 w-full">
      <p className="mb-1 text-left text-xs text-muted-foreground">
        Mind. 6 Zeichen, 1 Grossbuchstabe, 1 Kleinbuchstabe, 1 Zahl, 1
        Sonderzeichen (!@#$%^&*).
      </p>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-(--muted)">
        <div
          className={`h-full rounded-full transition-all duration-200 ${strength.barClass}`}
          style={{ width: strength.width }}
        />
      </div>
    </div>
  );
}

export default PasswordValidationBar;
