'use client';

import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReactElement, useEffect, useState } from 'react';

import { authService } from '@/shared/api/services/auth';
import { useAuthStore } from '@/store/auth.store';

import loadingAnimation from '../../../../public/animations/loading.json';

// 커스텀 이벤트 생성
const LOGIN_STATUS_CHANGE = 'loginStatusChange';

const OAuthSuccessPage = (): ReactElement => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setIsLoggedIn } = useAuthStore();

    const [loadingText, setLoadingText] = useState('GitHub 숲으로 들어가는 중');

    useEffect(() => {
        const texts = [
            'GitHub 숲으로 들어가는 중',
            '레포지토리 나무를 살펴보는 중',
            '깃허브 새와 인사하는 중',
            '로그인 열쇠를 찾는 중',
        ];

        let currentIndex = 0;
        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % texts.length;
            setLoadingText(texts[currentIndex]);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

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
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                    }}
                    className="relative mx-auto mb-8 w-48"
                >
                    <Lottie
                        animationData={loadingAnimation}
                        loop={true}
                        className="scale-125"
                    />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                        className="absolute -right-4 -top-4 flex size-12 items-center justify-center rounded-full bg-neutral-900 text-2xl text-white shadow-lg"
                    >
                        🐱
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                >
                    <div className="flex items-center justify-center gap-2">
                        <h1 className="text-2xl font-bold text-neutral-900">
                            AutoRepoCat
                        </h1>
                        <div className="flex gap-1">
                            {[1, 2, 3].map((i) => (
                                <motion.span
                                    key={i}
                                    animate={{
                                        opacity: [0, 1, 0],
                                        y: [0, -5, 0],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                    }}
                                    className="text-2xl"
                                >
                                    .
                                </motion.span>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="text-neutral-600"
                    >
                        <p className="mb-1">{loadingText}</p>
                        <p className="text-sm text-neutral-400">
                            잠시만 기다려주세요!
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default OAuthSuccessPage;
