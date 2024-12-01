'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { HomeText } from 'public/svgs';
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
            className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 to-white"
        >
            {/* 헤더 섹션 */}
            <motion.div
                variants={staggerContainer}
                className="mx-auto max-w-7xl px-4 pt-20 text-center sm:px-6 lg:px-8"
            >
                <motion.div variants={fadeInUp}>
                    <HomeText className="mx-auto mt-8 max-w-3xl" />
                </motion.div>

                {/* 서브 텍스트 */}
                <motion.p
                    variants={fadeInUp}
                    className="mx-auto mt-6 max-w-2xl text-lg text-gray-600"
                >
                    GitHub 이슈와 PR 템플릿을 쉽고 빠르게 만들고 관리하세요.
                    <br />
                    AutoRepo와 함께라면 더 효율적인 프로젝트 관리가 가능합니다.
                </motion.p>

                {/* 버튼 그룹 */}
                <motion.div
                    variants={fadeInUp}
                    className="mt-10 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleStart}
                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-neutral-900 px-8 py-3 font-medium text-white transition duration-300 hover:bg-neutral-800"
                    >
                        <span className="relative flex items-center space-x-2">
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
                        className="group inline-flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white px-8 py-3 font-medium text-neutral-700 transition duration-300 hover:border-neutral-900 hover:text-neutral-900"
                    >
                        <span className="relative flex items-center space-x-2">
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
                className="mt-20 overflow-hidden bg-gray-50 py-16"
            >
                <div className="relative">
                    {/* 그라데이션 오버레이 */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50"></div>

                    {/* 슬라이딩 이미지 */}
                    <div className="flex animate-slideRight gap-8">
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
                                <div key={index} className="relative shrink-0">
                                    <img
                                        src={`/images/${imageName}`}
                                        alt={`Template ${index + 1}`}
                                        className="h-[300px] w-[400px] rounded-xl object-cover shadow-lg transition duration-300 hover:shadow-xl"
                                    />
                                    <div className="absolute inset-0 rounded-xl border border-gray-200"></div>
                                </div>
                            ))}
                    </div>
                </div>
            </motion.div>

            {/* 특징 섹션 */}
            <motion.div
                variants={staggerContainer}
                className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
            >
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
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
                            <h3 className="mb-2 text-lg font-semibold">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">
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
