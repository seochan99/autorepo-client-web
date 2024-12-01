import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { authService } from '@/shared/api/services/auth';

// API 기본 설정
export const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000, // 10초 타임아웃
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터
instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 토큰이 필요한 API 요청인 경우
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        // CSRF 방지
        config.headers['X-Requested-With'] = 'XMLHttpRequest';

        return config;
    },
    (error: AxiosError) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
    },
);

// 응답 인터셉터
instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config;

        // 토큰 만료로 인한 401 에러 처리
        if (error.response?.status === 401 && originalRequest) {
            try {
                // 토큰 갱신 시도
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    throw new Error('No refresh token');
                }

                const response = await authService.refresh(refreshToken);
                const newAccessToken = response.data.data.accessToken;

                // 새 토큰 저장
                localStorage.setItem('accessToken', newAccessToken);

                // 실패한 요청 재시도
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                }
                return instance(originalRequest);
            } catch (refreshError) {
                // 토큰 갱신 실패 시 로그아웃
                authService.clearTokens();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        // 서버 에러 처리
        if (error.response?.status === 500) {
            console.error('Server Error:', error.response.data);
        }

        return Promise.reject(error);
    },
);
