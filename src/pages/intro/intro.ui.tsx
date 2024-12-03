'use client';

import { motion } from 'framer-motion';
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

const features = [
    {
        icon: '📝',
        title: 'README 자동 생성',
        description: '레포지토리 내용을 기반으로 자동으로 README를 생성합니다.',
    },
    {
        icon: '🎨',
        title: '커스텀 템플릿',
        description: '프로젝트에 맞는 다양한 커스터마이징 옵션을 제공합니다.',
    },
    {
        icon: '🔄',
        title: 'GitHub 연동',
        description:
            'GitHub와의 원활한 연동으로 메타데이터를 자동으로 가져옵니다.',
    },
    {
        icon: '🏷️',
        title: '라벨 생성',
        description:
            '프로젝트에 필요한 이슈 라벨을 자동으로 생성하고 관리합니다.',
    },
];

const IntroPage = (): ReactElement => {
    const router = useRouter();

    return (
        <motion.div
            initial="initial"
            animate="animate"
            className="min-h-screen bg-gradient-to-b from-neutral-50 to-white"
        >
            {/* 히어로 섹션 */}
            <div className="relative overflow-hidden py-20">
                <motion.div
                    variants={staggerContainer}
                    className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
                >
                    <motion.div variants={fadeInUp} className="text-center">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="mx-auto flex items-center justify-center gap-4"
                        >
                            <h1 className="bg-gradient-to-r from-neutral-800 to-neutral-900 bg-clip-text text-6xl font-bold text-transparent">
                                AutoRep
                            </h1>
                        </motion.div>
                        <motion.p
                            variants={fadeInUp}
                            className="mx-auto mt-6 max-w-2xl text-xl text-neutral-600"
                        >
                            <span className="block font-semibold text-neutral-900">
                                GitHub 프로젝트 초기 설정을 자동화하세요
                            </span>
                            README, 이슈 템플릿, 라벨까지 한 번에 설정하고
                            관리할 수 있습니다
                        </motion.p>
                        <motion.div
                            variants={fadeInUp}
                            className="mt-8 flex justify-center gap-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => router.push('/login')}
                                className="rounded-lg bg-neutral-900 px-8 py-3 font-medium text-white hover:bg-neutral-800"
                            >
                                시작하기
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() =>
                                    router.push('/template-dashboard')
                                }
                                className="rounded-lg border-2 border-neutral-200 px-8 py-3 font-medium text-neutral-700 hover:border-neutral-300"
                            >
                                템플릿 둘러보기
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* 기능 섹션 */}
            <motion.div
                variants={staggerContainer}
                className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8"
            >
                <motion.h2
                    variants={fadeInUp}
                    className="mb-12 text-center text-3xl font-bold text-neutral-900"
                >
                    AutoRep으로 할 수 있는 것들
                </motion.h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            whileHover={{ scale: 1.05 }}
                            className="rounded-xl bg-white p-8 text-center shadow-lg transition-all hover:shadow-xl"
                        >
                            <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-neutral-100 text-3xl">
                                {feature.icon}
                            </div>
                            <h3 className="mb-3 text-xl font-semibold text-neutral-900">
                                {feature.title}
                            </h3>
                            <p className="text-neutral-600">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* 사용 방법 섹션 */}
            <motion.section
                variants={fadeInUp}
                className="bg-neutral-900 py-20 text-white"
            >
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <h2 className="mb-12 text-center text-3xl font-bold">
                        간단한 3단계로 시작하세요
                    </h2>
                    <div className="grid gap-8 sm:grid-cols-3">
                        {[
                            {
                                step: '01',
                                title: 'GitHub 연동',
                                description:
                                    'GitHub 계정을 연결하여 시작하세요',
                            },
                            {
                                step: '02',
                                title: '레포지토리 선택',
                                description:
                                    '설정하고 싶은 레포지토리를 선택하세요',
                            },
                            {
                                step: '03',
                                title: '자동 설정',
                                description:
                                    '필요한 설정을 자동으로 생성합니다',
                            },
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                className="relative rounded-lg bg-neutral-800 p-6"
                            >
                                <div className="mb-4 text-4xl font-bold text-neutral-700">
                                    {step.step}
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">
                                    {step.title}
                                </h3>
                                <p className="text-neutral-400">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* 리소스 섹션 */}
            <motion.section
                variants={staggerContainer}
                className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8"
            >
                <div className="grid gap-6 sm:grid-cols-3">
                    {[
                        { icon: '📘', title: '이용 약관', link: '/terms' },
                        { icon: '🛠️', title: '만든이', link: '/members' },
                        { icon: '📞', title: '문의', link: '/contact' },
                    ].map((item, index) => (
                        <motion.a
                            key={index}
                            href={item.link}
                            variants={fadeInUp}
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center justify-center gap-3 rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg"
                        >
                            <span className="text-2xl">{item.icon}</span>
                            <span className="text-lg font-medium text-neutral-900">
                                {item.title}
                            </span>
                        </motion.a>
                    ))}
                </div>
            </motion.section>

            {/* 푸터 */}
            <motion.footer
                variants={fadeInUp}
                className="border-t border-neutral-200 py-8 text-center text-neutral-600"
            >
                <p>
                    &copy; {new Date().getFullYear()} AutoRep. 모든 권리 보유.
                </p>
            </motion.footer>
        </motion.div>
    );
};

export default IntroPage;
