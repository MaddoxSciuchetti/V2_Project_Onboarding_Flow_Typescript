import request from "supertest";
import { type Express  } from "express";
import { createApp } from "../createApp.ts";
import { pool } from "@/db.ts";

describe("/api/users", () => {
    let app: Express

    beforeAll(() => {

        app = createApp();
    });

    it("should return an empty array when getting /api/users", async  () => {
        const response = await request(app).get("/api/users");
        expect(response.body).toStrictEqual([]);
    })

    it("should return a object containing name", async () => {
        const taskData = {
            name: "maddox"
        }
        const response = await request(app).post("/onboarding/postData").send(taskData)
        expect(response.status).toBe(201)


    })




});
