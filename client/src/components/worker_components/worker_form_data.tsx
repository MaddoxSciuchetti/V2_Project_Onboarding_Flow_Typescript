import "react";
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

interface FormProps {
  id_original: number;
  description: string;
  editcomment: string;
  select_option: string;
  form_field_id: number;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onEdit: (
    id: number,
    description: string,
    editcomment: string,
    select_option: string,
    form_field_id: number,
  ) => void;
}

const Form: React.FC<FormProps> = ({
  id_original,
  description,
  editcomment,
  select_option,
  form_field_id,
  handleSubmit,
  onEdit,
}) => {
  const [selectedValue, setSelectedValue] = useState(select_option || "");
  return (
    <>
      <div className="flex justify-center items-center w-max bg-amber-50 outline">
        <form
          className="flex flex-col  outline w-md items-center"
          onSubmit={handleSubmit}
          name="valuesform"
        >
          <input type="hidden" id="id" name="id" value={id_original} />
          <input
            type="hidden"
            id="form_field_id"
            name="form_field_id"
            value={form_field_id}
          />
          <div className="field">
            <p>{description}</p>

            <input type="hidden" name="select_option" value={selectedValue} />
            <Select
              value={selectedValue}
              onValueChange={setSelectedValue}
              disabled
            >
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
            <div className="field_sub">{/* insert css to style */}</div>
          </div>

          <div className="field-text">
            <textarea
              className="outline "
              placeholder="schreibe deine Notiz"
              id="edit"
              name="editcomment"
              defaultValue={editcomment}
              readOnly
            ></textarea>
            <img
              className="w-5"
              src="/assets/Edit Outline Icon.png"
              alt="text"
              onClick={() =>
                onEdit(
                  id_original,
                  description,
                  editcomment,
                  select_option,
                  form_field_id,
                )
              }
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
