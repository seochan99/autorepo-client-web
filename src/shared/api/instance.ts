import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// 커스텀 config 타입 정의
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
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

        // 401 에러이고 재시도하지 않은 요청인 경우
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');

                // 토큰 재발급 요청
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

                // 새 토큰 저장
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', newRefreshToken);

                // 원래 요청 재시도
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                }
                return instance(originalRequest);
            } catch (refreshError) {
                // 리프레시 토큰도 만료된 경우
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    },
);
