import ModalOverlay from '@/components/modal/ModalOverlay';
import SmallWrapper from '@/components/modal/modalSizes/SmallWrapper';
import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';
import { useState } from 'react';

type TemplateDeleteConfirmTriggerProps = {
  onConfirm: () => void;
};

function TemplateDeleteConfirmTrigger({
  onConfirm,
}: TemplateDeleteConfirmTriggerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    onConfirm();
    closeModal();
  };

  return (
    <>
      <Button
        type="button"
        size="icon-sm"
        variant="ghost"
        className="cursor-pointer rounded-md text-muted-foreground hover:text-(--destructive)"
        onClick={(event) => {
          event.stopPropagation();
          setIsModalOpen(true);
        }}
        aria-label="Vorlage-Aufgabe löschen"
      >
        <TrashIcon className="h-4 w-4" />
      </Button>

      {isModalOpen && (
        <ModalOverlay handleToggle={closeModal}>
          <SmallWrapper className="h-auto min-h-0 max-h-none w-full max-w-sm p-5">
            <div className="flex w-full flex-col gap-4 text-left">
              <p className="text-sm font-semibold text-foreground">
                Bist du sicher?
              </p>
              <p className="text-xs text-muted-foreground">
                Diese Vorlage-Aufgabe wird dauerhaft gelöscht.
              </p>
              <div className="flex items-center justify-center gap-2">
                <Button type="button" variant="outline" onClick={closeModal}>
                  Abbrechen
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  className="bg-(--destructive) text-(--destructive-foreground) hover:bg-(--destructive)"
                  onClick={confirmDelete}
                >
                  Ja, löschen
                </Button>
              </div>
            </div>
          </SmallWrapper>
        </ModalOverlay>
      )}
    </>
  );
}

export default TemplateDeleteConfirmTrigger;
