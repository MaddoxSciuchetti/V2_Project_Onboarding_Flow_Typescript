import z from 'zod';
import { formSchema } from '../schemas/index.schema';

export type form_field = {
  id: number;
  form_field_id: number;
  description: string;
  officialOwner: string;
  substituteOwner: string;
  owner_id: number;
  is_substitute: boolean;
  status: string;
  edit: string;
};

export type api_Response = {
  user: {
    id: number;
    vorname: string;
    nachname: string;
  };
  form: {
    id: number;
    type: string;
    fields: form_field[];
  };
};

export type insertHistoryDataType = z.infer<typeof formSchema>;
