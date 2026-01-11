// import type { CreateUserQueryParams } from "@/types/query-params.ts";
// import type { CreateUserDto } from "../dtos/CreateUser.dto.ts";
import type { Request, Response } from "express-serve-static-core";
// import type { User } from "@/types/response.ts";
// import { Session } from "express-session";
// import { Passport } from "passport";
import { pool } from "../db.ts";
// import { prisma } from "@/lib/prisma";
import z from "zod";
import {
  createUser,
  deleteUser,
  fetchUser,
  getUserFormData,
} from "@/services/auth.service.ts";

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
    // return the response
    console.log(error);
    return res.status(500).json({ error: "internal error" });
  }
};

export const fetchOffboardingData = async (req: Request, res: Response) => {
  const request = {
    ...req.body,
  };
  const { user_information } = await fetchUser();
  return res.status(201).json(user_information);
};

export const offboardingDeletebyId = async (req: Request, res: Response) => {
  const id = +req.params.id;
  console.log(id);

  const delete_user = await deleteUser(id);

  return res.status(204).json(delete_user);
};

// formfetch
export const offboardingGetuserbyId = async (req: Request, res: Response) => {
  const id = req.params.id;
  const {} = await getUserFormData(id);
};

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
