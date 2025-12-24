import type { CreateUserQueryParams } from "@/types/query-params.ts";
import type { CreateUserDto } from "../dtos/CreateUser.dto.ts";
import type { Request, Response } from "express";
import type { User } from "@/types/response.ts";


export function getUsers(request: Request, response: Response) {
    response.send([])

}


export function getUserById(request: Request, response: Response) {
   response.send({})
}

export function createUser(
    request: Request<{}, {}, CreateUserDto, CreateUserQueryParams>,
    response: Response<User>
) {
    return response.status(201).send({
        id: 1,
        username: "an",
        email: "ans"
    })
}