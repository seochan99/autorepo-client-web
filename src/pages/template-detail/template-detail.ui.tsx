'use client';

import { motion } from 'framer-motion';
import { useParams, useSearchParams } from 'next/navigation';
import { ReactElement, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import { templateService } from '@/shared/api/services/template';

interface TemplateDetail {
    id: number;
    type: 'ISSUE' | 'PR' | 'README';
    title: string;
    content: string;
}

const TemplateDetailPage = (): ReactElement => {
    const params = useParams();
    const searchParams = useSearchParams();
    const id = params?.id?.toString() || '';
    const type = searchParams?.get('type') || '';
    const [template, setTemplate] = useState<TemplateDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTemplate = async () => {
            try {
                const response = await templateService.getTemplateDetail(
                    id,
                    type,
                );
                setTemplate(response.data.data);
            } catch (error) {
                console.error('Failed to fetch template:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id && type) {
            fetchTemplate();
        }
    }, [id, type]);

    const handleDownload = () => {
        if (!template) return;

        const blob = new Blob([template.content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${template.title}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="size-32 animate-spin rounded-full border-y-2 border-neutral-900"></div>
            </div>
        );
    }

    if (!template) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-lg text-neutral-600">
                    템플릿을 찾을 수 없습니다.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white px-4 py-20">
            <div className="mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="mb-4 flex items-center gap-4">
                        <span className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-600">
                            {template.type}
                        </span>
                    </div>
                    <h1 className="mb-4 text-4xl font-bold text-neutral-900">
                        {template.title}
                    </h1>
                    <p className="text-lg text-neutral-600">
                        이 템플릿을 사용하여 프로젝트의 {template.type}를 더
                        효율적으로 관리하세요.
                    </p>
                </motion.div>

                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="rounded-2xl bg-white p-8 shadow-lg"
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-neutral-900">
                                템플릿 미리보기
                            </h2>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={handleDownload}
                                    className="flex items-center gap-2 rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-200"
                                >
                                    <svg
                                        className="size-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                        />
                                    </svg>
                                    마크다운 다운로드
                                </button>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            template.content,
                                        );
                                        alert(
                                            '템플릿이 클립보드에 복사되었습니다.',
                                        );
                                    }}
                                    className="flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                                >
                                    <svg
                                        className="size-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                                        />
                                    </svg>
                                    복사하기
                                </button>
                            </div>
                        </div>
                        <div className="overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50">
                            <div className="border-b border-neutral-200 bg-white px-4 py-2">
                                <div className="flex space-x-2">
                                    <div className="size-3 rounded-full bg-red-500"></div>
                                    <div className="size-3 rounded-full bg-yellow-500"></div>
                                    <div className="size-3 rounded-full bg-green-500"></div>
                                </div>
                            </div>
                            <div className="prose prose-neutral max-w-none p-6">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
                                >
                                    {template.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="rounded-2xl bg-white p-8 shadow-lg"
                    >
                        <h2 className="mb-4 text-xl font-semibold text-neutral-900">
                            사용 방법
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-sm font-medium text-neutral-600">
                                    1
                                </span>
                                <p className="text-neutral-600">
                                    우측 상단의 &lsquo;복사하기&rsquo; 버튼을
                                    클릭하여 템플릿 내용을 복사합니다.
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-sm font-medium text-neutral-600">
                                    2
                                </span>
                                <p className="text-neutral-600">
                                    GitHub 저장소에서 새로운 {template.type}를
                                    생성합니다.
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-sm font-medium text-neutral-600">
                                    3
                                </span>
                                <p className="text-neutral-600">
                                    복사한 템플릿을 붙여넣고 필요에 맞게
                                    수정하여 사용합니다.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default TemplateDetailPage;
