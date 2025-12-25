import express from "express";
import { pool } from "../db.ts";
import { postData } from "../handlers/onboarding.ts";



const onboarding_router = express.Router()

onboarding_router.post("/postData", postData);



onboarding_router.get("/fetchData", (req, res) => {
    const form_type = 'onboarding'
    try{
        const fetch_query = 'SELECT users.id, users.name, employee_forms.form_type FROM users INNER JOIN employee_forms ON employee_forms.id = users.id WHERE form_type = $1'
        pool.query(fetch_query, [form_type] ,(err, result) => {
            if(err){
                res.send(err)
            } else{
                res.send(result.rows)

            }
        })
    }catch(error) {
        console.log(error)
        res.send('there is currently no data')
    }
})


onboarding_router.get("/user/:id", (req, res) => {
    const id = req.params.id
    console.log(id)

    // const get_form = 'SELECT form_inputs.form_field_id, form_inputs.employee_form_id, form_inputs.status, form_inputs.edit, form_fields.description FROM form_inputs INNER JOIN form_fields ON form_inputs.form_field_id = form_fields.form_field_id WHERE employee_form_id = ($1) ORDER By id'
    // Where will the specific user_id come from? How is it being intialized in the beginning
    const get_user_form_speciifc_test = 'SELECT users.name, employee_forms.user_id, employee_forms.form_type, form_inputs.employee_form_id, form_inputs.form_field_id, form_inputs.status, form_inputs.edit, form_fields.description FROM users INNER JOIN employee_forms ON employee_forms.user_id = users.id INNER JOIN form_inputs ON form_inputs.employee_form_id = employee_forms.id INNER JOIN form_fields ON form_inputs.form_field_id = form_fields.form_field_id WHERE user_id = $1 ORDER BY form_field_id'

    try{
        pool.query(get_user_form_speciifc_test, [id], (err, result) => {
            if(err){
                res.send(err)
            } else{
                res.send(result.rows)
            }
        })
    }catch(error){
        console.log(error)
        res.send('there is currently no data')
    }
})


onboarding_router.put("/editdata", (req, res) => {

    const id = req.body["user_id"]
    const edit = req.body["editcomment"]
    const status = req.body["select-option"]
    const form_field_id = req.body["form_field_id"]
    const employee_form_id = req.body["username"]
    console.log(id)
    console.log(edit)
    console.log(status)
    console.log(form_field_id)  
    console.log(employee_form_id)

    const insert_query = 'UPDATE form_inputs SET edit=$1, status=$2 WHERE form_field_id= $3 AND employee_form_id = $4'
    try {
        pool.query(insert_query, [edit, status, form_field_id,employee_form_id], (err, result) => {
            if(err) {
                res.send(err)
            }else{
                res.send(result.rows)

            }

        })
    }catch(error){
        console.log(error)
        res.send('there is currently no data')
    }

})


onboarding_router.delete("/delete/:id", (req, res) => {
    const id = req.params.id

    const insert_query = 'DELETE FROM users WHERE id = $1'

    try {
        pool.query(insert_query, [id], (err, result) => {
            if(err){
                res.send(err)
            }else {
                res.send(result)
            }
    })
    }catch(error){
        console.log(error)
    }
})

export {onboarding_router};










