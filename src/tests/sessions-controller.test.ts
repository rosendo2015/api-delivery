import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/database/prisma";

describe("SessionsController", () => {
    let user_id: string;
    afterAll(async () => {
        // Clean up the created user after tests
        await prisma.user.delete({ where: { id: user_id } });
    })

    it("should create a new session successfully", async () => {
        const userResponse = await request(app).post("/users").send({
            name: "John Doe",
            email: "alth.john.doe@example.com",
            password: "123456",
        })
        user_id = userResponse.body.id; // Store the created user's ID for cleanup  

        const sessionResponse = await request(app).post("/sessions").send({
            email: "alth.john.doe@example.com",
            password: "123456",
        });
        expect(sessionResponse.status).toBe(200);
        expect(sessionResponse.body.token).toEqual(expect.any(String));

    });
});