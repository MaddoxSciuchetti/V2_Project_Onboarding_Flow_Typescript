import { mockResponse, mockRequest } from '../__mocks__/index.ts';
import { getUsers } from '../handlers/users.ts';
import {describe, expect, it} from '@jest/globals';

describe("getUsers", () => {
	it("should return an array of users", () => {
		getUsers(mockRequest, mockResponse);
		expect(mockResponse.send).toHaveBeenCalledWith([]);
	});
});