export interface AuthResponse {
    id: number;
    username: string;
    family: string;
    role: string;
    avatar: string;
    token: string;
    tokenExpirationTime: number;
}