'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
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

const members = [
    {
        nickname: 'Jawoo(자우)',
        name: '문채영',
        role: 'BE, Data',
        major: '컴퓨터공학전공',
        studentId: '2021112037',
        image: '/images/person1.png',
    },
    {
        nickname: 'Noah(노아)',
        name: '노유래',
        role: 'FE, QA',
        major: '컴퓨터공학전공',
        studentId: '2021111961',
        image: '/images/person4.png',
    },
    {
        nickname: 'hanni(한니)',
        name: '송하연',
        role: 'BE, Data',
        major: '컴퓨터공학전공',
        studentId: '2021111945',
        image: '/images/person2.png',
    },
    {
        nickname: 'Seochan(서찬)',
        name: '서희찬',
        role: 'AI, FE',
        major: '컴퓨터공학전공',
        studentId: '2019112546',
        image: '/images/person3.png',
    },
];

const MembersPage = (): ReactElement => {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            className="min-h-screen bg-gradient-to-b from-neutral-50 to-white py-16"
        >
            <div className="mx-auto max-w-6xl px-4">
                <motion.h1
                    variants={fadeInUp}
                    className="mb-12 text-center text-4xl font-bold text-neutral-900"
                >
                    만든이
                </motion.h1>
                <motion.div
                    variants={staggerContainer}
                    className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {members.map((member, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="rounded-xl bg-white p-6 shadow-lg"
                        >
                            <div className="relative mx-auto mb-4 size-32 overflow-hidden rounded-full">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-semibold text-neutral-900">
                                    {member.nickname}
                                </h3>
                                <p className="mt-1 text-neutral-600">
                                    {member.name}
                                </p>
                                <p className="mt-2 font-medium text-neutral-700">
                                    {member.role}
                                </p>
                                <p className="mt-1 text-sm text-neutral-500">
                                    {member.major}
                                </p>
                                <p className="mt-1 text-sm text-neutral-500">
                                    {member.studentId}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default MembersPage;
