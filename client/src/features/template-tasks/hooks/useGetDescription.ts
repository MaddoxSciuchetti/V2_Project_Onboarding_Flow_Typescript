import { useSidebar } from '@/components/ui/sidebar';
import { NewDescriptionField } from '@/types/api.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { createTemplateTask } from '../api';
import { DESCRIPTION_ROOT } from '../consts/query-key.consts';
import useEditDescription from './useEditDescription';

function useGetDescription() {
  const queryClient = useQueryClient();
  const [mode, setMode] = useState<'EDIT' | 'ADD'>();
  const [tab, setTab] = useState<'ONBOARDING' | 'OFFBOARDING'>('ONBOARDING');
  const { toggleSidebar } = useSidebar();
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal((prev) => !prev);
    toggleSidebar();
  };

  const { openDescriptionModal, editDescriptionMutation, modalState } =
    useEditDescription(toggleModal);

  const { mutate: handleAddSubmitMutation } = useMutation<
    NewDescriptionField,
    Error,
    {
      description: string;
      template_type: 'ONBOARDING' | 'OFFBOARDING';
      owner: string;
    }
  >({
    mutationFn: createTemplateTask,
    onSuccess: () => {
      toast.success('the field has been added');
      queryClient.invalidateQueries({ queryKey: [DESCRIPTION_ROOT] });
      toggleModal();
    },
    onError: () => {
      toast.error('the field could not be added');
    },
  });

  return {
    editDescriptionMutation,
    handleAddSubmitMutation,
    mode,
    setMode,
    modal,
    modalState,
    openDescriptionModal,
    tab,
    setTab,
    toggleModal,
  };
}

export default useGetDescription;
