import { mockResponse, mockRequest } from '../__mocks__/index.ts';
import { getUsers, getUserById } from '../handlers/users.ts';
import { postData } from '../handlers/onboarding.ts';
import {describe, expect, it} from '@jest/globals';
import { mock } from 'node:test';


describe("getUsers", () => {
	it("should return an array of users", () => {
		getUsers(mockRequest, mockResponse);
		expect(mockResponse.send).toHaveBeenCalledWith([]);
	});

	it("should return aaaa", async () => {
		const mymock: any = {
			body: {
				name: "maddox"
			}
		}
		postData(mymock, mockResponse)
		expect(mockResponse)
	})
});



