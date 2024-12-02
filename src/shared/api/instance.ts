import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// 커스텀 config 타입 정의
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

interface ErrorResponse {
    message?: string;
}

export const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터
instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

// 응답 인터셉터
instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;
        if (!originalRequest) return Promise.reject(error);

        // 토큰 만료 에러 체크
        let isTokenError =
            error.response?.status === 401 ||
            error.message?.includes('JWT expired') ||
            error.message?.includes('Token validation failed') ||
            error.message?.includes('difference of');

        // 서버 에러(500) 체크 추가
        if (error.response?.status === 500) {
            // 문자열로 온 에러 메시지도 체크
            if (
                typeof error.response.data === 'string' &&
                (error.response.data.includes('Token validation failed') ||
                    error.response.data.includes('JWT expired'))
            ) {
                isTokenError = true;
            }
        }

        if (isTokenError && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');

                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/token/refresh`,
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            refreshToken: refreshToken,
                        },
                    },
                );

                const { accessToken, refreshToken: newRefreshToken } =
                    response.data;

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', newRefreshToken);

                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                }

                return instance(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    },
);
