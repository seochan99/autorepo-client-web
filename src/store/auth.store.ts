import { create } from 'zustand';

import { authService } from '@/shared/api/services/auth';

interface AuthStore {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    initializeAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    isLoggedIn: false,
    setIsLoggedIn: (value) => set({ isLoggedIn: value }),
    initializeAuth: () => {
        if (typeof window !== 'undefined') {
            set({ isLoggedIn: authService.isAuthenticated() });
        }
    },
}));
