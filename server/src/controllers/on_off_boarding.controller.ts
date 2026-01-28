import type { Request, Response } from "express-serve-static-core";
import z from "zod";
import {
  createUser,
  deleteUser,
  editdata,
  fetchUser,
  getHistoryData,
  getUserFormData,
  insertHistoryData,
} from "@/src/services/on_off_boarding.auth";
export const postOffboardingData = async (req: Request, res: Response) => {
  // validate the request
  try {
    const request = {
      ...req.body.data,
    };

    // business logic

    const { user } = await createUser(request);
    return res.status(201).json({ success: user });
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

  const delete_user = await deleteUser(id);

  return res.status(204).json(delete_user);
};

// formfetch
export const offboardingGetuserbyId = async (req: Request, res: Response) => {
  const id = +req.params.id;
  const param1 = req.query.param1;

  const user = await getUserFormData(id);
  if (!user) {
    throw new Error("error occued");
  }

  const form = user.employee_forms.find((f: any) => f.form_type === param1);

  if (!form) {
    return res.status(404).json({ message: "Offboarding form is not found" });
  }

  const response = {
    user: {
      id: user.id,
      vorname: user.vorname,
      nachname: user.nachname,
    },
    form: {
      id: form.id,
      type: form.form_type,
      fields: form.form_inputs.map((input: any) => ({
        id: input.id,
        form_field_id: input.form_field_id,
        description: input.form_fields.description,
        status: input.status,
        edit: input.edit,
      })),
    },
  };

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

  return res.status(200).json(editresponse);
};

export const historySchemaget = z.object({
  id: z.coerce.number(),
});

export const historySchema = z.object({
  result: z.object({
    id: z.coerce.number(),
    editcomment: z.string(),
    select_option: z.string(),
  }),
  user: z.object({
    id: z.string(),
    email: z.string(),
    verified: z.boolean(),
  }),
});

export type HistorySchemaType = z.infer<typeof historySchema>;

export const gethistoryData = async (req: Request, res: Response) => {
  const id = req.params.id;

  const parsedId = z.coerce.number().parse(id);

  const HistoryData = await getHistoryData(parsedId);
  console.log(HistoryData);

  return res.status(200).json(HistoryData);
};

export const postHistoryData = async (req: Request, res: Response) => {
  const result = historySchema.parse(req.body);

  const HistoryData = await insertHistoryData(result);

  return res.status(200).json(HistoryData || []);
};
