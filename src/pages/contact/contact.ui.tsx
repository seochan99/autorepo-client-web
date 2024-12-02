'use client';

import { motion } from 'framer-motion';
import { ReactElement, useState } from 'react';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
};

const ContactPage = (): ReactElement => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsLoading(false);
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });

        setTimeout(() => {
            setIsSuccess(false);
        }, 3000);
    };

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
                    문의하기
                </motion.h1>
                <motion.div
                    variants={fadeInUp}
                    className="relative rounded-xl bg-white p-8 shadow-lg"
                >
                    {isSuccess && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 rounded-lg bg-green-100 p-4 text-green-700"
                        >
                            메시지가 성공적으로 전송되었습니다!
                        </motion.div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-neutral-700"
                            >
                                이름
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                className="mt-1 block w-full rounded-md border border-neutral-300 px-4 py-2 shadow-sm focus:border-neutral-500 focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-neutral-700"
                            >
                                이메일
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                className="mt-1 block w-full rounded-md border border-neutral-300 px-4 py-2 shadow-sm focus:border-neutral-500 focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-neutral-700"
                            >
                                메시지
                            </label>
                            <textarea
                                id="message"
                                value={formData.message}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        message: e.target.value,
                                    })
                                }
                                rows={5}
                                className="mt-1 block w-full rounded-md border border-neutral-300 px-4 py-2 shadow-sm focus:border-neutral-500 focus:outline-none"
                                required
                            />
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded-lg bg-neutral-900 px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg
                                        className="mr-2 size-5 animate-spin"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="none"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    전송 중...
                                </span>
                            ) : (
                                '보내기'
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ContactPage;
