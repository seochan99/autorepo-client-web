'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import {
    FiDownload,
    FiGithub,
    FiPlus,
    FiRefreshCw,
    FiTrash2,
} from 'react-icons/fi';

import { labelService } from '@/shared/api/services/label';
import CSVModal from '@/shared/components/csv-modal';
import { Label } from '@/types/label';
import { generateRandomColor } from '@/utils/color';
// Lottie 동적 import
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import dynamic from 'next/dynamic';

import loadingAnimation from '../../../public/animations/github-animation.json';

const DEFAULT_LABELS: Record<string, Label[]> = {
    emoji: [
        { name: '🐛 bug', description: '버그 리포트', color: '#d73a4a' },
        { name: '✨ feature', description: '새로운 기능', color: '#0075ca' },
        { name: '📝 docs', description: '문서 작업', color: '#0075ca' },
        { name: '♻️ refactor', description: '코드 리팩토링', color: '#2b67c6' },
        { name: '🎨 style', description: '코드 스타일 변경', color: '#bf55ec' },
        { name: '⚡ performance', description: '성능 개선', color: '#f1c40f' },
    ],
    text: [
        { name: 'bug', description: '버그 리포트', color: '#d73a4a' },
        { name: 'feature', description: '새로운 기능', color: '#0075ca' },
        { name: 'documentation', description: '문서 관련', color: '#0075ca' },
        { name: 'enhancement', description: '개선사항', color: '#a2eeef' },
        { name: 'help wanted', description: '도움 필요', color: '#008672' },
        { name: 'question', description: '질문', color: '#d876e3' },
    ],
    custom: [
        { name: 'Label preview', description: '라벨 미리보기', color: '#000' },
    ],
    csv: [],
};

const LabelTypePage = (): ReactElement => {
    const params = useParams();
    const type = params?.type as string;
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [labels, setLabels] = useState<Label[]>(() => [
        ...(DEFAULT_LABELS[type] || []),
    ]);
    const [showCSVModal, setShowCSVModal] = useState(false);
    const [activeColorPicker, setActiveColorPicker] = useState<number | null>(
        null,
    );
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const searchParams = useSearchParams();
    const selectedRepo = searchParams?.get('selectedRepo');
    const router = useRouter();

    useEffect(() => {
        if (type === 'csv') {
            setShowCSVModal(true);
        }
    }, [type]);

    const handleAddNewRow = () => {
        setLabels((prev) => [
            ...prev,
            { name: '', description: '', color: generateRandomColor() },
        ]);
    };

    const updateLabel = (index: number, field: keyof Label, value: string) => {
        setLabels((prev) =>
            prev.map((label, i) =>
                i === index ? { ...label, [field]: value } : label,
            ),
        );
    };

    const handleImportCSV = (importedLabels: Label[]) => {
        setLabels(importedLabels);
    };

    const handleExportCSV = () => {
        const headers = ['title', 'description', 'color'];
        const csvRows = [headers];

        labels.forEach((label) => {
            csvRows.push([label.name, label.description, label.color]);
        });

        const csvString = csvRows
            .map((row) => row.map((cell) => `"${cell}"`).join(','))
            .join('\n');

        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', 'autorepo_label.csv');
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleUpload = async () => {
        try {
            setShowConfirmModal(false);
            setIsUploading(true);

            await labelService.uploadLabels({
                repoUrl: `https://github.com/${selectedRepo}`,
                labelGenerateType: type.toUpperCase() as
                    | 'EMOJI'
                    | 'TEXT'
                    | 'CUSTOM'
                    | 'CSV',
                labels: labels.map((label) => ({
                    labelName: label.name,
                    color: label.color.replace('#', ''),
                    description: label.description,
                })),
            });

            router.push(
                `/done?type=label&repoUrl=https://github.com/${selectedRepo}`,
            );
        } catch (error) {
            console.error('Upload failed:', error);
            alert('업로드 중 오류가 발생했습니다.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white px-8 py-20">
            <div className="mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <h1 className="mb-4 bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-4xl font-bold text-transparent">
                        {type === 'emoji' && '이모지 라벨 시작하기'}
                        {type === 'text' && '텍스트 라벨 시작하기'}
                        {type === 'custom' && '처음부터 라벨 만들기'}
                        {type === 'csv' && 'CSV로 라벨 만들기'}
                    </h1>
                    <p className="text-lg text-neutral-600">
                        프로젝트에 맞는 라벨을 생성하고 관리해보세요
                    </p>
                </motion.div>

                <div className="space-y-8 rounded-2xl bg-white p-8 shadow-lg">
                    <div className="grid grid-cols-12 gap-4 rounded-lg bg-neutral-50 px-6 py-4 text-sm font-medium text-neutral-700">
                        <div className="col-span-2">라벨 미리보기</div>
                        <div className="col-span-2">이름</div>
                        <div className="col-span-5">설명</div>
                        <div className="col-span-2">색상</div>
                        <div className="col-span-1 text-right">액션</div>
                    </div>

                    <AnimatePresence mode="popLayout">
                        {labels.map((label, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                                layout
                                className="grid grid-cols-12 items-center gap-4 border-b px-6 py-4 last:border-0"
                            >
                                <div className="col-span-2">
                                    <span
                                        className="inline-block rounded-full px-3 py-1 text-sm font-medium"
                                        style={{
                                            backgroundColor: label.color,
                                            color: '#fff',
                                        }}
                                    >
                                        {label.name || 'Label preview'}
                                    </span>
                                </div>
                                <div className="col-span-2">
                                    <input
                                        type="text"
                                        value={label.name}
                                        onChange={(e) =>
                                            updateLabel(
                                                index,
                                                'name',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="라벨 이름"
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="col-span-5">
                                    <input
                                        type="text"
                                        value={label.description}
                                        onChange={(e) =>
                                            updateLabel(
                                                index,
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="설명"
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="col-span-2 flex items-center gap-2">
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setActiveColorPicker(
                                                    activeColorPicker === index
                                                        ? null
                                                        : index,
                                                )
                                            }
                                            className="flex items-center gap-2 rounded-lg border border-gray-200 p-2 hover:border-gray-300"
                                        >
                                            <div
                                                className="size-6 rounded-md"
                                                style={{
                                                    backgroundColor:
                                                        label.color,
                                                }}
                                            />
                                            <span className="text-sm font-medium">
                                                {label.color.toUpperCase()}
                                            </span>
                                            <FiRefreshCw
                                                className="ml-1 text-gray-400 hover:text-gray-600"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    updateLabel(
                                                        index,
                                                        'color',
                                                        generateRandomColor(),
                                                    );
                                                }}
                                            />
                                        </button>

                                        {activeColorPicker === index && (
                                            <div className="absolute left-0 top-full z-10 mt-2">
                                                <div className="rounded-lg bg-white p-3 shadow-xl">
                                                    <HexColorPicker
                                                        color={label.color}
                                                        onChange={(color) =>
                                                            updateLabel(
                                                                index,
                                                                'color',
                                                                color,
                                                            )
                                                        }
                                                    />
                                                    <div className="mt-3 flex items-center gap-2">
                                                        <div
                                                            className="size-6 rounded-md"
                                                            style={{
                                                                backgroundColor:
                                                                    label.color,
                                                            }}
                                                        />
                                                        <input
                                                            type="text"
                                                            value={label.color}
                                                            onChange={(e) =>
                                                                updateLabel(
                                                                    index,
                                                                    'color',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="w-24 rounded-md border border-gray-200 px-2 py-1 text-sm"
                                                            placeholder="#000000"
                                                        />
                                                    </div>
                                                    <div className="mt-3 grid grid-cols-8 gap-1">
                                                        {[
                                                            '#d73a4a',
                                                            '#0075ca',
                                                            '#2b67c6',
                                                            '#bf55ec',
                                                            '#f1c40f',
                                                            '#008672',
                                                            '#d876e3',
                                                            '#a2eeef',
                                                            '#e99695',
                                                            '#fbca04',
                                                            '#b60205',
                                                            '#5319e7',
                                                            '#0e8a16',
                                                            '#006b75',
                                                            '#1d76db',
                                                            '#0052cc',
                                                        ].map((color) => (
                                                            <button
                                                                key={color}
                                                                onClick={() =>
                                                                    updateLabel(
                                                                        index,
                                                                        'color',
                                                                        color,
                                                                    )
                                                                }
                                                                className="size-6 rounded-md transition-transform hover:scale-110"
                                                                style={{
                                                                    backgroundColor:
                                                                        color,
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-span-1 text-right">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() =>
                                            setLabels((prev) =>
                                                prev.filter(
                                                    (_, i) => i !== index,
                                                ),
                                            )
                                        }
                                        className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
                                        title="라벨 삭제"
                                    >
                                        <FiTrash2 className="size-5" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {type === 'csv' && showCSVModal && (
                        <CSVModal
                            onClose={() => setShowCSVModal(false)}
                            onImport={handleImportCSV}
                        />
                    )}

                    <div className="flex justify-between border-t border-neutral-200 pt-6">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleAddNewRow}
                            className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-6 py-3 font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
                            layout
                        >
                            <FiPlus className="size-5" />새 라벨 추가
                        </motion.button>
                        <div className="flex gap-3">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleExportCSV}
                                className="flex items-center gap-2 rounded-xl bg-neutral-800 px-6 py-3 font-medium text-white transition-colors hover:bg-neutral-700"
                            >
                                <FiDownload className="size-5" />
                                CSV로 추출
                            </motion.button>
                            <div className="group relative">
                                <motion.button
                                    whileHover={{
                                        scale: selectedRepo ? 1.02 : 1,
                                    }}
                                    whileTap={{
                                        scale: selectedRepo ? 0.98 : 1,
                                    }}
                                    onClick={() =>
                                        selectedRepo &&
                                        setShowConfirmModal(true)
                                    }
                                    className={`flex items-center gap-2 rounded-xl px-6 py-3 font-medium text-white transition-all ${
                                        selectedRepo
                                            ? 'bg-neutral-900 hover:bg-neutral-800'
                                            : 'cursor-not-allowed bg-neutral-400'
                                    }`}
                                >
                                    <FiGithub className="size-5" />
                                    GitHub에 추가
                                </motion.button>
                                {!selectedRepo && (
                                    <div className="absolute left-1/2 top-full mt-2 hidden w-[200px] -translate-x-1/2 rounded-lg bg-neutral-800 px-4 py-2 text-sub1 text-white opacity-0 shadow-lg transition-opacity group-hover:block group-hover:opacity-100">
                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-b-neutral-800"></div>
                                        레포지토리를 선택하시면 깃허브에 바로
                                        추가가 가능해요!
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 컨펌 모달 */}
            <AnimatePresence>
                {showConfirmModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
                        >
                            <h2 className="mb-4 text-xl font-semibold text-neutral-900">
                                라벨 업로드 확인
                            </h2>
                            <p className="mb-2 text-neutral-600">
                                기존의 모든 라벨이 삭제되고 새로운 라벨로
                                업데이트됩니다.
                            </p>
                            <p className="mb-6 text-neutral-600">
                                계속 진행하시겠습니까?
                            </p>
                            <div className="flex justify-end gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setShowConfirmModal(false)}
                                    className="rounded-lg border border-gray-300 px-4 py-2 text-neutral-700 hover:bg-gray-50"
                                >
                                    취소
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleUpload}
                                    className="rounded-lg bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800"
                                >
                                    확인
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 업로드 중 로딩 모달 */}
            <AnimatePresence>
                {isUploading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    >
                        <div className="rounded-2xl bg-white p-8 text-center">
                            <div className="mb-4 w-32">
                                <Lottie
                                    animationData={loadingAnimation}
                                    loop={true}
                                />
                            </div>
                            <h3 className="text-lg font-medium text-neutral-900">
                                라벨 업로드 중...
                            </h3>
                            <p className="mt-2 text-neutral-600">
                                AutoRepoCat이 라벨을 업로드하고 있어요!
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LabelTypePage;
