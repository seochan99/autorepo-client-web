import { RepositoryResponse } from '@/entities/repository/model/types';

import { instance } from '../instance';

// error 객체 타입 정의
type ApiError = {
    message: string;
    response?: {
        data: unknown;
        status: number;
        headers: unknown;
    };
    config?: {
        headers: unknown;
    };
};

export const repositoryService = {
    fetchRepositories: async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error('No access token found');
        }

        // 토큰 형식 로깅
        console.log('Token format:', {
            token: `Bearer ${accessToken}`.substring(0, 20) + '...',
        });

        try {
            const response = await instance.get<RepositoryResponse>(
                '/api/repo/fetch',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
            return response;
        } catch (error: unknown) {
            const apiError = error as ApiError; // 위에서 정의한 ApiError 타입 사용
            console.log('Request details:', {
                url: '/api/repo/fetch',
                headers: apiError.config?.headers,
                response: apiError.response?.data,
            });
            throw error;
        }
    },
};
