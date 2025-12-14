import express from "express"
import pool from "../db.js"


const onboarding_router = express.Router()


onboarding_router.post("/postData", async (req, res) => {
    const name = req.body.name
    const onboarding = 'onboarding'
    console.log(name)
    
    // const create_form = 'INSERT INTO employee_forms (user_id, form_type) VALUES ( (SELECT id FROM users ORDER BY id DESC LIMIT 1) , $1)'
    // const create_form = 'INSERT INTO employee_forms (user_id, form_type) VALUES (SELECT MAX(id) from users, $1)'

    const creating_user = 
    'WITH getval(id) as (INSERT INTO users (name) VALUES ($1) RETURNING id) INSERT INTO employee_forms (user_id, form_type) VALUES((SELECT id from getval),  $2);' 


    pool.query(creating_user, [name, onboarding], async (err, result) => {
        if(err) {
            res.send(err)
            console.log(err)
        } else{
            console.log(result)
            res.sendStatus(204)
        }
    })
})

onboarding_router.get("/fetchData", (req, res) => {
    try{
        const fetch_query = 'SELECT * FROM users'
        pool.query(fetch_query, (err, result) => {
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




export default onboarding_router;


