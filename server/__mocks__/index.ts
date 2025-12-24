import type { Request, Response } from "express"


const mockRequest = {} as Request;

const mockResponse = {
    send: jest.fn(),
} as unknown as Response;


export {mockResponse};
export {mockRequest};