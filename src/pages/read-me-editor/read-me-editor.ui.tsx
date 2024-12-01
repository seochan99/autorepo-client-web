'use client';

import Lottie from 'lottie-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReactElement, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

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
    const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const repoUrl = searchParams?.get('repoUrl') ?? '';

    useEffect(() => {
        const fetchGeneratedMarkdown = async () => {
            try {
                const response = await fetch('/api/readme/generate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        formData: JSON.parse(
                            searchParams?.get('formData') ?? '{}',
                        ),
                    }),
                });

                if (!response.ok) throw new Error('Failed to generate README');

                const data = await response.json();
                setMarkdown(data.markdown);
            } catch (error) {
                console.error('Error:', error);
                // 에러 처리
            } finally {
                // 5초 후에 로딩 상태 해제
                setTimeout(() => {
                    setIsLoading(false);
                }, 5000);
            }
        };

        fetchGeneratedMarkdown();
    }, [searchParams]);

    const handleUpload = async () => {
        setIsUploading(true);
        try {
            const response = await fetch('/api/readme/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    repoUrl,
                    content: markdown,
                }),
            });

            if (!response.ok) throw new Error('Failed to upload README');

            alert('README가 성공적으로 업로드되었습니다!');
            router.push('/');
        } catch (error) {
            console.error('Error:', error);
            alert('업로드 중 오류가 발생했습니다.');
        } finally {
            setIsUploading(false);
        }
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
                <button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="rounded-lg bg-neutral-900 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-neutral-800 disabled:bg-gray-400"
                >
                    {isUploading ? '업로드 중...' : 'GitHub에 업로드'}
                </button>
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
        </div>
    );
};

export default ReadMeEditorPage;
