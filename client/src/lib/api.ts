import API from "@/config/apiClient";

export type Data = {
  email: string;
  password: string;
  confirmPassword?: string;
};

export type Verify = {
  code: string;
};

export const login = async (data: Data) => API.post("/auth/login", data);
export const signup = async (data: Data) => API.post("/auth/register", data);
export const verifyEmail = async (verificationCode: Verify) =>
  API.get(`/auth/email/verify/${verificationCode.code}`);
