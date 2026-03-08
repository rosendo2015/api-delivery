import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/database/prisma";

describe("UsersController", () => {
    let user_id: string;

    afterAll(async () => {
        // Clean up the created user after tests
        await prisma.user.delete({ where: { id: user_id } });
    })

    it("should create a new user successfully", async () => {
        const response = await request(app).post("/users").send({
            name: "John Doe",
            email: "john.doe@example.com",
            password: "123456",
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe("John Doe");
        expect(response.body.email).toBe("john.doe@example.com");

        user_id = response.body.id; // Store the created user's ID for cleanup
    });
    it("should throw an error when creating a user with an existing email", async () => {
        const response = await request(app).post("/users").send({
            name: "John Doe",
            email: "john.doe@example.com",
            password: "123456",
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Email already exists");
    });
    it("should throw a validation error if email is invalid", async () => {
        const response = await request(app).post("/users").send({
            name: "John Doe",
            email: "john.doeexample.com",
            password: "123456",
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Validation error");
    });
});