import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { decodeToken, TokenPayload } from "@/utils/decodeToken";

function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): void {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new AppError("JWT token is missing", 401);
        }
        const [, token] = authHeader.split(" ");

        if (!token) {
            throw new AppError("JWT token is missing", 401);
        }
        const { role, sub: user_id } = decodeToken(token);

        request.user = { id: user_id, role };

        return next();
    } catch (error) {
        throw new AppError("Invalid JWT token", 401);
    }
}

export { ensureAuthenticated };