import "./on_form.css";
import "react";
import { useState, useEffect, ChangeEvent } from "react";
import Form from "./form";
import { API_URL } from "../api";
import { Data, FormattedData, Mappingform } from "./Task";
import z from "zod";

type APIResponse = SuccessResponse | ErrorResponse;

type SuccessResponse = {
  success: true;
  affectedRows: number;
};

type ErrorResponse = {
  success: false;
  error: string;
};

const formSchema = z.object({
  editcomment: z.string(),
  form_field_id: z.string(),
  id: z.string(),
  select_option: z.string(),
});

const Offboarding_form: React.FC = () => {
  async function sendFormData(formData: Mappingform): Promise<APIResponse> {
    const url = `${API_URL}/offboarding/editdata`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response);

      if (!response.ok) {
        return { success: false, error: `HTTP ${response.status}` };
      }
      const result = await response.json();
      return { success: true, affectedRows: result.affectedRows };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "unkown error",
      };
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const formValues = Object.fromEntries(formData);
      console.log(formValues);
      console.log("formvalues", formValues);

      const result = formSchema.parse(formValues);
      console.log("zod result", result);
      await sendFormData(result);
    } catch (error) {
      console.log(error);
    }
  }

  const [formattedData, setFormattedData] = useState<Data[]>([]);

  const url = window.location.pathname.split("/").pop();
  // console.log(url)

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(`${API_URL}/offboarding/user/` + url)
      ).json();

      const schema = [
        {
          description: "",
          input: {
            status: "",
            edit: "",
          },
        },
      ];

      const formattedData = data.map((input: FormattedData, i: number) => {
        return {
          index: i,
          description: input.description,
          input: {
            id: input.employee_form_id,
            form_field_id: input.form_field_id,
            status: input.status,
            edit: input.edit,
          },
        };
      });

      console.log("unformatted data", data);
      console.log("formatted data", formattedData);

      setFormattedData(formattedData);
    };
    dataFetch();
  }, []);

  return (
    <>
      {/* improve the styling */}
      <div className="modal-container">
        <div className="main-form">
          <div className="form-group">
            {formattedData &&
              formattedData.map((values: Data, index: number) => (
                <Form
                  key={index}
                  id_original={values.input.id}
                  editcomment={values.input["edit"]}
                  select_option={values.input["status"]}
                  description={values["description"]}
                  form_field_id={values.input.form_field_id}
                  handleSubmit={handleSubmit}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Offboarding_form;
