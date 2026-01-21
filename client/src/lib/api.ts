import API from "@/config/apiClient";
import z from "zod";
import { loginSchema } from "@acme/shared";

type Data = z.infer<typeof loginSchema>;

export const login = async (data: Data) => API.post("/auth/login", data);
export const signup = async (data: Data) => API.post("/auth/signup", data);
export const verifyEmail = async (verificationCode: Data) =>
  API.get(`/auth/email/verify/${verificationCode}`);
