import request from "supertest";
import { type Express  } from "express";
import { createApp } from "../createApp.ts";
import { pool } from "@/db.ts";
import { before } from "node:test";


let app: Express
beforeAll(() => {

    app = createApp();
});

describe("task routes", () => {
    
    describe("/api/users", () => {
    
        it("should return an empty array when getting /api/users", async  () => {
            const response = await request(app).get("/api/users");
            expect(response.body).toStrictEqual([]);
        })
    
    });
    
    describe("/onboarding", () => {

        it("should return status 201", async () => {
            const taskData = {
                name: "maddox"
            }
            const response = await request(app).post("/onboarding/postData").send(taskData)
            expect(response.status).toBe(201)
        })

        it("should return status 201", async () => {
            const response = await request(app).get("/onboarding/fetchData")
            expect(response.status).toBe(201)
        })

        it("should return a status 201", async () => {
            const response = await request(app).get("/onboarding/user/1")
            expect(response.status).toBe(201)
        })

        it("should return a status 201", async () => {

            const data = {
                editcomment: "mmm",
                form_field_id: "1",
                select_option: "erledigt", 
                username: "278"
            }
            const response = await request(app).put("/onboarding/editdata").send(data)
            expect(response.status).toBe(201)
        })

        it("should return a status 201", async () => {
            const response = await request(app).delete("/onboarding/delete/1")
            expect(response.status).toBe(201)
        })
    })

    describe("offboarding", () => {

        it("should return a status 201", async () => {
            const data = {
                name: "maddox"
            }
            const response = await request(app).post("/offboarding/postoffboardingdata").send(data)
            expect(response.status).toBe(201)
        })

        it("should return a status 201", async () => {

            const response = await request(app).get("/offboarding/fetchData")
            expect(response.status).toBe(201)
        })

        it("should return a status 201", async () => {
            
            const response = await request(app).get("/offboarding/user/1")
            expect(response.status).toBe(201)
        })


        it("should return a status 201", async () => {

            const data = {
                editcomment: "mmm",
                form_field_id: "1",
                select_option: "erledigt", 
                username: "278"
            }
            const response = await request(app).put("/offboarding/editdata").send(data)
            expect(response.status).toBe(201)
        })


        it("should return a status 201", async () => {
            
            const response = await request(app).delete("/offboarding/delete/1")
            expect(response.status).toBe(201)
        })
    })

})



