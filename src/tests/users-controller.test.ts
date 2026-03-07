import request from "supertest";

import { app } from "@/app";

describe("UsersController", () => {
    it("should create a new user successfully", async () => {
        const response = await request(app).post("/users").send({
            name: "John Doe",
            email: "john.doe@example.com",
            password: "password123",
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe("John Doe");
        expect(response.body.email).toBe("john.doe@example.com");
    });
});