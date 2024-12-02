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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 여기에 폼 제출 로직 구현
        console.log('Form submitted:', formData);
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
                    className="rounded-xl bg-white p-8 shadow-lg"
                >
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
                            className="w-full rounded-lg bg-neutral-900 px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-neutral-800"
                        >
                            보내기
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ContactPage;
