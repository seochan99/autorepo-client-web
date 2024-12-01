import { AuthResponse } from '@/entities/user/model/types';

import { instance } from '../instance';

interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export const authService = {
    // GitHub 로그인 URL을 직접 반환
    getLoginUrl: () => {
        return 'https://api.autorepo.o-r.kr/oauth2/authorization/github';
    },

    // GitHub 콜백 처리 메서드
    handleCallback: async (code: string): Promise<AuthResponse> => {
        try {
            // 콜백 URL에서 직접 데이터를 가져옴
            const response = await fetch(
                `https://api.autorepo.o-r.kr/login/oauth2/code/github?code=${code}`,
            );
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Failed to handle callback: ${error}`);
        }
    },

    // 토큰 저장
    setTokens({ accessToken, refreshToken }: Tokens) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    },

    // 토큰 가져오기
    getTokens(): Tokens {
        return {
            accessToken: localStorage.getItem('accessToken') || '',
            refreshToken: localStorage.getItem('refreshToken') || '',
        };
    },

    // 토큰 갱신
    refresh: (refreshToken: string) =>
        instance.post<AuthResponse>('/api/token/refresh', { refreshToken }),

    // 로그아웃
    logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return instance.post('/api/user/logout');
    },

    // 토큰 삭제
    clearTokens() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    },

    // 인증 여부 확인
    isAuthenticated(): boolean {
        return !!localStorage.getItem('accessToken');
    },
};
