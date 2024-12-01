'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { authService } from '@/shared/api/services/auth';

export default function OAuthSuccessPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const accessToken = searchParams?.get('accessToken');
        const refreshToken = searchParams?.get('refreshToken');

        if (accessToken && refreshToken) {
            // 토큰 저장
            authService.setTokens({
                accessToken,
                refreshToken,
            });

            // 홈페이지로 리다이렉트
            router.push('/');
        } else {
            // 토큰이 없으면 로그인 페이지로
            router.push('/login');
        }
    }, [router, searchParams]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <h1 className="mb-4 text-2xl font-bold">로그인 처리 중...</h1>
                <p className="text-gray-600">잠시만 기다려주세요.</p>
            </div>
        </div>
    );
}
