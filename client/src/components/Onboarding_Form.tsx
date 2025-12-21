import "./on_form.css"
import "react";
import { useState, useEffect } from "react";
import {Form} from "./form";
import { API_URL } from "../api";
import { useParams } from "react-router-dom";
import {Data, FormattedData, Mappingform} from "./Task"




function Onboarding_form() {

    
    async function sendFormData (formData: any) {

        await fetch(`${API_URL}/onboarding/editdata`, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(formData)
        })
        .then((response) => response.json())
        .then((response) => console.log(response))
    }

    async function handleSubmit(event: React.ChangeEvent<HTMLInputElement>) {
        // Erster Versuch der nicht geklappt hat bei vanilla js klappt der
        // event.preventDefault();

        // const form = event.target
        // const name = form.name.target;
        // let formData = new FormData()
        // formData.append("name", name)
        // document.getElementById("id").value=""
        // await sendFormData(formData)

        event.preventDefault();
        const form: any = event.target;
        let formData = new FormData(form)
        const data = {};
        for (let keyValue of formData.entries()) {
            data[keyValue[0]] = keyValue[1];
        }
        console.log(data)
        const url = window.location.href
       
        const str = url.split("/");
        const new_str = str[str.length -1];
        // data.username = new_str


        console.log("formdata incoming", data);

        await sendFormData(data)

    }
    // const [data, setData] = useState([])
    const [formattedData, setFormattedData] = useState<Data[]>([])
    
    const url = window.location.pathname.split("/").pop()
    // console.log(url)


    // const descriptions = [
    //     "Arbeitsvertrag unterschrieben zurück + Dokumente BSB", 
    //     "Personalfragebogen inkl. notw. Dokumente erhalten", 
    //     "Arbeitsmaterialien bereitgestellt (Bestellung Werkzeug)",
    //     "Arbeitsplatz eingerichtet",
    //     "Software-Zugänge (Engine, Office365) Mailadresse",
    //     "Computer eingerichtet",
    //     "Handy + Tablet", 
    //     "Schlüssel",
    //     "Werkzeug QR-Codes registrieren",
    //     "Auto",
    //     "Arbeitskleidung",
    //     "Visitenkarten",
    //     "Willkommensmail an das Team",
    //     "Einarbeitungsplan erstellt",
    //     "BSB Fibel",
    //     "Mail mit Kununu-Link versendet",
    //     "Easy Park einrichten",
    // ]

    useEffect(() => {
        const dataFetch = async() => {
            const data = await (
                await fetch(`${API_URL}/onboarding/user/`+url)
            ).json()

            // 17 values wurde von Glenn erstellt
            // Sehr wichtig Daten Formatt/Formattierung zwischen frontend und backend
            const schema = [{
                description: "",
                input: {
                    status: "",
                    edit: ""
                }
            }]
            
            const formattedData = data.map((input: FormattedData, i: number) => {
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
            console.log("formattedData:", formattedData)


            // const schema = [{
            //     description: "",
            //     input: {
            //         status: "",
            //         note: ""
            //     }
            // }]
            
            // const formattedData = data.map((input, i) => {
            //     return {
            //         description: i <= 2 ? descriptions[i] : "placeholder",
            //         input: {
            //             status: input.status,
            //             note: input.edit
            //         }
            //     }
            // })


            // console.log("formattedData:", formattedData)


            // setData(data)


            setFormattedData(formattedData)
            
            
        };
        dataFetch()
    }, [])

    return( 

        <>
            <div className="modal-container">
                <div className="main-form">
                    <div className="form-group">
                        {formattedData && formattedData.map((values: any, index: number) => (
                            <Form
                            key={index}
                            id_original={values.input.id}
                            editcomment={values.input["edit"]}
                            select_option = {values.input["status"]}
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

export default Onboarding_form;