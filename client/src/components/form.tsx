import { FormEventHandler } from "react";
import "./on_form.css";
import "react";

interface FormProps {
  form_field_id: number;
  editcomment: string;
  select_option: string;
  id_original: number;
  description: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<FormProps> = ({
  form_field_id,
  editcomment,
  select_option,
  id_original,
  description,
  handleSubmit,
}) => {
  return (
    <>
      <form className="entire_form" onSubmit={handleSubmit} name="valuesform">
        <input type="hidden" id="id" name="id" value={id_original} />
        <input
          type="hidden"
          id="form_field_id"
          name="form_field_id"
          value={form_field_id}
        />
        <div className="field">
          <p>{description}</p>

          <div className="field_sub">
            <select
              className="field-text"
              id="status"
              name="select_option"
              defaultValue={select_option}
            >
              <option id="select1" value="offen">
                Offen
              </option>
              <option id="select2" value="in-bearbeitung">
                In Bearbeitung
              </option>
              <option id="select3" value="erledigt">
                Erledigt
              </option>
            </select>
          </div>
          <div className="field_sub">
            <button className="submit-form" type="submit">
              Speichern
            </button>
            {/* insert css to style */}
          </div>
        </div>

        <div className="field-text">
          <textarea
            placeholder="schreibe deine Notiz"
            id="edit"
            name="editcomment"
            defaultValue={editcomment}
          ></textarea>
        </div>
      </form>
    </>
  );
};

export default Form;
