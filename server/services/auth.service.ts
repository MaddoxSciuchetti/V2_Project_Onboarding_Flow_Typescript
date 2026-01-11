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

export const fetchUser = async () => {
  const user_information = await prisma.users.findMany({
    where: {
      employee_forms: {
        some: {
          form_type: FormType.offboarding,
        },
      },
    },
    select: {
      id: true,
      name: true,
      employee_forms: {
        select: {
          form_type: true,
        },
      },
    },
  });
  return {
    user_information,
  };
};

export const deleteUser = async (data: any) => {
  const delete_user = await prisma.users.delete({
    where: {
      id: data,
    },
  });

  return delete_user;
};

export const getUserFormData = async (id: any) => {
  return await prisma.users.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      employee_forms: {
        select: {
          id: true,
          form_type: true,
          form_inputs: {
            orderBy: {
              form_field_id: "asc",
            },
            select: {
              id: true,
              form_field_id: true,
              status: true,
              edit: true,
              form_fields: {
                select: {
                  description: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

type Data = {
  id: number;
  editcomment: string;
  select_option: string;
};

export const editdata = async (data: Data) => {
  return await prisma.form_inputs.update({
    where: {
      id: data.id,
    },
    data: {
      status: data.select_option,
      edit: data.editcomment,
    },
  });
};
