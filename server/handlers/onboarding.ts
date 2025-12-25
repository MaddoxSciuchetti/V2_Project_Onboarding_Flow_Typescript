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
    const creating_user = `WITH ins1 AS (INSERT INTO users(name)VALUES ($1)RETURNING id), ins2 AS (INSERT INTO employee_forms(user_id, form_type)VALUES((SELECT id FROM ins1), $2)RETURNING id) INSERT INTO form_inputs(employee_form_id, form_field_id)VALUES ((SELECT id from ins2), (1)),((SELECT id from ins2), (2)),((SELECT id from ins2), (3)),((SELECT id from ins2), (4)),((SELECT id from ins2), (5)),((SELECT id from ins2), (6)),((SELECT id from ins2), (7)),((SELECT id from ins2), (8)),((SELECT id from ins2), (9)),((SELECT id from ins2), (10)),((SELECT id from ins2), (11)),((SELECT id from ins2), (12)),((SELECT id from ins2), (13)),((SELECT id from ins2), (14)),((SELECT id from ins2), (15)),((SELECT id from ins2), (16)),((SELECT id from ins2), (17)) RETURNING employee_form_id;`
    pool.query(creating_user, [name, onboarding], async (err, result) => {
        
        
        if(err){
            response.status(404).send(err)
            console.log(err)
        }else {
            console.log(result.rows[0])
            response.status(201).json(
                result.rows[0]
            )
        }
    })

    pool.end()
    
}
