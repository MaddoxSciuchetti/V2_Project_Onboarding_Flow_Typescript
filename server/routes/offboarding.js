import express from "express"
import pool from "../db.js"
const offboarding_router = express.Router()



offboarding_router.post("/postoffboardingdata", async (req, res) => {
    const name = req.body.name
    const offboarding = 'offboarding'
    console.log(name)

    const creating_user = 'WITH ins1 AS (INSERT INTO users(name)VALUES ($1) RETURNING id), ins2 AS(INSERT INTO employee_forms(user_id, form_type)VALUES((SELECT id FROM ins1), $2) RETURNING id) INSERT INTO form_inputs(employee_form_id, form_field_id) VALUES((SELECT id from ins2), (18)), ((SELECT id FROM ins2), (19)), ((SELECT id FROM ins2), (20)), ((SELECT id FROM ins2), (21)), ((SELECT id FROM ins2), (21)), ((SELECT id FROM ins2), (22)), ((SELECT id FROM ins2), (23)), ((SELECT id FROM ins2), (24)), ((SELECT id FROM ins2), (25)), ((SELECT id FROM ins2), (26)), ((SELECT id FROM ins2), (27)), ((SELECT id FROM ins2), (28)), ((SELECT id FROM ins2), (29)), ((SELECT id FROM ins2), (30)), ((SELECT id FROM ins2), (31)) RETURNING employee_form_id;'
    pool.query(creating_user, [name, offboarding], async (err, result) => {
        if(err) {
            console.log(err)
            res.send(err)
        }else {
            console.log(result.rows[0])
            res.json(
                result.rows[0]
            )
        }
    })

})


offboarding_router.get("/fetchData", (req, res) => {
    const form_type = 'offboarding'
    const fetch_query = 'SELECT users.id, users.name, employee_forms.form_type FROM users INNER JOIN employee_forms ON employee_forms.id = users.id WHERE form_type=$1;'
    pool.query(fetch_query, [form_type], (err, result) => {
        if(err){
            res.send(err)
            console.log(err)
        } else{
            res.send(result.rows)
        }
    })
})

offboarding_router.get("/user/:id", (req, res) => {
    const id = req.params.id
    try{
        const get_user_form_speciifc_test = 'SELECT users.name, employee_forms.user_id, employee_forms.form_type, form_inputs.employee_form_id, form_inputs.form_field_id, form_inputs.status, form_inputs.edit, form_fields.description FROM users INNER JOIN employee_forms ON employee_forms.user_id = users.id INNER JOIN form_inputs ON form_inputs.employee_form_id = employee_forms.id INNER JOIN form_fields ON form_inputs.form_field_id = form_fields.form_field_id WHERE user_id = $1 ORDER BY form_field_id'
        pool.query(get_user_form_speciifc_test, [id], (err, result) => {
            if(err){
                console.log(err)
                res.send(err)
            }else {
                console.log(err)
                res.send(result.rows)
            }
        })
    }catch(error){
        console.log(error)
        res.send('there is currently no data')
    }

})

offboarding_router.put("/editdata", (req, res) => {
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

    const insert_query = 'UPDATE form_inputs SET edit = $1, status=$2, WHERE form_field_id = $3 AND employee_form_id = $4'
    try {
        pool.query(insert_query, [edit, status, form_field_id, employee_form_id], (err, result) => {
            if(err){
                res.send(err)
            }else {
                res.send(result.rows)
                res.sendStatus(204)
            }
        })
    }catch(error) {
        console.log(error)
        res.send('there is currently')
    }
})

offboarding_router.delete("/delete/:id", (req, res) => {
    const id = req.params.id

    const insert_query = 'DELETE FROM users WHERE id = $1'
    try{
        pool.query(insert_query, [id], (err, result) => {
            if(err){
                res.send(err)
            }else {
                res.sendStatus(204)
            }
        })
    }catch(error) {
        console.log(err)
    }
})

export default offboarding_router;






