'use client';

import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReactElement, useEffect } from 'react';

import { authService } from '@/shared/api/services/auth';
import { useAuthStore } from '@/store/auth.store';

import loadingAnimation from '../../../../public/animations/loading.json';

// 커스텀 이벤트 생성
const LOGIN_STATUS_CHANGE = 'loginStatusChange';

const OAuthSuccessPage = (): ReactElement => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setIsLoggedIn } = useAuthStore();

    useEffect(() => {
        const accessToken = searchParams?.get('accessToken');
        const refreshToken = searchParams?.get('refreshToken');

        if (accessToken && refreshToken) {
            authService.setTokens({
                accessToken,
                refreshToken,
            });

            setIsLoggedIn(true);

            setTimeout(() => {
                router.push('/');
            }, 1500);
        } else {
            router.push('/login');
        }
    }, [router, searchParams, setIsLoggedIn]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex min-h-screen items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-neutral-100"
        >
            <div className="text-center">
                <div className="mx-auto mb-8 w-48">
                    <Lottie
                        animationData={loadingAnimation}
                        loop={true}
                        className="scale-125"
                    />
                </div>
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-semibold text-neutral-900"
                >
                    로그인 처리 중...
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-2 text-neutral-600"
                >
                    잠시만 기다려주세요
                </motion.p>
            </div>
        </motion.div>
    );
};

export default OAuthSuccessPage;
