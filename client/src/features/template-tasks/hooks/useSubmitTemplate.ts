import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { templateMutations } from '../query-options/mutations/template.mutations';

export function useSubmitTemplate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ search: string }>({
    resolver: zodResolver(z.object({ search: z.string().min(1) })),
  });

  const { mutate: searchTemplates } = useMutation(templateMutations.create());

  const onSubmit = handleSubmit((data) => {
    console.log(data.search);
  });

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
}
