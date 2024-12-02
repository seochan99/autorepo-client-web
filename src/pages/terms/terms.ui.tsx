'use client';

import { motion } from 'framer-motion';
import { ReactElement } from 'react';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
};

const TermsPage = (): ReactElement => {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            className="min-h-screen bg-gradient-to-b from-neutral-50 to-white py-16"
        >
            <div className="mx-auto max-w-4xl px-4">
                <motion.h1
                    variants={fadeInUp}
                    className="mb-8 text-4xl font-bold text-neutral-900"
                >
                    이용 약관
                </motion.h1>
                <motion.div
                    variants={fadeInUp}
                    className="rounded-xl bg-white p-8 shadow-lg"
                >
                    <h2 className="mb-4 text-2xl font-semibold">
                        1. 서비스 이용약관
                    </h2>
                    <p className="mb-6 text-neutral-600">
                        본 약관은 AutoRep 서비스 이용에 관한 기본적인 사항을
                        규정합니다.
                    </p>

                    <h2 className="mb-4 text-2xl font-semibold">
                        2. 개인정보 처리방침
                    </h2>
                    <p className="mb-6 text-neutral-600">
                        사용자의 개인정보는 서비스 제공 목적으로만 사용되며,
                        관련 법령에 따라 안전하게 보호됩니다.
                    </p>

                    <h2 className="mb-4 text-2xl font-semibold">
                        3. GitHub 연동
                    </h2>
                    <p className="mb-6 text-neutral-600">
                        GitHub 계정 연동 시 필요한 최소한의 권한만을 요청하며,
                        사용자의 동의 하에 진행됩니다.
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default TermsPage;
