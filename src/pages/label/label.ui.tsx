'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
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

const sections = [
    {
        title: '이모지 라벨로 시작하기',
        description: '주로 사용하는 이모지 라벨로 시작해볼 수 있어요!',
        route: '/label/emoji',
        query: { type: 'emoji' },
        image: label1,
        icon: '😊',
    },
    {
        title: '텍스트 라벨로 시작하기',
        description: '이모지는 필요없다! 텍스트로만 시작해봐요!',
        route: '/label/text',
        query: { type: 'text' },
        image: label2,
        icon: '📝',
    },
    {
        title: '처음부터 시작하기',
        description: '처음부터 만들어나갈 수 있어요!',
        route: '/label/custom',
        query: { type: 'custom' },
        image: label3,
        icon: '🎨',
    },
    {
        title: 'CSV로 시작하기',
        description: 'csv를 첨부해서 빠르게 시작해봐요!',
        route: '/label/csv',
        query: { type: 'csv' },
        image: label4,
        icon: '📊',
    },
];

const LabelPage = (): ReactElement => {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            className="mx-auto min-h-screen max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
        >
            <motion.div variants={fadeInUp} className="text-center">
                <motion.h1
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4 text-4xl font-bold text-neutral-800"
                >
                    라벨 프리셋 정하기
                </motion.h1>
                <motion.p
                    variants={fadeInUp}
                    className="mb-16 text-lg text-neutral-600"
                >
                    어떻게 시작할까요?
                </motion.p>
            </motion.div>

            <motion.div
                variants={staggerContainer}
                className="grid gap-8 sm:grid-cols-2"
            >
                {sections.map((section, index) => (
                    <motion.div
                        key={section.title}
                        variants={fadeInUp}
                        whileHover={{ scale: 1.02 }}
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
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
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
                                <span className="flex items-center text-neutral-800">
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
                                </span>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default LabelPage;
