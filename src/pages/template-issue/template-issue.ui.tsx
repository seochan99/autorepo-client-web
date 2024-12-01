'use client';

import { Tab } from '@headlessui/react';
import { templateService } from '@shared/api/services/template';
import { motion } from 'framer-motion';
import { ReactElement, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

interface Template {
    templateId: number;
    title: string;
    content: string;
}

const TemplateIssuePage = (): ReactElement => {
    const [selectedTab, setSelectedTab] = useState('issue');
    const [selectedTemplate, setSelectedTemplate] = useState(0);
    const [issueTemplates, setIssueTemplates] = useState<Template[]>([]);
    const [prTemplates, setPrTemplates] = useState<Template[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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
        try {
            const repoUrl =
                new URLSearchParams(window.location.search).get('repoUrl') ||
                '';
            const currentTemplate = templates[selectedTemplate];

            await templateService.uploadTemplate({
                repoUrl,
                type: selectedTab.toUpperCase(),
                content: currentTemplate.content,
            });

            alert('템플릿이 성공적으로 업로드되었습니다!');
        } catch (error) {
            console.error('Upload failed:', error);
            alert('업로드 중 오류가 발생했습니다.');
        }
    };

    const templates = selectedTab === 'issue' ? issueTemplates : prTemplates;

    const handleTabChange = (tabIndex: number) => {
        const tab = tabIndex === 0 ? 'issue' : 'pr';
        setSelectedTab(tab);
        setSelectedTemplate(0);
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
                <h2 className="mb-6 text-xl font-semibold text-gray-800">
                    템플릿 선택
                </h2>
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
                                    onClick={() => setSelectedTemplate(index)}
                                    className={`w-full rounded-lg p-3 text-left transition-all duration-200 ${
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
                                    onClick={() => setSelectedTemplate(index)}
                                    className={`w-full rounded-lg p-3 text-left transition-all duration-200 ${
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

                    {/* 업로드 버튼 */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleUpload}
                        className="flex items-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 font-medium text-white transition-colors hover:bg-neutral-800"
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
                                value={templates[selectedTemplate]?.content}
                                onChange={(e) =>
                                    updateTemplateContent(e.target.value)
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
                                    {templates[selectedTemplate]?.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default TemplateIssuePage;
