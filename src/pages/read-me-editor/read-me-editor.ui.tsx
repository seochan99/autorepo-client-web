'use client';

import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReactElement, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import { readmeService } from '@/shared/api/services/readme';
import { Toast } from '@/shared/components/toast/toast';
import { Tooltip } from '@/shared/components/tooltip';

import loadingAnimation from '../../../public/animations/loading.json';

interface ReadMeEditorProps {
    initialMarkdown?: string;
}

const DEFAULT_MARKDOWN = `# 프로젝트 이름

## 📝 프로젝트 소개
이 프로젝트는 사용자들이 더 쉽게 프로젝트를 이해하고 시작할 수 있도록 돕는 것을 목표로 합니다.

## 🛠 기술 스택

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)

## 👥 팀원 소개
- 홍길동 - 프론트엔드 개발
- 김철수 - 백엔드 개발
- 이영희 - UI/UX 디자인

## ⚙️ 설치 방법

\`\`\`bash
# 저장소 클론
git clone https://github.com/username/project-name.git

# 프로젝트 폴더로 이동
cd project-name

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
\`\`\`

## 📌 주요 기능
- 사용자 인증
- 실시간 데이터 동기화
- 반응형 디자인
- 다크 모드 지원

## 📄 라이센스
이 프로젝트는 MIT 라이센스를 따릅니다.
`;

const ReadMeEditorPage = (): ReactElement => {
    const [markdown, setMarkdown] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [toast, setToast] = useState<{
        message: string;
        type: 'success' | 'error';
        isVisible: boolean;
    }>({
        message: '',
        type: 'success',
        isVisible: false,
    });
    const hasRepo = !!searchParams?.get('selectedRepo');

    useEffect(() => {
        const markdownContent = searchParams?.get('markdown');
        if (markdownContent) {
            setMarkdown(decodeURIComponent(markdownContent));
        }
    }, [searchParams]);

    const handleUpload = async () => {
        setIsUploading(true);
        try {
            const selectedRepo = searchParams?.get('selectedRepo') || '';
            await readmeService.uploadReadme({
                repoUrl: `https://github.com/${selectedRepo}`,
                content: markdown,
            });

            router.push(
                `/done?type=readme&action=upload&repoUrl=${selectedRepo}`,
            );
        } catch (error) {
            console.error('Error:', error);
            alert('업로드 중 오류가 발생했습니다.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleDownload = () => {
        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'README.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type, isVisible: true });
        setTimeout(() => {
            setToast((prev) => ({ ...prev, isVisible: false }));
        }, 3000);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(markdown);
        showToast('클립보드에 복사되었습니다!', 'success');
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white">
                <div className="text-center">
                    <Lottie
                        animationData={loadingAnimation}
                        className="mx-auto size-40"
                    />
                    <p className="mt-4 text-lg font-medium text-gray-600">
                        README 생성 중...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-4xl font-bold text-gray-900">
                    README 편집하기
                </h1>
                <div className="flex gap-3">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCopy}
                        className="flex items-center gap-2 rounded-lg bg-neutral-700 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-neutral-600"
                    >
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
                                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                            />
                        </svg>
                        복사하기
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleDownload}
                        className="flex items-center gap-2 rounded-lg bg-neutral-800 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-neutral-700"
                    >
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
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                        </svg>
                        다운로드
                    </motion.button>
                    <Tooltip
                        content={
                            hasRepo
                                ? ''
                                : '레포지토리를 선택해야 GitHub에 업로드할 수 있습니다'
                        }
                    >
                        <motion.button
                            whileHover={
                                !isUploading && hasRepo
                                    ? { scale: 1.02 }
                                    : undefined
                            }
                            whileTap={
                                !isUploading && hasRepo
                                    ? { scale: 0.98 }
                                    : undefined
                            }
                            onClick={hasRepo ? handleUpload : undefined}
                            disabled={isUploading || !hasRepo}
                            className={`flex items-center gap-2 rounded-lg px-6 py-3 text-lg font-medium text-white transition-colors ${
                                hasRepo
                                    ? 'bg-neutral-900 hover:bg-neutral-800'
                                    : 'cursor-not-allowed bg-neutral-400'
                            } disabled:bg-gray-400`}
                        >
                            <svg
                                className={`size-5 ${
                                    isUploading ? 'animate-spin' : ''
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                />
                            </svg>
                            {isUploading ? '업로드 중...' : 'GitHub에 업로드'}
                        </motion.button>
                    </Tooltip>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* 에디터 */}
                <div className="rounded-lg bg-white p-4 shadow-lg">
                    <h2 className="mb-4 text-xl font-semibold text-gray-800">
                        마크다운 편집
                    </h2>
                    <textarea
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        className="h-[calc(100vh-300px)] w-full rounded-lg border border-gray-200 p-4 font-mono text-sm focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    />
                </div>

                {/* 프리뷰 */}
                <div className="rounded-lg bg-white p-4 shadow-lg">
                    <h2 className="mb-4 text-xl font-semibold text-gray-800">
                        미리보기
                    </h2>
                    <div className="prose prose-sm h-[calc(100vh-300px)] max-w-none overflow-y-auto rounded-lg bg-gray-50 p-4">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                        >
                            {markdown}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>

            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={() =>
                    setToast((prev) => ({ ...prev, isVisible: false }))
                }
            />
        </div>
    );
};

export default ReadMeEditorPage;
