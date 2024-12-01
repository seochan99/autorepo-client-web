'use client';

import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import Link from 'next/link';

import githubCatAnimation from '../public/animations/github-animation.json';

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-neutral-50 to-white px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <div className="mx-auto mb-8 w-64">
                    <Lottie
                        animationData={githubCatAnimation}
                        loop={true}
                        className="drop-shadow-lg"
                    />
                </div>
                <h1 className="mb-4 text-4xl font-bold text-neutral-900">
                    404 - 앗! 이 페이지는 숨어버렸네요
                </h1>
                <p className="mb-8 text-lg text-neutral-600">
                    찾으시는 페이지가 없지만, 대신 귀여운 AutroRepoCat이
                    인사드려요! 🐱
                </p>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 font-medium text-white transition-colors hover:bg-neutral-800"
                    >
                        <svg
                            className="size-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        홈으로 돌아가기
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
