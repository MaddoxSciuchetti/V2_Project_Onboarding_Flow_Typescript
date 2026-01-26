import API from "@/config/apiClient";
import { User } from "shared_prisma_types";

export type RegisterRequest = {
  email: string;
  password: string;
  confirmPassword: string;
  userAgent?: string;
};

export type RegisterResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type LoginRequest = Omit<RegisterRequest, "confirmPassword">;

export type LoginResponse = Omit<RegisterResponse, "user">;

export type Verify = {
  code: string;
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  return API.post<LoginRequest, LoginResponse>("/auth/login", data);
};
export const signup = async (
  data: RegisterRequest,
): Promise<RegisterResponse> => {
  return API.post<RegisterRequest, RegisterResponse>("/auth/register", data);
};

export const logout = async () => API.get("/auth/logout");

export const verifyEmail = async (
  verificationCode: Verify,
): Promise<string> => {
  return API.get<Verify, string>(`/auth/email/verify/${verificationCode.code}`);
};

export const sendPasswordResetEmail = async (email: any) =>
  API.post("/auth/password/forgot", { email });

export const resetPassword = async ({ verificationCode, password }: any) =>
  API.post("/auth/password/reset", { verificationCode, password });

type user = {
  email: string;
  verified: boolean;
  createdAt: string;
};

export const getUser = async (): Promise<user> => {
  return API.get<any, user>("/user");
};

export const getSessions = async () => API.get("/sessions");
export const deleteSession = async (id: string): Promise<void> =>
  API.delete(`/sessions/${id}`);
