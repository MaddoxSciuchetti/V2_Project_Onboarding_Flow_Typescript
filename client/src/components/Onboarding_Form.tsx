import "react";
import { useState, useEffect } from "react";
import Form from "./form";
import { API_URL } from "../api";
import { Data, FormattedData, Mappingform } from "./Task";

// delete this code

function Onboarding_form() {
  async function sendFormData(formData: Mappingform) {
    const data = await fetch(`${API_URL}/onboarding/editdata`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const response = await data.json();
    return response;
  }

  async function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    const form: HTMLFormElement = event.target;

    let formData = new FormData(form);
    const data = {} as Mappingform;
    for (let keyValue of formData.entries()) {
      data[keyValue[0]] = keyValue[1];
    }
    console.log(data);
    const url = window.location.href;

    const str = url.split("/");
    const new_str = str[str.length - 1];
    // data.username = new_str

    console.log("formdata incoming", data);

    await sendFormData(data);
  }
  const [formattedData, setFormattedData] = useState<Data[]>([]);

  const url = window.location.pathname.split("/").pop();

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(`${API_URL}/onboarding/user/` + url)
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
      console.log("formattedData:", formattedData);
      setFormattedData(formattedData);
    };
    dataFetch();
  }, []);

  return (
    <>
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
}

export default Onboarding_form;
