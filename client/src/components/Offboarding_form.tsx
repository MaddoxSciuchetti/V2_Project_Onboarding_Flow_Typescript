import "on_form.css"
import "react";
import {useState, useEffect} from "react";
import {Form} from "./form";
import { API_URL } from "../api";


function Offboarding_form () {

    async function sendFormData(formData) {
        await fetch(`${API_URL}/offboarding/editdata`, {
            method:"PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(formData)
        })
        .then((response) => response.json())
        .then((response) => console.log(response))
    }

    async function handleSubmit(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        const form: any = event.target;
        let formData = new FormData(form)
        const data = {};
        for(let keyValue of formData.entries()) {
            data[keyValue[0]] = keyValue[1];
        }
        const url = window.location.href

        const str = url.split("/");
        const new_str = str[str.length -1];
        // data.username = new_str

        console.log("formdata incoming", data);

        await sendFormData(data)
    }

    const [data, setData] = useState([])
    const [formattedData, setFormattedData] = useState([])

    // const descriptions = [
    //     "Rückgabe Computer",
    //     "Rückgabe PKW",
    //     "Rückgabe Handy",
    //     "Rückgabe Schlüssel",
    //     "Rückgabe Werkzeug (wenn unvollständig, was fehlt?)",
    //     "Rückgabe Arbeitskleidung", 
    //     "Abwesenheitsassistent Mail eingerichtet",
    //     "Weiterleitung Mail eingerichtet",
    //     "Löschung privater Mails durch Mitarbeiter",
    //     "Zugänge gesperrt",
    //     "Offboarding-Gespräch terminiert",
    //     "Offboarding-Gespräch durchgeführt", 
    //     "Infomail ans Team versendet", 
    //     "Arbeitszeugnis erstellt & verschickt",
    // ]


    const url = window.location.pathname.split("/").pop()
    // console.log(url)

    useEffect(() => {
        const dataFetch = async () => {
            const data = await (
                await fetch(`${API_URL}/offboarding/user/`+ url)
            ).json()



            const schema = [{
                description: "",
                input: {
                    status: "",
                    edit: ""
                }
            }]

            const formattedData = data.map((input: any, i: number) => {
                return {
                    index: i,
                    description: input.description,
                    input: {
                        id: input.employee_form_id,
                        form_field_id: input.form_field_id,
                        status: input.status,
                        edit: input.edit
                    }
                }
            })

            console.log("unformatted data", data)
            console.log("formatted data", formattedData)

            setFormattedData(formattedData)

        };
        dataFetch()
    }, [])

    return (
        <>

        {/* improve the styling */}
            <div className="modal-container">
                <div className="main-form">
                    <div className="form-group">
                        {formattedData && formattedData.map((values: any, index: number) => (
                            <Form 
                            key={index}
                            id_original={values.input.id}
                            editcomment={values.input["edit"]}
                            select_option={values.input["status"]}
                            description = {values["description"]}
                            form_field_id = {values.input.form_field_id}
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