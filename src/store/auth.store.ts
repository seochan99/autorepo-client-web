import { create } from 'zustand';

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    isLoggedIn: boolean;
    setTokens: (
        accessToken: string | null,
        refreshToken: string | null,
    ) => void;
    clearTokens: () => void;
    setIsLoggedIn: (value: boolean) => void;
    initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    refreshToken: null,
    isLoggedIn: false,
    setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
    clearTokens: () => set({ accessToken: null, refreshToken: null }),
    setIsLoggedIn: (value) => set({ isLoggedIn: value }),
    initializeAuth: () => {
        const token = localStorage.getItem('accessToken');
        set({ isLoggedIn: !!token });
    },
}));

// 전역에서 사용할 수 있는 상태 관리 객체
export const authStore = {
    getState: useAuthStore.getState,
    setState: useAuthStore.setState,
};
