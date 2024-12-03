'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReactElement } from 'react';
// Lottie 동적 import
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import loadingAnimation from '../../../public/animations/github-animation.json';
const DonePage = (): ReactElement => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const type = searchParams?.get('type') ?? '';
    const action = searchParams?.get('action') ?? '';
    const repoUrl = searchParams?.get('repoUrl') ?? '';

    const getMessage = () => {
        switch (`${type}-${action}`) {
            case 'template-upload':
                return '템플릿이 성공적으로 업로드되었습니다!';
            case 'template-share':
                return '템플릿이 성공적으로 공유되었습니다!';
            case 'label-upload':
                return '라벨이 성공적으로 업로드되었습니다!';
            case 'readme-upload':
                return 'README가 성공적으로 업로드되었습니다!';
            default:
                return '작업이 완료되었습니다!';
        }
    };

    const getGitHubUrl = () => {
        if (!repoUrl) return '';
        const baseUrl = `https://github.com/${repoUrl}`;

        switch (type) {
            case 'label':
                return `${baseUrl}/labels`;
            case 'template':
                return `${baseUrl}/issues/new/choose`;
            case 'readme':
                return `${baseUrl}#readme`;
            default:
                return baseUrl;
        }
    };

    const getButtonText = () => {
        switch (type) {
            case 'label':
                return '라벨 확인하기';
            case 'template':
                return '이슈/PR 생성하기';
            case 'readme':
                return 'README 확인하기';
            default:
                return 'GitHub에서 확인하기';
        }
    };

    const getNextActions = () => {
        if (!repoUrl) return null;

        const actions = [
            {
                title: '라벨 만들기',
                description:
                    '이슈를 체계적으로 관리하기 위한 라벨을 생성해보세요',
                icon: (
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
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                    </svg>
                ),
                href: `/select-repo/label?selectedRepo=${repoUrl}`,
            },
            {
                title: '이슈 템플릿 만들기',
                description: '일관된 이슈 작성을 위한 템플릿을 만들어보세요',
                icon: (
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
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                        />
                    </svg>
                ),
                href: `/template-issue?selectedRepo=${repoUrl}`,
            },
            {
                title: 'PR 템플릿 만들기',
                description:
                    '효율적인 코드 리뷰를 위한 PR 템플릿을 만들어보세요',
                icon: (
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
                            d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                        />
                    </svg>
                ),
                href: `/template-issue?selectedRepo=${repoUrl}`,
            },
            {
                title: 'README 작성하기',
                description: '프로젝트를 소개하는 README를 작성해보세요',
                icon: (
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
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                    </svg>
                ),
                href: `/read-me?selectedRepo=${repoUrl}`,
            },
        ];

        // 현재 작업에 따라 다음 작업 필터링
        let filteredActions = [...actions];
        switch (type) {
            case 'label':
                filteredActions = actions.filter(
                    (a) => !a.href.includes('label'),
                );
                break;
            case 'template':
                filteredActions = actions.filter(
                    (a) => !a.href.includes('template'),
                );
                break;
            case 'readme':
                filteredActions = actions.filter(
                    (a) => !a.href.includes('read-me'),
                );
                break;
        }

        return (
            <div className="my-8">
                <div className="mb-6 flex items-center gap-4">
                    <div className="h-px flex-1 bg-neutral-200" />
                    <span className="text-sm font-medium text-neutral-500">
                        다음 작업 둘러보기
                    </span>
                    <div className="h-px flex-1 bg-neutral-200" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {filteredActions.map((action, index) => (
                        <motion.a
                            key={index}
                            href={action.href}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex flex-col items-start gap-2 rounded-xl bg-white p-6 text-left shadow-sm transition-all hover:shadow-md"
                        >
                            <div className="rounded-lg bg-neutral-100 p-2 text-neutral-600">
                                {action.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-neutral-900">
                                {action.title}
                            </h3>
                            <p className="text-sm text-neutral-600">
                                {action.description}
                            </p>
                        </motion.a>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-neutral-50 to-white p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl text-center"
            >
                <div className="mx-auto mb-6 flex justify-center">
                    <div className="w-64">
                        <Lottie animationData={loadingAnimation} loop={true} />
                    </div>
                </div>
                <h1 className="mb-4 text-4xl font-bold text-neutral-900">
                    {getMessage()}
                </h1>
                <div className="mb-12 text-lg text-neutral-600">
                    {type === 'label' && '이제 이슈 템플릿을 만들어볼까요?'}
                    {type === 'template' && '이제 README를 작성해볼까요?'}
                    {type === 'readme' && '모든 설정이 완료되었습니다!'}
                    {!type && '다음 작업을 선택해주세요'}
                </div>

                {/* 버튼 그룹 */}
                <div className="space-y-4">
                    {/* GitHub 확인 버튼 */}
                    {repoUrl && (
                        <motion.a
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            href={getGitHubUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-8 py-4 text-lg font-medium text-white transition-all hover:bg-neutral-800"
                        >
                            <svg
                                className="size-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            {getButtonText()}
                        </motion.a>
                    )}

                    {/* 다음 작업 카드 */}
                    {getNextActions()}

                    {/* 네비게이션 버튼 */}
                    <div className="mt-8 flex justify-center gap-3">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => router.push('/')}
                            className="group flex items-center gap-2 rounded-lg bg-neutral-800 px-6 py-3 text-base font-medium text-white transition-all hover:bg-neutral-700"
                        >
                            <svg
                                className="size-5 transition-transform group-hover:-translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            홈으로 가기
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => router.back()}
                            className="group flex items-center gap-2 rounded-lg border border-neutral-200 px-6 py-3 text-base font-medium text-neutral-900 transition-all hover:border-neutral-300 hover:bg-neutral-50"
                        >
                            <svg
                                className="size-5 transition-transform group-hover:-translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            이전 페이지로
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default DonePage;
