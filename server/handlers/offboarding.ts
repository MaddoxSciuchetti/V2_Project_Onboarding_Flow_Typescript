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
  editdata,
  fetchUser,
  getUserFormData,
} from "@/services/auth.service.ts";
import { Form_inputsScalarFieldEnum } from "@/generated/prisma/internal/prismaNamespace.ts";
import { FormType } from "@/generated/prisma/enums.ts";

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
  const id = +req.params.id;

  const user = await getUserFormData(id);
  if (!user) {
    throw new Error("error occued");
  }

  const form = user.employee_forms.find(
    (f) => f.form_type === FormType.offboarding
  );

  if (!form) {
    return res.status(404).json({ message: "Offboarding form is not found" });
  }

  const response = {
    user: {
      id: user.id,
      name: user.name,
    },
    form: {
      id: form.id,
      type: form.form_type,
      fields: form.form_inputs.map((input) => ({
        id: input.id,
        form_field_id: input.form_field_id,
        description: input.form_fields.description,
        status: input.status,
        edit: input.edit,
      })),
    },
  };

  console.log(JSON.stringify(response?.form.fields, null, 2));

  return res.status(200).json(response);
};

const requestschema = z.object({
  id: z.coerce.number().int().positive(),
  editcomment: z.string(),
  select_option: z.string(),
});

export const offboardingEditdata = async (req: Request, res: Response) => {
  // validate request

  const request = requestschema.parse(req.body);

  // business log

  const editresponse = await editdata(request);
};
("UPDATE form_inputs SET edit=$1, status=$2 WHERE form_field_id= $3 AND employee_form_id = $4");
