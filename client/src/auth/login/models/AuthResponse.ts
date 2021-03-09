export interface AuthResponse {
  id: number;
  username: string;
  role: string;
  avatar: string;
  token: string;
  tokenExpirationTime: number;
}
