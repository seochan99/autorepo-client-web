'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import label1 from 'public/images/label1.png';
import label2 from 'public/images/label2.png';
import label3 from 'public/images/label3.png';
import label4 from 'public/images/label4.png';
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

const LabelPage = (): ReactElement => {
    const searchParams = useSearchParams();
    const selectedRepo = searchParams?.get('selectedRepo');

    const sections = [
        {
            title: '이모지 라벨로 시작하기',
            description: '주로 사용하는 이모지 라벨로 시작해볼 수 있어요!',
            route: '/label/emoji',
            query: { type: 'emoji', selectedRepo },
            image: label1,
            icon: '😊',
            color: 'from-pink-500 to-rose-500',
        },
        {
            title: '텍스트 라벨로 시작하기',
            description: '이모지는 필요없다! 텍스트로만 시작해봐요!',
            route: '/label/text',
            query: { type: 'text', selectedRepo },
            image: label2,
            icon: '📝',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            title: '처음부터 시작하기',
            description: '처음부터 만들어나갈 수 있어요!',
            route: '/label/custom',
            query: { type: 'custom', selectedRepo },
            image: label3,
            icon: '🎨',
            color: 'from-violet-500 to-purple-500',
        },
        {
            title: 'CSV로 시작하기',
            description: 'csv를 첨부해서 빠르게 시작해봐요!',
            route: '/label/csv',
            query: { type: 'csv', selectedRepo },
            image: label4,
            icon: '📊',
            color: 'from-green-500 to-emerald-500',
        },
    ];

    return (
        <motion.div
            initial="initial"
            animate="animate"
            className="min-h-screen bg-gradient-to-b from-neutral-50 to-white px-8 py-20"
        >
            <div className="mx-auto max-w-7xl">
                <motion.div variants={fadeInUp} className="mb-16 text-center">
                    <motion.h1
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-4 bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-4xl font-bold text-transparent"
                    >
                        라벨 프리셋 정하기
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="text-lg text-neutral-600"
                    >
                        {selectedRepo
                            ? `${selectedRepo}의 라벨을 만들어볼까요?`
                            : '어떻게 시작할까요?'}
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    className="grid gap-8 sm:grid-cols-2"
                >
                    {sections.map((section) => (
                        <motion.div
                            key={section.title}
                            variants={fadeInUp}
                            whileHover={{ y: -8 }}
                            className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                        >
                            <Link
                                href={{
                                    pathname: section.route,
                                    query: section.query,
                                }}
                                className="block"
                            >
                                <div className="relative">
                                    <Image
                                        src={section.image.src}
                                        alt={section.title}
                                        width={800}
                                        height={400}
                                        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute bottom-4 left-4 text-4xl">
                                        {section.icon}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h2 className="mb-3 text-xl font-semibold text-neutral-800">
                                        {section.title}
                                    </h2>
                                    <p className="text-neutral-600">
                                        {section.description}
                                    </p>
                                </div>
                                <div className="absolute bottom-6 right-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <motion.span
                                        className="flex items-center text-neutral-800"
                                        whileHover={{ x: 4 }}
                                    >
                                        시작하기
                                        <svg
                                            className="ml-2 size-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                                            />
                                        </svg>
                                    </motion.span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default LabelPage;
