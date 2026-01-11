import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { id } from "zod/v4/locales";
import { FormType } from "@/generated/prisma/client";

type dataObject = {
  name: string;
};

const FORM_INPUTS = [
  18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
] as const;

type returnObject = {
  user: {
    id: number;
    name: string;
  };
  employee_form: number;
};

export const createUser = (data: dataObject): Promise<returnObject> => {
  return prisma.$transaction(async (tx) => {
    const user = await tx.users.create({
      data: {
        name: data.name,
      },
      select: {
        id: true,
        name: true,
      },
    });

    const employee_forms_table = await tx.employee_forms.create({
      data: {
        user_id: user.id,
        form_type: FormType.offboarding,
      },
      select: {
        id: true,
      },
    });

    await tx.form_inputs.createMany({
      data: FORM_INPUTS.map((field_id) => ({
        employee_form_id: employee_forms_table.id,
        form_field_id: field_id,
      })),
    });

    return {
      user,
      employee_form: employee_forms_table.id,
    };
  });
};

//   const offboarding = "offboarding";

//   const creating_user = `
//   WITH ins1 AS (INSERT INTO users(name)VALUES
//   ($1) RETURNING id), ins2 AS(INSERT INTO employee_forms(id,
//   form_type)VALUES((SELECT id FROM ins1), $2) RETURNING id)
//   INSERT INTO form_inputs(employee_form_id, form_field_id)
//   VALUES((SELECT id from ins2), (18)), ((SELECT id FROM ins2),
//   (19)), ((SELECT id FROM ins2), (20)), ((SELECT id FROM ins2),
//   (21)), ((SELECT id FROM ins2), (21)), ((SELECT id FROM ins2),
//   (22)), ((SELECT id FROM ins2), (23)), ((SELECT id FROM ins2),
//   (24)), ((SELECT id FROM ins2), (25)), ((SELECT id FROM ins2),
//   (26)), ((SELECT id FROM ins2), (27)), ((SELECT id FROM ins2),
//   (28)), ((SELECT id FROM ins2), (29)), ((SELECT id FROM ins2),
//   (30)), ((SELECT id FROM ins2), (31)) RETURNING employee_form_id;`;

//   pool.query(creating_user, [name, offboarding], async (err, result) => {
//     if (err) {
//       console.log(err);
//       response.status(404).send(err);
//     } else {
//       console.log(result.rows[0]);
//       response.status(201).json(result.rows[0]);
//     }
//   });
