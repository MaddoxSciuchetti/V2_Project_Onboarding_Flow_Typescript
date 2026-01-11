// import type { CreateUserQueryParams } from "@/types/query-params.ts";
// import type { CreateUserDto } from "../dtos/CreateUser.dto.ts";
import type { Request, Response } from "express-serve-static-core";
// import type { User } from "@/types/response.ts";
// import { Session } from "express-session";
// import { Passport } from "passport";
import { pool } from "../db.ts";
// import { prisma } from "@/lib/prisma";
import z from "zod";
import { createUser } from "@/services/auth.service.ts";

const userschema = z.object({
  name: z.string().min(1).max(22),
});

export const postOffboardingData = async (req: Request, res: Response) => {
  // validate the request

  try {
    const request = userschema.parse({
      ...req.body,
    });

    // business logic

    const { user } = await createUser(request);

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal error" });
  }

  // send the response
};

export function fetchOffboardingData(request: Request, response: Response) {
  const form_type = "offboarding";
  const fetch_query =
    "SELECT users.id, users.name, employee_forms.form_type FROM users INNER JOIN employee_forms ON employee_forms.id = users.id WHERE form_type=$1;";
  pool.query(fetch_query, [form_type], (err, result) => {
    if (err) {
      response.status(404).send(err);
      console.log(err);
    } else {
      response.status(201).send(result.rows);
    }
  });
}

export function offboardingGetuserbyId(request: Request, response: Response) {
  const id = request.params.id;
  try {
    const get_user_form_speciifc_test =
      "SELECT users.name, employee_forms.user_id, employee_forms.form_type, form_inputs.employee_form_id, form_inputs.form_field_id, form_inputs.status, form_inputs.edit, form_fields.description FROM users INNER JOIN employee_forms ON employee_forms.user_id = users.id INNER JOIN form_inputs ON form_inputs.employee_form_id = employee_forms.id INNER JOIN form_fields ON form_inputs.form_field_id = form_fields.form_field_id WHERE user_id = $1 ORDER BY form_field_id";
    pool.query(get_user_form_speciifc_test, [id], (err, result) => {
      if (err) {
        console.log(err);
        response.status(404).send(err);
      } else {
        console.log(err);
        response.status(201).send(result.rows);
      }
    });
  } catch (error) {
    console.log(error);
    response.send("there is currently no data");
  }
}

export function offboardingEditdata(request: Request, response: Response) {
  const id = request.body.id;
  const edit = request.body.editcomment;
  const status = request.body.select_option;
  const form_field_id = request.body.form_field_id;
  const employee_form_id = request.body["id"];

  console.log(id);
  console.log(edit);
  console.log(status);
  console.log(form_field_id);
  console.log(employee_form_id);

  const insert_query =
    "UPDATE form_inputs SET edit=$1, status=$2 WHERE form_field_id= $3 AND employee_form_id = $4";
  try {
    pool.query(
      insert_query,
      [edit, status, form_field_id, employee_form_id],
      (err, result) => {
        if (err) {
          response.status(404).send(err);
        } else {
          response.status(201).json({ affectedRows: result.rowCount });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}

export function offboardingDeletebyId(request: Request, response: Response) {
  const id = request.params.id;

  const insert_query = "DELETE FROM users WHERE id = $1";
  try {
    pool.query(insert_query, [id], (err, result) => {
      if (err) {
        response.status(404).send(err);
      } else {
        response.status(201).send("hello");
        pool.end();
      }
    });
  } catch (error) {
    console.log(error);
    response.status(404).send("there is currently no data");
  }
}
