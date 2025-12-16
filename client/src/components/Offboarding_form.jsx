import "./on_form.css"
import "react";
import {useState, useEffect} from "react";
import Form from "./form";
import { API_URL } from "../api.js";


function Offboarding_form () {
    async function sendFormData(formData) {
        await fetch(`${API_URL}/offboarding/offboarding/editoffboarding`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then((response) => response.json())
        .then((response) => console.log(response))
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        let formData = new FormData(form)
        const data = {};
        for(let keyValue of formData.entries()) {
            data[keyValue[0]] = keyValue(1);
        }
        const url = window.location.href

        const str = url.split("/");
        const new_str = str[str.length -1];
        data.username = new_str

        console.log(data);
        await sendFormData(data)
    }

    const [formattedData, setFormDattedData] = useState([])

    const url = window.location.pathname.split("/").pop()
    console.log(url)

    useEffect(() => {
        const dataFetch = async () => {
            const data = await (
                await fetch(`${API_URL}/offboarding/offboarding/user/${url}`)).json()
                console.log(data)

                const schema = [{
                    description: "",
                    input: {
                        status: "", 
                        edit: ""
                    }
                }]

                const formattedData = data.map((input, i ) => {
                    return {
                        description: descriptions [i],
                        input: {
                            id: input.id,
                            status: input["status"],
                            edit: input["edit"]
                        }
                    }
                })

                console.log("unformatted data", data)
                console.log("formatted data", formattedData)

                setFormDattedData(formattedData)
        };
        dataFetch()
    }, [])

    return (
        <>

          <div className="modal-container">
            <div className="main-form">
                <div className="form-group">
                    {formattedData && formattedData.map((values, index) => (
                        <Form
                          key={index}
                          id_original={values.input.id}
                          editcomment={values.input["edit"]}
                          select_option={values.input["status"]}
                          description={values["description"]}
                          handleSubmit={handleSubmit}
                        />
                    ))}
                </div>
            </div>
          </div>
        </>
    )
}

export default Offboarding_form;