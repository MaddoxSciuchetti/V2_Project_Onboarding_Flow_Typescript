import { useQuery } from "@tanstack/react-query";
import React from "react";
import z from "zod";
import { API_URL } from "../api";
import Form from "./form";
import { Mappingform } from "./Task";

type APIResponse = SuccessResponse | ErrorResponse;

type SuccessResponse = {
  success: true;
  affectedRows: number;
};

type ErrorResponse = {
  success: false;
  error: string;
};

type form_field = {
  id: number;
  form_field_id: number;
  description: string;
  status: string | null;
  edit: string | null;
};

type api_Response = {
  user: {
    id: number;
    name: string;
  };
  form: {
    id: number;
    type: string;
    fields: form_field[];
  };
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
      console.log(result);

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

  async function fetchFormattedData(url: string): Promise<any> {
    const res = await fetch(`${API_URL}/offboarding/user/${url}`);
    if (!res.ok) {
      throw new Error("response not ok");
    }
    const json = await res.json();
    console.log(json);
    return json;
  }
  const { data, error, isLoading } = useQuery<api_Response, Error>({
    queryKey: ["offboarding", url],
    queryFn: () => fetchFormattedData(url),
  });
  console.log(data);

  if (error) {
    // component
    return <div>This is a error {error.message}</div>;
  }
  if (isLoading) {
    // component
    return <div>Still loading</div>;
  }

  return (
    <>
      <div className="modal-container">
        <div className="main-form">
          <div className="form-group">
            {data?.form.fields.map((field: any, index: any) => (
              <Form
                key={index}
                id_original={field.id}
                editcomment={field.edit}
                select_option={field.status}
                description={field.description}
                form_field_id={data.form.id}
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
