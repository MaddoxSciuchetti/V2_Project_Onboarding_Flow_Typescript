import type {CreateUserQueryParams} from "@/types/query-params.ts";
import type {CreateUserDto} from "../dtos/CreateUser.dto.ts";
import type {Request, Response} from "express-serve-static-core";
import type {User} from "@/types/response.ts";
import {Session} from "express-session";
import { Passport } from "passport";
import { pool } from "../db.ts";

export function postData (
    request: Request, response: Response
){
    const name = request.body.name
    const onboarding = "onboarding"
    console.log(name)
    const creating_user = `
    WITH ins1 AS (INSERT INTO users(name)VALUES ($1)RETURNING id), 
    ins2 AS (INSERT INTO employee_forms(user_id, form_type)VALUES
    ((SELECT id FROM ins1), $2)RETURNING id) INSERT INTO form_inputs
    (employee_form_id, form_field_id)VALUES ((SELECT id from ins2), 
    (1)),((SELECT id from ins2), (2)),((SELECT id from ins2), (3)),
    ((SELECT id from ins2), (4)),((SELECT id from ins2), (5)),((SELECT id from ins2),
    (6)),((SELECT id from ins2), (7)),((SELECT id from ins2), (8)),
    ((SELECT id from ins2), (9)),((SELECT id from ins2), (10)),
    ((SELECT id from ins2), (11)),((SELECT id from ins2), (12)),
    ((SELECT id from ins2), (13)),((SELECT id from ins2), (14)),
    ((SELECT id from ins2), (15)),((SELECT id from ins2), (16)),
    ((SELECT id from ins2), (17)) RETURNING employee_form_id;`
    pool.query(creating_user, [name, onboarding], async (err, result) => {
        
        
        if(err){
            response.status(404).send(err)
            console.log(err)
        }else {
            console.log(result.rows[0])
            response.status(201).json(
                result.rows[0] as Number 
            )
        }
    })
}

export function fetchData (
    request: Request, response: Response
) {
    const form_type: string = "onboarding"
    try {
        const fetch_query: string = `
        SELECT users.id, users.name, employee_forms.form_type
        FROM users INNER JOIN employee_forms ON employee_forms.id
        = users.id WHERE form_type = $1`
        pool.query(fetch_query, [form_type], (err, result ) => {
            if(err){
                console.log(err)
                response.status(404).send(err)
            }else{
                response.status(201).send(result.rows)
            }
        })
    }catch(error){
        console.log(error)
        response.status(404).send("there is currently no data")
    }
}


export function getUserId (
    request: Request, response: Response
) {
    const id = request.params.id
    console.log(id)

    const get_user_form_speciifc_test = 'SELECT users.name, employee_forms.user_id, employee_forms.form_type, form_inputs.employee_form_id, form_inputs.form_field_id, form_inputs.status, form_inputs.edit, form_fields.description FROM users INNER JOIN employee_forms ON employee_forms.user_id = users.id INNER JOIN form_inputs ON form_inputs.employee_form_id = employee_forms.id INNER JOIN form_fields ON form_inputs.form_field_id = form_fields.form_field_id WHERE user_id = $1 ORDER BY form_field_id'

    try {
        pool.query(get_user_form_speciifc_test, [id], (err, result) => {
            if(err){
                console.log(err)
                response.status(404).send(err)
            }else{
                response.status(201).send(result.rows)
            }
        })
    }catch(error){
        console.log(error)
        response.send("there is currently no data")
    }

}

export function editData (
    request: Request, response: Response
) {

    const id = request.body["user_id"]
    const edit = request.body["editcomment"]
    const status = request.body["select-option"]
    const form_field_id = request.body["form_field_id"]
    const employee_form_id = request.body["username"]
    console.log(id)
    console.log(edit)
    console.log(status)
    console.log(form_field_id)  
    console.log(employee_form_id)

    const insert_query = 'UPDATE form_inputs SET edit=$1, status=$2 WHERE form_field_id= $3 AND employee_form_id = $4'
    try {
        pool.query(insert_query, [edit, status, form_field_id,employee_form_id], (err, result) => {
            if(err) {
                console.log(err)
                response.status(404).send(err)
            }else{
                response.status(201).send(result.rows)

            }
        })
    }catch(error){
        console.log(error)
        response.send('there is currently no data')
    }
}


export function deleteData (
    request: Request, response: Response
) {
    const id = request.params.id

    const insert_query = 'DELETE FROM users WHERE id = $1'

    try {
        pool.query(insert_query, [id], (err, result) => {
            if(err){
                console.log(err)
                response.status(404).send(err)
            }else {
                response.status(201).send(result)
            }
    })
    }catch(error){
        console.log(error)
    }
};