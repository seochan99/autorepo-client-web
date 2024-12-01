export interface AuthResponse {
    status: number;
    message: string;
    data: {
        accessToken: string;
        refreshToken: string;
    };
}

export interface RefreshTokenRequest {
    refreshToken: string;
}
