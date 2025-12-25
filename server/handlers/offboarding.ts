import type {CreateUserQueryParams} from "@/types/query-params.ts";
import type {CreateUserDto} from "../dtos/CreateUser.dto.ts";
import type {Request, Response} from "express-serve-static-core";
import type {User} from "@/types/response.ts";
import {Session} from "express-session";
import { Passport } from "passport";
import { pool } from "../db.ts";


export function postOffboardingData (
    request: Request, response: Response
) {

    const name = request.body.name
    const offboarding = 'offboarding'
    console.log(name)

    const creating_user = 'WITH ins1 AS (INSERT INTO users(name)VALUES ($1) RETURNING id), ins2 AS(INSERT INTO employee_forms(user_id, form_type)VALUES((SELECT id FROM ins1), $2) RETURNING id) INSERT INTO form_inputs(employee_form_id, form_field_id) VALUES((SELECT id from ins2), (18)), ((SELECT id FROM ins2), (19)), ((SELECT id FROM ins2), (20)), ((SELECT id FROM ins2), (21)), ((SELECT id FROM ins2), (21)), ((SELECT id FROM ins2), (22)), ((SELECT id FROM ins2), (23)), ((SELECT id FROM ins2), (24)), ((SELECT id FROM ins2), (25)), ((SELECT id FROM ins2), (26)), ((SELECT id FROM ins2), (27)), ((SELECT id FROM ins2), (28)), ((SELECT id FROM ins2), (29)), ((SELECT id FROM ins2), (30)), ((SELECT id FROM ins2), (31)) RETURNING employee_form_id;'
    pool.query(creating_user, [name, offboarding], async (err, result) => {
        if(err) {
            console.log(err)
            response.status(404).send(err)
        }else {
            console.log(result.rows[0])
            response.status(201).json(
                result.rows[0]
            )
        }
    })
}


export function fetchOffboardingData (
    request: Request, response: Response
) {

    const form_type = 'offboarding'
    const fetch_query = 'SELECT users.id, users.name, employee_forms.form_type FROM users INNER JOIN employee_forms ON employee_forms.id = users.id WHERE form_type=$1;'
    pool.query(fetch_query, [form_type], (err, result) => {
        if(err){
            response.status(404).send(err)
            console.log(err)
        } else{
            response.status(201).send(result.rows)
        }
    })
}


export function offboardingGetuserbyId (
    request: Request, response: Response
) {

    const id = request.params.id
    try{
        const get_user_form_speciifc_test = 'SELECT users.name, employee_forms.user_id, employee_forms.form_type, form_inputs.employee_form_id, form_inputs.form_field_id, form_inputs.status, form_inputs.edit, form_fields.description FROM users INNER JOIN employee_forms ON employee_forms.user_id = users.id INNER JOIN form_inputs ON form_inputs.employee_form_id = employee_forms.id INNER JOIN form_fields ON form_inputs.form_field_id = form_fields.form_field_id WHERE user_id = $1 ORDER BY form_field_id'
        pool.query(get_user_form_speciifc_test, [id], (err, result) => {
            if(err){
                console.log(err)
                response.status(404).send(err)
            }else {
                console.log(err)
                response.status(201).send(result.rows)
            }
        })
    }catch(error){
        console.log(error)
        response.send('there is currently no data')
    }
}


export function offboardingEditdata (
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
        pool.query(insert_query, [edit, status, form_field_id, employee_form_id], (err, result) => {
            if(err){
                response.status(404).send(err)
            }else {
                response.status(201).send(result.rows)
            }
        })
    }catch(error) {
        console.log(error)

    }
}


export function offboardingDeletebyId (
    request: Request, response: Response
) {

    const id = request.params.id

    const insert_query = 'DELETE FROM users WHERE id = $1'
    try{
        pool.query(insert_query, [id], (err, result) => {
            if(err){
                response.status(404).send(err)
            }else {
                response.status(201).send("hello")
                pool.end();
            }
        })
    }catch(error) {
        console.log(error)
        response.status(404).send("there is currently no data")
    }


}

