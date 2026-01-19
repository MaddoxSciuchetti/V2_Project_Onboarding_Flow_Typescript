import type { CreateUserQueryParams } from "@/src/types/query-params.ts";
import type { CreateUserDto } from "../dtos/CreateUser.dto.ts";
import type { Request, Response } from "express-serve-static-core";
import type { User } from "@/src/types/response.ts";
import { Session } from "express-session";
import { Passport } from "passport";
export function getUsers(request: Request, response: Response) {
  response.send([]);
}

export function getUserById(request: Request, response: Response) {
  response.send({});
}

export function createUser(
  request: Request<{}, {}, CreateUserDto, CreateUserQueryParams>,
  response: Response<User>
) {
  request.logOut;
  return response.status(201).send({
    id: 1,
    username: "an",
    email: "ans",
  });
}
