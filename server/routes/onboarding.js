import express from "express"
import pool from "../db.js"


const onboarding_router = express.Router()

onboarding_router.post("/postData", async (req, res) => {
    const name = req.body.name
    const onboarding = 'onboarding'
    console.log(name)
    
    // const create_form = 'INSERT INTO employee_forms (user_id, form_type) VALUES ( (SELECT id FROM users ORDER BY id DESC LIMIT 1) , $1)'
    // const create_form = 'INSERT INTO employee_forms (user_id, form_type) VALUES (SELECT MAX(id) from users, $1)'
    // 'WITH getval(id) as (INSERT INTO users (name) VALUES ($1) RETURNING id) INSERT INTO employee_forms (user_id, form_type) VALUES((SELECT id from getval), $2);

    // const creating_user = "WITH ins1 AS (INSERT INTO users(name) VALUES ($1) RETURNING id as user_id), ins2 AS (INSERT INTO employee_forms(user_id, form_type) VALUES ((SELECT user_id FROM ins1 RETURNING user_id), $1) INSERT INTO form_inputs(employee_form_id, form_field_id) VALUES((SELECT user_id FROM ins2),(SELECT id FROM form_fields ORDER BY id LIMIT 17))"
    const creating_user = `WITH ins1 AS (INSERT INTO users(name)VALUES ($1)RETURNING id), ins2 AS (INSERT INTO employee_forms(user_id, form_type)VALUES((SELECT id FROM ins1), $2)RETURNING id) INSERT INTO form_inputs(employee_form_id, form_field_id)VALUES ((SELECT id from ins2), (1)),((SELECT id from ins2), (2)),((SELECT id from ins2), (3)),((SELECT id from ins2), (4)),((SELECT id from ins2), (5)),((SELECT id from ins2), (6)),((SELECT id from ins2), (7)),((SELECT id from ins2), (8)),((SELECT id from ins2), (9)),((SELECT id from ins2), (10)),((SELECT id from ins2), (11)),((SELECT id from ins2), (12)),((SELECT id from ins2), (13)),((SELECT id from ins2), (14)),((SELECT id from ins2), (15)),((SELECT id from ins2), (16)),((SELECT id from ins2), (17)) RETURNING employee_form_id;`
    pool.query(creating_user, [name, onboarding], async (err, result) => {
        if(err) {
            res.send(err)
            console.log(err)
        } else{
            console.log(result.rows[0])
            res.json(
                

                result.rows[0]
              
                
            )
        }
    })
})

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
                res.send(result)
            }
        })
    }catch(error){
        console.log(error)
        res.send('there is currently no data')
    }
})


onboarding_router.put("/editdata", (req, res) => {

    const id = req.body["user_id"]
    const edit = req.body["edit"]
    const status = req.body["status"]
    const form_field_id = req.body["form_field_id"]
    const employee_form_id = req.body["employee_form_id"]
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
                res.sendStatus(204)
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
                res.sendStatus(204)
            }
    })
    }catch(error){
        console.log(err)
    }
})





export default onboarding_router;


