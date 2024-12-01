'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';

import { Label } from '@/types/label';

interface CSVModalProps {
    onClose: () => void;
    onImport: (data: Label[]) => void;
}

const CSVModal = ({ onClose, onImport }: CSVModalProps) => {
    const [error, setError] = useState('');

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            const lines = text.split('\n');
            const labels: Label[] = [];

            for (let i = 0; i < lines.length; i++) {
                const [name, description, color] = lines[i]
                    .split(',')
                    .map((item) => item.trim());
                if (!name || !color) continue;

                labels.push({
                    name,
                    description: description || '',
                    color: color.startsWith('#') ? color : `#${color}`,
                });
            }

            if (labels.length === 0) {
                setError('유효한 데이터가 없습니다.');
                return;
            }

            onImport(labels);
            onClose();
        };

        reader.readAsText(file);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                >
                    <FiX size={24} />
                </button>

                <h2 className="mb-4 text-xl font-semibold text-gray-900">
                    CSV 파일 업로드
                </h2>
                <p className="mb-6 text-sm text-gray-600">
                    CSV 파일은 다음 형식이어야 합니다:
                    <br />
                    name,description,color
                </p>

                <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="csvInput"
                    />
                    <label
                        htmlFor="csvInput"
                        className="flex cursor-pointer flex-col items-center"
                    >
                        <FiUpload className="mb-2 text-3xl text-gray-400" />
                        <span className="text-sm text-gray-600">
                            CSV 파일을 선택하거나 드래그하세요
                        </span>
                    </label>
                </div>

                {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            </motion.div>
        </motion.div>
    );
};

export default CSVModal;
