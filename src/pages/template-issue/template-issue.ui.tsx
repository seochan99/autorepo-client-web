'use client';

import { Dialog, Tab } from '@headlessui/react';
import { templateService } from '@shared/api/services/template';
import { motion } from 'framer-motion';
import { ReactElement, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';

import { Toast } from '@/shared/components/toast/toast';
import { Tooltip } from '@/shared/components/tooltip';

import loadingAnimation from '../../../public/animations/github-animation.json';

interface Template {
    templateId: number;
    title: string;
    content: string;
}

interface ApiError {
    response?: {
        status?: number;
        data?: {
            message?: string;
        };
    };
}

const TemplateIssuePage = (): ReactElement => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedTab, setSelectedTab] = useState('issue');
    const [selectedTemplate, setSelectedTemplate] = useState(0);
    const [issueTemplates, setIssueTemplates] = useState<Template[]>([]);
    const [prTemplates, setPrTemplates] = useState<Template[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [templateTitle, setTemplateTitle] = useState('');
    const [toast, setToast] = useState<{
        message: string;
        type: 'success' | 'error';
        isVisible: boolean;
    }>({
        message: '',
        type: 'success',
        isVisible: false,
    });
    const [isNewTemplate, setIsNewTemplate] = useState(false);
    const [newTemplate, setNewTemplate] = useState({
        title: '',
        content:
            selectedTab === 'issue'
                ? '## 이슈 제목\n\n## 설명\n\n## 할 일\n- [ ] '
                : '## PR 제목\n\n## 변경사항\n\n## 테스트\n- [ ] ',
    });

    useEffect(() => {
        const selectedRepo = searchParams?.get('selectedRepo');
        if (selectedRepo) {
            const repoName = selectedRepo.split('/')[1].replace(/-/g, ' ');
            setNewTemplate((prev) => ({
                ...prev,
                title: repoName,
            }));
        }
    }, [searchParams]);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const repoUrl =
                    new URLSearchParams(window.location.search).get(
                        'repoUrl',
                    ) || '';

                // ISSUE 템플릿 가져오기
                const response = await templateService.getTemplates(
                    'ISSUE',
                    repoUrl,
                );
                setIssueTemplates(
                    response.data.data.map((item) => ({
                        templateId: item.templateId,
                        title: item.title,
                        content: item.content,
                    })),
                );

                // PR 템플릿 가져오기
                const prResponse = await templateService.getTemplates(
                    'PR',
                    repoUrl,
                );
                setPrTemplates(
                    prResponse.data.data.map((item) => ({
                        templateId: item.templateId,
                        title: item.title,
                        content: item.content,
                    })),
                );
            } catch (error) {
                console.error('Failed to fetch templates:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTemplates();
    }, []);

    const handleUpload = async () => {
        setIsUploadModalOpen(true);
    };

    const handleConfirmUpload = async () => {
        setIsUploadModalOpen(false);
        setIsLoading(true);

        try {
            const selectedRepo =
                new URLSearchParams(window.location.search).get(
                    'selectedRepo',
                ) || '';
            const repoUrl = `https://github.com/${selectedRepo}`;
            const content = isNewTemplate
                ? newTemplate.content
                : templates[selectedTemplate]?.content;

            if (!content) {
                showToast('템플릿 내용을 입력해주세요.', 'error');
                return;
            }

            await templateService.uploadTemplate({
                repoUrl,
                type: selectedTab.toUpperCase(),
                content,
            });

            // 성공 시 Done 페이지로 이동
            router.push('/done?type=template&action=upload');
        } catch (error: unknown) {
            const err = error as ApiError;
            console.error('Upload failed:', err);
            const errorMessage =
                err.response?.data?.message || '업로드 중 오류가 발생했습니다.';
            showToast(errorMessage, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleShare = async () => {
        if (!templateTitle.trim()) {
            showToast('제목을 입력해주세요.', 'error');
            return;
        }

        setIsLoading(true);
        try {
            const selectedRepo =
                new URLSearchParams(window.location.search).get(
                    'selectedRepo',
                ) || '';
            const repoUrl = `https://github.com/${selectedRepo}`;
            const content = isNewTemplate
                ? newTemplate.content
                : templates[selectedTemplate]?.content;

            if (!content) {
                showToast('템플릿 내용을 입력해주세요.', 'error');
                return;
            }

            await templateService.shareTemplate({
                repoUrl,
                type: selectedTab.toUpperCase(),
                title: templateTitle,
                content,
            });

            router.push(
                `/done?type=template&action=share&repoUrl=${selectedRepo}`,
            );
        } catch (error) {
            console.error('Share failed:', error);
            showToast('공유 중 오류가 발생했습니다.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const templates = selectedTab === 'issue' ? issueTemplates : prTemplates;

    const handleTemplateSelect = (index: number) => {
        setSelectedTemplate(index);
        setIsNewTemplate(false);
    };

    const handleCreateNewTemplate = () => {
        setIsNewTemplate(true);
        setSelectedTemplate(-1);
        setNewTemplate({
            title: '',
            content:
                selectedTab === 'issue'
                    ? '## 이슈 제목\n\n## 설명\n\n## 할 일\n- [ ] '
                    : '## PR 제목\n\n## 변경사항\n\n## 테스트\n- [ ] ',
        });
    };

    const handleTabChange = (tabIndex: number) => {
        const tab = tabIndex === 0 ? 'issue' : 'pr';
        setSelectedTab(tab);
        setSelectedTemplate(0);
        setIsNewTemplate(false);
    };

    const updateTemplateContent = (content: string) => {
        if (selectedTab === 'issue') {
            const newTemplates = [...issueTemplates];
            newTemplates[selectedTemplate].content = content;
            setIssueTemplates(newTemplates);
        } else {
            const newTemplates = [...prTemplates];
            newTemplates[selectedTemplate].content = content;
            setPrTemplates(newTemplates);
        }
    };

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type, isVisible: true });
        setTimeout(() => {
            setToast((prev) => ({ ...prev, isVisible: false }));
        }, 3000);
    };

    // 레포 URL 존재 여부 확인
    const selectedRepo = new URLSearchParams(window.location.search).get(
        'selectedRepo',
    );
    const hasRepo = Boolean(selectedRepo);

    // 클립보드 복사 함수 추가
    const handleCopy = () => {
        const currentTemplate = templates[selectedTemplate];
        if (currentTemplate?.content) {
            navigator.clipboard.writeText(currentTemplate.content);
            showToast('템플릿이 클립보드에 복사되었습니다.', 'success');
        }
    };

    return (
        <motion.div
            initial="initial"
            animate="animate"
            className="flex min-h-screen bg-gray-50"
        >
            {/* 좌측 사이드바 */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="w-1/4 border-r border-gray-200 bg-white p-6 shadow-sm"
            >
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">
                        템플릿 선택
                    </h2>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCreateNewTemplate}
                        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${
                            isNewTemplate
                                ? 'bg-neutral-900 text-white'
                                : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
                        }`}
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
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        새 템플릿
                    </motion.button>
                </div>
                <Tab.Group
                    selectedIndex={selectedTab === 'issue' ? 0 : 1}
                    onChange={handleTabChange}
                >
                    <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
                        <Tab
                            className={({ selected }) =>
                                `w-1/2 rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-200 ${
                                    selected
                                        ? 'bg-white text-neutral-900 shadow'
                                        : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
                                }`
                            }
                        >
                            Issue 템플릿
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                `w-1/2 rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-200 ${
                                    selected
                                        ? 'bg-white text-neutral-900 shadow'
                                        : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
                                }`
                            }
                        >
                            PR 템플릿
                        </Tab>
                    </Tab.List>
                    <Tab.Panels className="mt-4">
                        <Tab.Panel className="space-y-2">
                            {issueTemplates.map((template, index) => (
                                <motion.button
                                    key={index}
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => handleTemplateSelect(index)}
                                    className={`w-full rounded-lg p-3 text-left transition-all duration-200 ${
                                        !isNewTemplate &&
                                        selectedTemplate === index
                                            ? 'bg-neutral-900 text-white shadow-md'
                                            : 'bg-white hover:bg-gray-50'
                                    }`}
                                >
                                    <span className="block font-medium">
                                        {template.title}
                                    </span>
                                </motion.button>
                            ))}
                        </Tab.Panel>
                        <Tab.Panel className="space-y-2">
                            {prTemplates.map((template, index) => (
                                <motion.button
                                    key={index}
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => handleTemplateSelect(index)}
                                    className={`w-full rounded-lg p-3 text-left transition-all duration-200 ${
                                        !isNewTemplate &&
                                        selectedTemplate === index
                                            ? 'bg-neutral-900 text-white shadow-md'
                                            : 'bg-white hover:bg-gray-50'
                                    }`}
                                >
                                    <span className="block font-medium">
                                        {template.title}
                                    </span>
                                </motion.button>
                            ))}
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </motion.div>

            {/* 우측 본문 */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex w-3/4 flex-col p-8"
            >
                <div className="mb-8 flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex-1"
                    >
                        <h1 className="mb-4 text-3xl font-bold text-neutral-900">
                            템플릿을 더 빠르고 쉽게 생성해보세요
                        </h1>
                        <p className="text-lg text-neutral-600">
                            템플릿 생성부터 깃허브 업로드까지 한 번에 해결!
                        </p>
                    </motion.div>

                    {/* 업로드 버 */}
                    <div className="flex items-center gap-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleCopy}
                            className="flex items-center gap-2 rounded-lg bg-neutral-700 px-6 py-3 font-medium text-white transition-colors hover:bg-neutral-600"
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
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsShareModalOpen(true)}
                            className="flex items-center gap-2 rounded-lg bg-neutral-800 px-6 py-3 font-medium text-white transition-colors hover:bg-neutral-700"
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
                                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                />
                            </svg>
                            공유하기
                        </motion.button>

                        <Tooltip
                            content={
                                hasRepo
                                    ? ''
                                    : '레포를 선택해야 깃허브 업로드가 가능합니다'
                            }
                        >
                            <motion.button
                                whileHover={
                                    hasRepo ? { scale: 1.05 } : undefined
                                }
                                whileTap={hasRepo ? { scale: 0.95 } : undefined}
                                onClick={hasRepo ? handleUpload : undefined}
                                className={`flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-white transition-colors ${
                                    hasRepo
                                        ? 'bg-neutral-900 hover:bg-neutral-800'
                                        : 'cursor-not-allowed bg-neutral-400'
                                }`}
                                disabled={!hasRepo}
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
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                    />
                                </svg>
                                GitHub에 업로드
                            </motion.button>
                        </Tooltip>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex h-[calc(100vh-300px)] items-center justify-center">
                        <div className="size-32 animate-spin rounded-full border-y-2 border-neutral-900"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-6">
                        {/* 에디터 */}
                        <div className="rounded-lg bg-white p-4 shadow-sm">
                            <h2 className="mb-4 text-lg font-semibold text-neutral-800">
                                편집
                            </h2>
                            <textarea
                                className="h-[calc(100vh-300px)] w-full rounded-lg border border-gray-200 p-4 font-mono text-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                                value={
                                    isNewTemplate
                                        ? newTemplate.content
                                        : templates[selectedTemplate]?.content
                                }
                                onChange={(e) =>
                                    isNewTemplate
                                        ? setNewTemplate({
                                              ...newTemplate,
                                              content: e.target.value,
                                          })
                                        : updateTemplateContent(e.target.value)
                                }
                                placeholder={
                                    isNewTemplate
                                        ? '템플릿 내용을 입력하세요...'
                                        : ''
                                }
                            />
                        </div>

                        {/* 프리뷰 */}
                        <div className="rounded-lg bg-white p-4 shadow-sm">
                            <h2 className="mb-4 text-lg font-semibold text-neutral-800">
                                미리보기
                            </h2>
                            <div className="prose prose-sm h-[calc(100vh-300px)] max-w-none overflow-y-auto rounded-lg bg-gray-50 p-4">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
                                    className="markdown-preview"
                                >
                                    {isNewTemplate
                                        ? newTemplate.content
                                        : templates[selectedTemplate]?.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>

            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-32">
                        <Lottie animationData={loadingAnimation} loop />
                    </div>
                </div>
            )}

            <Dialog
                open={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6">
                        <Dialog.Title className="text-lg font-medium">
                            템플릿 업로드
                        </Dialog.Title>
                        <p className="mt-2 text-neutral-600">
                            정말 업로드하시겠습니까?
                        </p>
                        <div className="mt-4 flex justify-end gap-3">
                            <button
                                className="rounded-lg px-4 py-2 text-neutral-600 hover:bg-neutral-100"
                                onClick={() => setIsUploadModalOpen(false)}
                            >
                                취소
                            </button>
                            <button
                                className="rounded-lg bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800"
                                onClick={handleConfirmUpload}
                            >
                                확인
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>

            <Dialog
                open={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl">
                        <div className="mb-6 text-center">
                            <div className="mb-4 inline-flex rounded-full bg-neutral-100 p-3">
                                <svg
                                    className="size-6 text-neutral-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                    />
                                </svg>
                            </div>
                            <Dialog.Title className="text-2xl font-semibold text-neutral-900">
                                템플릿 공유하기
                            </Dialog.Title>
                            <p className="mt-2 text-neutral-600">
                                다른 사용자들과 템플릿을 공유해보세요
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700">
                                    템플릿 제목
                                </label>
                                <input
                                    type="text"
                                    placeholder="다른 사용자들이 알아보기 쉬운 제목을 입력해주세요"
                                    className="mt-1 w-full rounded-lg border border-neutral-200 p-3 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
                                    value={templateTitle}
                                    onChange={(e) =>
                                        setTemplateTitle(e.target.value)
                                    }
                                />
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    className="rounded-lg px-6 py-3 text-neutral-600 hover:bg-neutral-50"
                                    onClick={() => setIsShareModalOpen(false)}
                                >
                                    취소
                                </button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleShare}
                                    className="rounded-lg bg-neutral-900 px-6 py-3 font-medium text-white hover:bg-neutral-800"
                                >
                                    공유하기
                                </motion.button>
                            </div>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>

            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={() =>
                    setToast((prev) => ({ ...prev, isVisible: false }))
                }
            />
        </motion.div>
    );
};

export default TemplateIssuePage;
