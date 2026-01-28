import { prisma } from "@/lib/prisma";
import { datevalidation } from "@/src/utils/datevalidation";

type dataObject = {
  type: string;
  vorname: string;
  nachname: string;
  email: string;
  geburtsdatum: string;
  adresse: string;
  eintrittsdatum: string;
  position: string;
};

const FORM_INPUTS_ONBOARDING = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
] as const;

const FORM_INPUTS_OFFBOARDING = [
  18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
] as const;

type returnObject = {
  user: {
    id: number;
    vorname: string;
    nachname: string;
  };
  employee_form: number;
};

export const createUser = (data: dataObject): Promise<returnObject> => {
  return prisma.$transaction(async (tx: any) => {
    const user = await tx.users.create({
      data: {
        vorname: data.vorname,
        nachname: data.nachname,
        email: data.email,
        geburtsdatum: datevalidation(data.geburtsdatum),
        adresse: data.adresse,
        eintrittsdatum: datevalidation(data.eintrittsdatum),
        position: data.position,
      },
      select: {
        id: true,
        vorname: true,
        nachname: true,
      },
    });

    const employee_forms_table = await tx.employee_forms.create({
      data: {
        user_id: user.id,
        form_type: data.type,
      },
      select: {
        id: true,
        form_type: true,
      },
    });

    await tx.form_inputs.createMany({
      data:
        employee_forms_table.form_type === "Offboarding"
          ? FORM_INPUTS_OFFBOARDING.map((field_id) => ({
              employee_form_id: employee_forms_table.id,
              form_field_id: field_id,
            }))
          : FORM_INPUTS_ONBOARDING.map((field_id) => ({
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
          form_type: { in: ["Onboarding", "Offboarding"] },
        },
      },
    },
    select: {
      id: true,
      vorname: true,
      nachname: true,
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
      vorname: true,
      nachname: true,
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

type historySchemaget = {
  id: number;
};

type historySchema = {
  editcomment: string;
  select_option: string;
};

export const insertHistoryData = async (
  data: historySchemaget & historySchema,
) => {
  return await prisma.historyFormData.createMany({
    data: {
      status: data.select_option,
      edit: data.editcomment,
      form_input_id: data.id,
    },
  });
};

export const getHistoryData = async (data: number) => {
  return await prisma.historyFormData.findMany({
    where: {
      form_input_id: data,
    },
    select: {
      status: true,
      edit: true,
      timestamp: true,
    },
  });
};
