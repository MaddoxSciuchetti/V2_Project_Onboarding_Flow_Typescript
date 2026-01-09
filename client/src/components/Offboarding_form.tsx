import { useQuery } from "@tanstack/react-query";
import React from "react";
import z from "zod";
import { API_URL } from "../api";
import Form from "./form";
import "./on_form.css";
import { Date1, FormattedData, Mappingform } from "./Task";

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

      const result = formSchema.safeParse(formValues);

      if (!result.success) {
        console.log("validation errors", result.error);
        return;
      }
      await sendFormData(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  const url = window.location.pathname.split("/").pop();

  async function fetchFormattedData(url: string): Promise<Date1[]> {
    const data = await (
      await fetch(`${API_URL}/offboarding/user/${url}`)
    ).json();

    return data.map((input: FormattedData, i: number) => ({
      index: i,
      description: input.description,
      input: {
        id: input.employee_form_id,
        form_field_id: input.form_field_id,
        status: input.status,
        edit: input.edit,
      },
    }));
  }
  const queryResult = useQuery<Date1[], Error>({
    queryKey: ["offboarding", url],
    queryFn: () => fetchFormattedData(url),
  });
  const { data, error, isLoading } = queryResult;

  if (error) {
    return <div>This is a error {error.message}</div>;
  }
  if (isLoading) {
    return <div>Still loading</div>;
  }

  return (
    <>
      <div className="modal-container">
        <div className="main-form">
          <div className="form-group">
            {data?.map((values: Date1, index: number) => (
              <Form
                key={index}
                id_original={values.input.id}
                editcomment={values.input.edit}
                select_option={values.input.status}
                description={values.description}
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
