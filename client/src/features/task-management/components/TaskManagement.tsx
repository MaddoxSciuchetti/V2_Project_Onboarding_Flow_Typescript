import React, { useState } from 'react';
import Form from '@/components/worker_components/worker_form_data';
import PreviewComponent from '@/components/worker_components/preivew_component';
import useAuth from '@/hooks/use-Auth';
import { Button } from '@/components/ui/button';
import Worker_Backround from '@/components/backround_worker';
import { Input } from '@/components/ui/input';
import { useToggleModal } from '@/hooks/use-toggleModal';
import { Spinner } from '@/components/ui/spinner';
import { form_field } from '../types/index.type';
import useTaskData from '../hooks/use-fetchTasks';
import useFilteredData from '../hooks/use-filteredData';
import useEditModal from '../hooks/use-editModal';
import useTaskSubmit from '../hooks/use-taskSubmit';

type OffboardingFormProps = {
  id: number;
  search: { param1: string }; // match validateSearch
};

const TaskManagement: React.FC<OffboardingFormProps> = ({ id, search }) => {
  const { user } = useAuth();
  const [activetab, setActiveTab] = useState<string>('form');
  const { toggleModal } = useToggleModal();
  const numericId = parseInt(String(id));

  const { data, isLoading } = useTaskData(numericId, search);
  const {
    descriptionSearch,
    setDescriptionSearch,
    showMyItems,
    handleMeFilter,
    displayData,
  } = useFilteredData(data);

  const { modalState, openEditModal, closeModal, setModalState } =
    useEditModal(toggleModal);

  const { handleSubmit } = useTaskSubmit(numericId, user, closeModal);

  if (isLoading) return <Spinner />;
  if (!data) return <div>Daten Laden</div>;

  return (
    <>
      <div className="flex flex-col w-full h-150 rounded-2xl mx-auto  shadow-gray-200 shadow-lg overflow-auto p-6 md:max-w-8xl md:h-300">
        <div className=" flex justify gap-5">
          <Input
            value={descriptionSearch}
            onChange={(e) => setDescriptionSearch(e.target.value)}
            placeholder="Search"
          />
          <Button
            variant={'outline'}
            className={
              activetab === 'form' ? 'active bg-gray-200 cursor-pointer' : ''
            }
            onClick={() => setActiveTab('form')}
          >
            Aufgaben
          </Button>
          <Button
            variant={'outline'}
            className={
              activetab === 'files' ? 'active bg-gray-200 cursor-pointer' : ''
            }
            onClick={() => setActiveTab('files')}
          >
            Dateien
          </Button>
        </div>
        <div>
          {activetab === 'files' && <Worker_Backround id={id} />}
          {activetab === 'form' && (
            <div className="">
              {modalState.selectedItem && (
                <div className="fixed inset-0 z-50 flex">
                  <div
                    onClick={closeModal}
                    className="fixed inset-0 bg-black/50 cursor-pointer"
                    aria-label="Close modal"
                  />
                  <PreviewComponent
                    id={modalState.selectedItem.id}
                    description={modalState.selectedItem.description}
                    editcomment={modalState.selectedItem.editcomment}
                    select_option={modalState.selectedItem.select_option}
                    form_field_id={modalState.selectedItem.form_field_id}
                    handleSubmit={handleSubmit}
                  />
                </div>
              )}

              <div>
                <span>
                  <p
                    onClick={() => handleMeFilter()}
                    className={
                      showMyItems
                        ? 'active cursor-pointer rounded-2xl bg-gray-100 w-40 text-sm mt-5 text-center px-2 py-1'
                        : 'cursor-pointer rounded-2xl bg-blue-100 w-40 text-sm mt-5 text-center px-2 py-1'
                    }
                  >
                    {showMyItems ? 'Alle Aufgaben' : 'Meine Aufgaben'}
                  </p>
                </span>
              </div>

              {displayData.map((field: form_field, index: number) => (
                <Form
                  key={index}
                  id_original={field.id}
                  editcomment={field.edit}
                  select_option={field.status}
                  description={field.description}
                  officialOwner={field.officialOwner}
                  substituteOwner={field.substituteOwner}
                  owner_id={field.owner_id}
                  is_substitute={field.is_substitute}
                  form_field_id={data.form.id}
                  onEdit={(
                    id,
                    description,
                    editcomment,
                    select_option,
                    form_field
                  ) =>
                    openEditModal(
                      id,
                      description,
                      editcomment,
                      select_option,
                      form_field
                    )
                  }
                  handleSubmit={handleSubmit}
                  // historyResult={historyResult}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TaskManagement;
