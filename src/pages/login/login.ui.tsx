'use client';

import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { useRouter } from 'next/navigation';
import { ReactElement, useEffect } from 'react';

import { authService } from '@/shared/api/services/auth';
import { useAuthStore } from '@/store/auth.store';

import githubAnimation from '../../../public/animations/github-animation.json';

const LoginPage = (): ReactElement => {
    const router = useRouter();
    const { setIsLoggedIn } = useAuthStore();

    useEffect(() => {
        const handleCallback = async () => {
            if (typeof window !== 'undefined') {
                const urlParams = new URLSearchParams(window.location.search);
                const code = urlParams.get('code');

                if (code) {
                    try {
                        const tokens = await authService.handleCallback(code);
                        const { accessToken, refreshToken } = tokens.data;

                        if (accessToken && refreshToken) {
                            authService.setTokens({
                                accessToken,
                                refreshToken,
                            });
                            setIsLoggedIn(true);
                            router.push('/');
                        }
                    } catch (error) {
                        console.error('Login callback failed:', error);
                    }
                }
            }
        };

        handleCallback();
    }, [router, setIsLoggedIn]);

    const handleLogin = () => {
        const loginUrl = authService.getLoginUrl();
        window.location.href = loginUrl;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100"
        >
            <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <div className="relative flex min-h-screen items-center justify-center px-4">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-full max-w-md space-y-8"
                >
                    {/* 로고 & 애니메이션 */}
                    <div className="text-center">
                        <div className="relative mx-auto mb-3 size-48">
                            <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-neutral-100" />
                            <Lottie
                                animationData={githubAnimation}
                                loop={true}
                                className="scale-125"
                            />
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h1 className="bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
                                Welcome to AutoRepo
                            </h1>
                            <p className="mt-4 text-lg text-neutral-600">
                                GitHub 계정으로 로그인하여 프로젝트 관리를
                                시작하세요
                            </p>
                        </motion.div>
                    </div>

                    {/* 로그인 버튼 & 약관 */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-6 rounded-2xl bg-white/80 p-8 shadow-lg backdrop-blur-sm"
                    >
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleLogin}
                            className="group relative flex w-full items-center justify-center gap-3 rounded-xl bg-neutral-900 px-6 py-4 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:bg-neutral-800"
                        >
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                                className="rounded-full bg-white/10 p-1"
                            >
                                <svg
                                    className="size-6"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.489.5.091.683-.217.683-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.607.069-.607 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.22-.253-4.555-1.11-4.555-4.944 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.563 9.563 0 0112 6.843a9.563 9.563 0 012.502.338c1.91-1.294 2.75-1.025 2.75-1.025.544 1.378.201 2.397.099 2.65.64.7 1.028 1.592 1.028 2.683 0 3.842-2.338 4.687-4.566 4.936.36.31.678.922.678 1.855 0 1.338-.012 2.42-.012 2.75 0 .268.18.576.688.479C19.137 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </motion.div>
                            GitHub로 시작하기
                        </motion.button>

                        <p className="text-center text-sm text-neutral-500">
                            로그인하면{' '}
                            <a
                                href="/terms"
                                className="font-medium text-neutral-900 underline decoration-2 underline-offset-2 transition-colors hover:text-neutral-700"
                            >
                                이용약관
                            </a>
                            에 동의하는 것으로 간주됩니다
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default LoginPage;
