'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ReactElement } from 'react';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
    onClose: () => void;
}

export const Toast = ({
    message,
    type,
    isVisible,
    onClose,
}: ToastProps): ReactElement => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2"
                >
                    <div
                        className={`rounded-lg px-6 py-3 shadow-lg ${
                            type === 'success'
                                ? 'bg-neutral-900 text-white'
                                : 'bg-neutral-800 text-white'
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            {type === 'success' ? (
                                <svg
                                    className="size-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="size-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                            {message}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
