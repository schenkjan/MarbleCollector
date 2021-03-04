export interface AuthResponse {
    id: number;
    username: string;
    role: string;
    token: string;
    tokenExpirationTime: number;
}