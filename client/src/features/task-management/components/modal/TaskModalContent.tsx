import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useBodyScrollLock } from '@/hooks/use-no-scroll';
import { SubmitEvent, useEffect, useState } from 'react';
import { Button } from '../../../../components/ui/button';
import SelectOwner from './SelectOwner';

type PreviewCompoent = {
  id: number;
  description: string;
  editcomment: string;
  select_option: string;
  form_field_id: number;
  handleSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
};

function ModalContent({
  id,
  description,
  editcomment,
  select_option,
  form_field_id,
  handleSubmit,
}: PreviewCompoent) {
  const { lockScroll, unlockScroll } = useBodyScrollLock();
  const [selectedValue, setSelectedValue] = useState(select_option || '');

  useEffect(() => {
    lockScroll();

    return () => {
      unlockScroll();
    };
  }, [lockScroll, unlockScroll]);

  const InputConfig = [
    {
      type: 'hidden',
      name: 'id',
      value: id,
    },
    {
      type: 'hidden',
      name: 'form_field_id',
      value: form_field_id,
    },
    {
      type: 'hidden',
      name: 'date',
      value: new Date().toLocaleDateString(),
    },
    {
      type: 'hidden',
      name: 'select_option',
      value: selectedValue,
    },
  ];

  return (
    <>
      <div className="max-h-min mt-40 mx-auto text-center items-center z-50 bg-gray-200 rounded-xl w-2xl">
        <div className="flex items-center gap-10 justify-center mb-6 m-10 ">
          <form
            className="flex flex-col gap-5  w-full"
            onSubmit={handleSubmit}
            name="valuesform"
          >
            {InputConfig.map((value, index) => (
              <Input
                key={value.name}
                type={value.type}
                name={value.name}
                value={value.value}
              />
            ))}
            {/* <Input type="hidden" id="id" name="id" value={id} />
            <Input
              type="hidden"
              id="form_field_id"
              name="form_field_id"
              value={form_field_id}
            /> */}
            <p className="text-left underline">{description}</p>
            <Textarea
              defaultValue={editcomment}
              id="editcomment"
              name="editcomment"
              className="w-xl rounded-xl"
            />
            {/* <Input
              type="hidden"
              id="date"
              name="date"
              value={new Date().toLocaleDateString()}
            />

            <Input type="hidden" name="select_option" value={selectedValue} /> */}

            <div className="flex flex-row gap-2">
              <SelectOwner
                setSelectedValue={setSelectedValue}
                selectedValue={selectedValue}
                select_option={select_option}
              />
              <Button
                className="w-71 cursor-pointer hover:bg-gray-300 rounded-xl"
                variant={'outline'}
                type="submit"
              >
                Speichern
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalContent;
