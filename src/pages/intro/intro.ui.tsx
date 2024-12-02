'use client';

import { motion } from 'framer-motion';
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
    return (
        <motion.div
            initial="initial"
            animate="animate"
            className="min-h-screen bg-gradient-to-b from-neutral-50 to-white py-16"
        >
            <motion.div
                variants={staggerContainer}
                className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
            >
                {/* 헤더 섹션 */}
                <motion.div variants={fadeInUp} className="text-center">
                    <motion.h1
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-r from-neutral-800 to-neutral-900 bg-clip-text text-5xl font-bold text-transparent"
                    >
                        🚀 AutoRep
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="mt-4 text-xl text-neutral-600"
                    >
                        프로젝트 문서화를 더 스마트하게
                    </motion.p>
                </motion.div>

                {/* 기능 그리드 */}
                <motion.div
                    variants={staggerContainer}
                    className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            whileHover={{ scale: 1.05 }}
                            className="rounded-xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl"
                        >
                            <div className="text-4xl">{feature.icon}</div>
                            <h3 className="mt-4 text-xl font-semibold text-neutral-900">
                                {feature.title}
                            </h3>
                            <p className="mt-2 text-neutral-600">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* 시작하기 섹션 */}
                <motion.section
                    variants={fadeInUp}
                    className="mt-20 rounded-2xl bg-neutral-900 p-8 text-white"
                >
                    <h2 className="text-3xl font-bold">시작하기</h2>
                    <p className="mt-4 text-lg text-neutral-200">
                        AutoRep을 사용하려면 GitHub 계정을 연결하고 원하는
                        레포지토리를 선택하세요. 자동으로 초기 README 파일을
                        생성해주며, 이후 자유롭게 커스터마이징할 수 있습니다.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 rounded-lg bg-white px-6 py-3 font-semibold text-neutral-900 shadow-lg transition-colors hover:bg-neutral-50"
                    >
                        지금 시작하기
                    </motion.button>
                </motion.section>

                {/* 리소스 섹션 */}
                <motion.section
                    variants={staggerContainer}
                    className="mt-20 grid gap-6 sm:grid-cols-3"
                >
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
                            className="flex items-center justify-center rounded-xl bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
                        >
                            <span className="mr-3 text-2xl">{item.icon}</span>
                            <span className="text-lg font-medium text-neutral-900">
                                {item.title}
                            </span>
                        </motion.a>
                    ))}
                </motion.section>

                {/* 푸터 */}
                <motion.footer
                    variants={fadeInUp}
                    className="mt-20 text-center text-neutral-600"
                >
                    <p>
                        &copy; {new Date().getFullYear()} AutoRep. 모든 권리
                        보유.
                    </p>
                </motion.footer>
            </motion.div>
        </motion.div>
    );
};

export default IntroPage;
