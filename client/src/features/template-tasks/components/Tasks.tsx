import { DescriptionResponse } from '@/types/api.types';
import { Edit } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import useDeleteDescription from '../hooks/useDeleteDescription';

type TasksProps = {
  items: DescriptionResponse[];
  openDescriptionModal: (
    description?: string | null,
    owner?: string,
    form_field_id?: number
  ) => Promise<void>;

  mode: 'EDIT' | 'ADD' | undefined;
  setMode: Dispatch<SetStateAction<'EDIT' | 'ADD' | undefined>>;
};

const Tasks = ({ items, openDescriptionModal, setMode }: TasksProps) => {
  const { deleteDescription } = useDeleteDescription();
  return items?.map((item, index) => (
    <div className=" flex flex-row  w-full items-center mt-5" key={index}>
      <div className="flex items-center gap-5">
        <img
          onClick={() => deleteDescription(item.form_field_id)}
          src="/assets/x_delete.svg"
          alt="deleticon"
          className="items-center cursor-pointer "
        />
        <p className="underline w-20">{item.description}</p>
      </div>
      <div className="grow" />
      <div className="flex gap-5 w-70 ">
        <span className="w-40 cursor-pointer rounded-2xl bg-muted py-1 text-center text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground group">
          {item.auth_user.vorname} {item.auth_user.nachname}
        </span>
        <div className="grow" />
        <Edit
          className="cursor-pointer"
          onClick={() => {
            openDescriptionModal(
              item.description,
              item.owner,
              item.form_field_id
            );
            setMode('EDIT');
          }}
        />
      </div>
    </div>
  ));
};

export default Tasks;
