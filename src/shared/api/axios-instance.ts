import axios from 'axios';

import { authStore } from '@/store/auth.store';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // 토큰 만료로 인한 401 에러이고, 아직 재시도하지 않은 경우
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    throw new Error('No refresh token');
                }

                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${refreshToken}`,
                        },
                    },
                );

                if (response.data?.accessToken) {
                    const { accessToken } = response.data;
                    localStorage.setItem('accessToken', accessToken);
                    authStore.setState({ accessToken });
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                authStore.setState({ accessToken: null, refreshToken: null });
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
            }
        }

        // 500 에러 처리
        if (error.response?.status === 500) {
            error.message =
                '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
        }

        return Promise.reject(error);
    },
);

export { axiosInstance };
