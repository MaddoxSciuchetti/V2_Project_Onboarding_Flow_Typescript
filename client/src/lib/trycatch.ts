import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/** Matches @layer components typography in globals.css — must not share tailwind-merge's `text-color` group with `text-label-sm` etc. */
const twMerge = extendTailwindMerge<'design-system-typography'>({
  extend: {
    classGroups: {
      'design-system-typography': [
        'text-display',
        'text-h1',
        'text-h2',
        'text-h3',
        'text-h4',
        'text-h5',
        'text-h6',
        'text-body-xl',
        'text-body-lg',
        'text-body-base',
        'text-body-sm',
        'text-body-xs',
        'text-label-lg',
        'text-label-base',
        'text-label-sm',
        'text-overline',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type SuccessResult<T> = readonly [T, null];

type ErrorResult<E = Error> = readonly [null, E];

type Result<T, E = Error> = SuccessResult<T> | ErrorResult<E>;

export async function tryCatch<T, E = Error>(
  promise: Promise<T>
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return [data, null] as const;
  } catch (error) {
    return [null, error as E] as const;
  }
}

export const threeDaysAgo = new Date();
threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
