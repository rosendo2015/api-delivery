import request from "supertest";
import { app } from "@/app";

describe("SessionsController", () => {
    it("should create a new session successfully", async () => {
        const response = await request(app).post("/sessions").send({
            email: "john.doe@example.com",
            password: "123456",
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("token");
    });
});