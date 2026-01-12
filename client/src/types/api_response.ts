export type APIResponse = SuccessResponse | ErrorResponse;

export type SuccessResponse = {
  success: true;
  affectedRows: number;
};

export type ErrorResponse = {
  success: false;
  error: string;
};
