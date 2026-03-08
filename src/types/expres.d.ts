import { TokenPayload } from "@/middleware/ensure-authenticated"
declare global {
    namespace Express {
        interface Request {
            user: {
                id: string
                role: string
            }
        }
    }
}