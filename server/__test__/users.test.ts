import { mockResponse, mockRequest } from '../__mocks__/index.ts';
import { getUsers, getUserById } from '../handlers/users.ts';
import {describe, expect, it} from '@jest/globals';

describe("getUsers", () => {
	it("should return an array of users", () => {
		getUsers(mockRequest, mockResponse);
		expect(mockResponse.send).toHaveBeenCalledWith([]);
	});
});

describe("getUsers", () => {
	it("should return an object of users", () => {
		getUserById(mockRequest, mockResponse);
		expect(mockResponse.send).toHaveBeenCalledWith({})
	})
})