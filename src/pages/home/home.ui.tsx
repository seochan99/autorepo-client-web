'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const HomePage = (): ReactElement => {
    const router = useRouter();

    const handleStart = () => {
        router.push('/template-issue');
    };

    const handleBrowse = () => {
        router.push('/template-dashboard');
    };

    return (
        <motion.div
            initial="initial"
            animate="animate"
            className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6"
        >
            {/* 헤더 섹션 */}
            <motion.div
                variants={staggerContainer}
                className="mx-auto max-w-7xl pt-12 text-center sm:pt-20"
            >
                <motion.div variants={fadeInUp} className="px-4">
                    <div className="space-y-4">
                        <h1 className="text-5xl font-bold leading-tight text-neutral-900 sm:leading-tight lg:text-6xl">
                            <span className="block">
                                Github Repo의{' '}
                                <span className="bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-transparent">
                                    모든 것
                                </span>
                            </span>
                        </h1>
                        <h2 className="mx-auto max-w-3xl text-xl font-medium text-neutral-800 sm:text-2xl">
                            깃허브 프로젝트 초기셋팅{' '}
                            <span className="text-neutral-900">
                                이제 편하고 빠르게 하자!
                            </span>
                            <br />
                        </h2>
                    </div>
                </motion.div>

                {/* 서브 텍스트 */}
                <motion.p
                    variants={fadeInUp}
                    className="mx-auto mt-4 max-w-2xl px-4 text-base text-gray-600 sm:mt-6 sm:text-lg"
                >
                    GitHub 이슈와 PR 템플릿을 쉽고 빠르게 만들고 관리하세요.
                    <br className="hidden sm:block" />
                    AutoRepo와 함께라면 더 효율적인 프로젝트 관리가 가능합니다.
                </motion.p>

                {/* 버튼 그룹 */}
                <motion.div
                    variants={fadeInUp}
                    className="mt-6 flex flex-col gap-3 px-4 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleStart}
                        className="group w-full rounded-lg bg-neutral-900 px-6 py-3 font-medium text-white transition duration-300 hover:bg-neutral-800 sm:w-auto sm:px-8"
                    >
                        <span className="relative flex items-center justify-center gap-2">
                            <span>바로 시작하기</span>
                            <motion.svg
                                className="size-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                animate={{ x: 0 }}
                                whileHover={{ x: 4 }}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </motion.svg>
                        </span>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleBrowse}
                        className="group w-full rounded-lg border-2 border-gray-300 bg-white px-6 py-3 font-medium text-neutral-700 transition duration-300 hover:border-neutral-900 hover:text-neutral-900 sm:w-auto sm:px-8"
                    >
                        <span className="relative flex items-center justify-center gap-2">
                            <span>템플릿 구경하기</span>
                            <motion.svg
                                className="size-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                animate={{ x: 0 }}
                                whileHover={{ x: 4 }}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
                                />
                            </motion.svg>
                        </span>
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* 이미지 캐러셀 */}
            <motion.div
                variants={fadeInUp}
                className="mt-12 overflow-hidden bg-gray-50 py-8 sm:mt-20 sm:py-16"
            >
                <div className="relative">
                    {/* 그라데이션 오버레이 */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-50 sm:w-32"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-50 sm:w-32"></div>

                    {/* 슬라이딩 이미지 */}
                    <div className="flex animate-slideRight gap-4 sm:gap-8">
                        {Array(2)
                            .fill([
                                'image1.png',
                                'image2.png',
                                'image3.png',
                                'image4.png',
                                'image5.png',
                            ])
                            .flat()
                            .map((imageName, index) => (
                                <div
                                    key={index}
                                    className="relative shrink-0 h-[300px] w-[450px]"
                                >
                                    <Image
                                        src={`/images/${imageName}`}
                                        alt={`Template ${index + 1}`}
                                        fill
                                        className="rounded-xl object-cover shadow-lg transition duration-300 hover:shadow-xl"
                                        sizes="(max-width: 768px) 100vw, 450px"
                                    />
                                    <div className="absolute inset-0 rounded-xl border border-gray-200" />
                                </div>
                            ))}
                    </div>
                </div>
            </motion.div>

            {/* 특징 섹션 */}
            <motion.div
                variants={staggerContainer}
                className="mx-auto max-w-7xl px-4 py-12 sm:py-20"
            >
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            icon: 'M13 10V3L4 14h7v7l9-11h-7z',
                            title: '빠른 시작',
                            description: '몇 번의 클릭만으로 템플릿 생성 시작',
                        },
                        {
                            icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
                            title: '커스텀 템플릿',
                            description: '프로젝트에 맞는 맞춤형 템플릿 제작',
                        },
                        {
                            icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
                            title: 'GitHub 통합',
                            description: 'GitHub와 완벽한 연동으로 간편한 관리',
                        },
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="text-center"
                            whileHover={{ y: -5 }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-neutral-100"
                            >
                                <svg
                                    className="size-6 text-neutral-900"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d={feature.icon}
                                    />
                                </svg>
                            </motion.div>
                            <h3 className="mb-2 text-base font-semibold sm:text-lg">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-gray-600 sm:text-base">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default HomePage;
