import * as React from 'react';

import { cn } from '@/lib/trycatch';

export type SelfmadeInputProps = React.ComponentProps<'input'> & {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  wrapperClassName?: string;
};

const Input = React.forwardRef<HTMLInputElement, SelfmadeInputProps>(
  (
    {
      className,
      wrapperClassName,
      startIcon,
      endIcon,
      type = 'text',
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div
        data-slot="input-group"
        className={cn(
          'flex h-8 w-full min-w-0 items-center gap-2 overflow-hidden rounded-md border border-border-default bg-surface-page px-3',
          'transition-[box-shadow,color]',
          'outline-none focus-within:ring-2 focus-within:ring-interactive-focus-ring focus-within:ring-offset-0',
          'has-[[aria-invalid=true]]:border-feedback-danger-border has-[[aria-invalid=true]]:focus-within:ring-destructive/35',
          disabled && 'pointer-events-none opacity-50',
          wrapperClassName
        )}
      >
        {startIcon ? (
          <span
            className="flex size-6 shrink-0 items-center justify-center text-text-secondary [&_svg]:size-6 [&_svg]:shrink-0"
            aria-hidden
          >
            {startIcon}
          </span>
        ) : null}
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          data-slot="input"
          className={cn(
            'min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0',
            'text-body-sm text-text-primary placeholder:text-text-disabled',
            'outline-none focus:ring-0 focus-visible:ring-0',
            'disabled:cursor-not-allowed',
            className
          )}
          {...props}
        />
        {endIcon ? (
          <span
            className="flex size-6 shrink-0 items-center justify-center text-text-secondary [&_svg]:size-6 [&_svg]:shrink-0"
            aria-hidden
          >
            {endIcon}
          </span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
