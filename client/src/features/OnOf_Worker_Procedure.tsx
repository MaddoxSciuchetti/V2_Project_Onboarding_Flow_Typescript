import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import z from "zod";
import { API_URL } from "../api";
import Form from "@/components/worker_components/worker_form_data";
import { Mappingform } from "../schemas/Task";

import { APIResponse } from "../types/api_response";
import PreviewComponent from "@/components/worker_components/preivew_component";

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

type OffboardingFormProps = {
  id: string;
  search: { param1: string }; // match validateSearch
};

const OnOf_Worker_Procedure: React.FC<OffboardingFormProps> = ({
  id,
  search,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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

      // implement function get userid from cookies than the name -> show next to form

      if (!result.success) {
        console.log("validation errors", result.error);
        return;
      }
      await sendFormData(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchFormattedData(): Promise<api_Response> {
    const res = await fetch(
      `${API_URL}/offboarding/user/${id}?param1=${search.param1}`,
    );
    if (!res.ok) {
      throw new Error("response not ok");
    }
    const json = await res.json();
    console.log(json);
    return json;
  }
  const { data, error, isLoading } = useQuery<api_Response, Error>({
    queryKey: ["somethingelse", id],
    queryFn: () => fetchFormattedData(),
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
      {/* insert new components */}

      <PreviewComponent onEditClick={() => setIsOpen(true)} />

      {isOpen &&
        data?.form.fields.map((field: any, index: number) => (
          <Form
            key={index}
            id_original={field.id}
            editcomment={field.edit}
            select_option={field.status}
            description={field.description}
            form_field_id={data.form.id}
            isOpen={isOpen}
            handleSubmit={handleSubmit}
          />
        ))}
    </>
  );
};

export default OnOf_Worker_Procedure;
