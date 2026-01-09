export interface Task {
  input: {
    name: string;
    id: number;
  };
}

export interface Response_Test {
  employee_form_id: number;
}

export interface Config {
  [key: string]: any;
}

export interface Input1 {
  input: {
    id: number;
    name: string;
  };
}

export interface Incoming_API {
  id: number;
  name: string;
  form_type: string;
}

export interface Data {
  input: {
    editcomment: string;
    form_field_id: number;
    id: number;
    select_option: string;
    username: string;
    id_original: number;
    description: string;
  };
}

export interface FormattedData {
  description: string;
  id: number;
  form_field_id: number;
  status: string;
  edit: string;
  employee_form_id: number;
}

export interface Mappingform {
  form_field_id: string;
  editcomment: string;
  select_option: string;
  id: string;
}
