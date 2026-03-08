import { verify } from "jsonwebtoken";
import { AppError } from "@/utils/AppError";
import { authConfig } from "@/configs/auth";

export interface TokenPayload {
    sub: string;
    role: string;
}

export function decodeToken(token: string): TokenPayload {
    const decoded = verify(token, authConfig.jwt.secret);

    // o verify pode retornar string ou JwtPayload
    if (typeof decoded === "string" || !decoded) {
        throw new AppError("Invalid JWT token", 401);
    }

    const payload = decoded as TokenPayload;

    if (!payload.sub || !payload.role) {
        throw new AppError("Invalid JWT payload", 401);
    }

    return payload;
}