import { User } from "./user";

export interface VerifyCodeResponse {
    success: boolean;
    message: string;
    data: {
        user: User;
        access_token: string;
    };
}
