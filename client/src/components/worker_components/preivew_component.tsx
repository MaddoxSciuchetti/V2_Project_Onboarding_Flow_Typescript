import { useBodyScrollLock } from "@/hooks/use-no-scroll";
import { Button } from "../ui/button";
import { Text } from "../ui/maddox_customs/maddox_text";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

type PreviewCompoent = {
  onClose: () => void;
  id: number;
  description: string;
  editcomment: string;
  select_option: string;
  form_field_id: number;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

function PreviewComponent({
  onClose,
  id,
  description,
  editcomment,
  select_option,
  form_field_id,
  handleSubmit,
}: PreviewCompoent) {
  const { lockScroll, unlockScroll } = useBodyScrollLock();
  const [selectedValue, setSelectedValue] = useState(select_option);
  useEffect(() => {
    lockScroll();

    return () => {
      unlockScroll();
    };
  }, [lockScroll, unlockScroll]);

  return (
    <>
      <div
        onClick={onClose}
        className="h-screen inset-0 fixed z-40 bg-black/60"
      ></div>

      <form
        className="flex flex-col outline"
        onSubmit={handleSubmit}
        name="valuesform"
      >
        <div className="absolute text-center items-center z-50 bg-gray-200 rounded-xl top-[20%] left-[50%] h-1/5 w-2xl -translate-x-1/2 -translate-y-1/2">
          <input type="hidden" id="id" name="id" value={id} />
          <input
            type="hidden"
            id="form_field_id"
            name="form_field_id"
            value={form_field_id}
          />
          <p>{description}</p>
          <Textarea
            defaultValue={editcomment}
            id="editcomment"
            name="editcomment"
          />

          <input type="hidden" name="select_option" value={selectedValue} />

          <Select value={selectedValue} onValueChange={setSelectedValue}>
            <SelectTrigger
              id="status"
              name="select_option"
              value={select_option}
              className="w-full max-w-48"
            >
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="bg-amber-50">
                <SelectItem id="select1" value="offen">
                  Offen
                </SelectItem>
                <SelectItem id="select2" value="in_bearbeitung">
                  In Bearbeitung
                </SelectItem>
                <SelectItem id="select3" value="erledgit">
                  Erledigt
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button type="submit">Speichern</Button>
        </div>
      </form>
    </>
  );
}

export default PreviewComponent;
