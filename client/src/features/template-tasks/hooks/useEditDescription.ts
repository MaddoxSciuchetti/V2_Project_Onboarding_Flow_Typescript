import { useSidebar } from '@/components/ui/sidebar';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { templateMutations } from '../query-options/mutations/template.mutations';

function useEditDescription() {
  const [modal, setModal] = useState(false);
  const { toggleSidebar } = useSidebar();
  const [modalState, setModalState] = useState<{
    selectedItem: {
      form_field_id: number | null | undefined;
      description: string | null | undefined;
      owner: string | null | undefined;
    } | null;
  }>({
    selectedItem: null,
  });

  const toggleModal = () => {
    setModal((prev) => !prev);
    toggleSidebar();
  };

  async function openDescriptionModal(
    description?: string | null,
    owner?: string,
    form_field_id?: number
  ) {
    toggleModal();
    setModalState({
      selectedItem: {
        form_field_id,
        description,
        owner,
      },
    });
  }

  const { mutate: editDescriptionMutation } = useMutation(
    templateMutations.update()
  );

  // onError: () => {
  //   toast.error('Fehler beim Bearbeiten');
  // },
  // setModalState({ selectedItem: null });
  // toggleModal();

  return {
    modal,
    setModal,
    openDescriptionModal,
    editDescriptionMutation,
    modalState,
    toggleModal,
  };
}

export default useEditDescription;
