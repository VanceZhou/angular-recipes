export interface LoginResponse {
    jwtToken: string;
    username: string;
    refreshToken: string;
    expiresAt: Date;

}