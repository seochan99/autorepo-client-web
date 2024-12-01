'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactElement } from 'react';

const TermsPage = (): ReactElement => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gradient-to-b from-neutral-50 to-white px-4 py-16"
        >
            <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-xl"
            >
                <div className="mb-8">
                    <h1 className="mb-4 text-3xl font-bold text-neutral-900">
                        이용약관
                    </h1>
                    <p className="text-neutral-600">
                        최종 수정일: {new Date().toLocaleDateString()}
                    </p>
                </div>

                <div className="space-y-8">
                    <section>
                        <h2 className="mb-4 text-xl font-semibold text-neutral-800">
                            1. 서비스 이용 약관
                        </h2>
                        <p className="text-neutral-600">
                            `서비스`를 이용함으로써 본 약관에 동의하는 것으로
                            간주됩니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-4 text-xl font-semibold text-neutral-800">
                            2. GitHub 계정 연동
                        </h2>
                        <p className="text-neutral-600">
                            본 서비스는 GitHub 계정 연동을 통해 제공됩니다.
                            사용자는 GitHub 계정의 특정 권한을 AutoRepo에
                            허용해야 하며, 이는 서비스 제공을 위한 필수
                            조건입니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-4 text-xl font-semibold text-neutral-800">
                            3. 개인정보 보호
                        </h2>
                        <p className="text-neutral-600">
                            당사는 사용자의 개인정보를 소중히 여기며, GitHub에서
                            제공받은 정보는 서비스 제공 목적으로만 사용됩니다.
                            자세한 내용은 개인정보 처리방침을 참고해 주시기
                            바랍니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-4 text-xl font-semibold text-neutral-800">
                            4. 서비스 제한 사항
                        </h2>
                        <p className="text-neutral-600">
                            사용자는 다음과 같은 행위를 해서는 안 됩니다:
                        </p>
                        <ul className="mt-2 space-y-2 text-neutral-600">
                            <li>서비스의 정상적인 운영을 방해하는 행위</li>
                            <li>
                                다른 사용자의 GitHub 저장소에 무단으로 접근하는
                                행위
                            </li>
                            <li>악의적인 목적으로 서비스를 이용하는 행위</li>
                        </ul>
                    </section>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-12 flex justify-center"
                >
                    <Link
                        href="/"
                        className="rounded-lg bg-neutral-900 px-6 py-3 text-white transition-colors hover:bg-neutral-800"
                    >
                        홈으로 돌아가기
                    </Link>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default TermsPage;
