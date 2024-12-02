'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import successAnimation from '../../../public/animations/github-animation.json';

const DonePage = () => {
    const searchParams = useSearchParams();
    const repoUrl = searchParams?.get('repoUrl') || '';
    const type = searchParams?.get('type');

    const getSuccessMessage = () => {
        switch (type) {
            case 'label':
                return '라벨 생성을';
            case 'readme':
                return 'README 생성을';
            case 'template':
                return '템플릿 생성을';
            default:
                return '작업을';
        }
    };

    const getGitHubUrl = () => {
        if (type === 'label') {
            return `${repoUrl}/labels`;
        }
        return repoUrl;
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-neutral-50 to-white px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <div className="mx-auto mb-8 w-64">
                    <Lottie animationData={successAnimation} loop={true} />
                </div>
                <h1 className="mb-4 text-3xl font-bold text-neutral-900">
                    {getSuccessMessage()} 성공적으로 완료했어요!
                </h1>
                <p className="mb-8 text-lg text-neutral-600">
                    한번 구경해보러 갈까요?
                </p>
                <div className="mt-8 flex flex-col gap-4">
                    <motion.a
                        href={getGitHubUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 font-medium text-white transition-colors hover:bg-neutral-800"
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
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                        </svg>
                        GitHub 바로 보러가기
                    </motion.a>

                    <div className="flex justify-center gap-3">
                        <motion.a
                            href="/template-dashboard"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-6 py-3 font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
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
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                />
                            </svg>
                            템플릿 구경하기
                        </motion.a>

                        <motion.a
                            href="/"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-6 py-3 font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
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
                            홈으로 가기
                        </motion.a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default DonePage;
