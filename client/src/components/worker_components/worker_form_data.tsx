import "react";

interface FormProps {
  form_field_id: number;
  editcomment: string;
  select_option: string;
  id_original: number;
  description: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  getDescription: (key: number, val: string) => unknown;
}

const Form: React.FC<FormProps> = ({
  form_field_id,
  editcomment,
  select_option,
  id_original,
  description,
  handleSubmit,
  getDescription,
}) => {
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

            <div className="field_sub">
              <select
                className="field-text"
                id="status"
                name="select_option"
                defaultValue={select_option}
                disabled
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
            <button onClick={() => getDescription(id_original, description)}>
              Edit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
