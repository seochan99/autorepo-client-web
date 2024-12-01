'use client';

import { Tab } from '@headlessui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement, useEffect, useState } from 'react';

import { Template } from '@/entities/template/model/types';
import { templateService } from '@/shared/api/services/template';

const TemplateCard = ({ template }: { template: Template }) => {
    const getTemplateLink = () => {
        return `/template-dashboard/${template.id}?type=${template.type}`;
    };

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="overflow-hidden rounded-xl bg-white shadow-lg transition-shadow hover:shadow-xl"
        >
            <Link href={getTemplateLink()}>
                <div className="relative h-[300px] w-[400px]">
                    {template.imageUrl ? (
                        <Image
                            src={template.imageUrl}
                            alt={template.title}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex size-full items-center justify-center bg-neutral-100">
                            <span className="text-lg text-neutral-400">
                                No Preview
                            </span>
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600">
                            {template.type}
                        </span>
                        {template.modifiedAt && (
                            <span className="text-xs text-neutral-400">
                                {new Date(
                                    template.modifiedAt,
                                ).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                    <h3 className="text-lg font-medium text-neutral-900">
                        {template.title}
                    </h3>
                </div>
            </Link>
        </motion.div>
    );
};

const TABS = [
    { key: 'recent', label: '전체 보기' },
    { key: 'ISSUE', label: 'ISSUE 템플릿' },
    { key: 'PR', label: 'PR 템플릿' },
    { key: 'README', label: 'README 템플릿' },
] as const;

type TabType = (typeof TABS)[number]['key'];

const TemplateDashboardPage = (): ReactElement => {
    const [selectedTab, setSelectedTab] = useState<TabType>('recent');
    const [randomTemplates, setRandomTemplates] = useState<Template[]>([]);
    const [recentTemplates, setRecentTemplates] = useState<Template[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await templateService.getDashboard();
                setRandomTemplates(response.data.data.randomTemplates);
                setRecentTemplates(response.data.data.recentTemplates);
            } catch (error) {
                console.error('Failed to fetch templates:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTemplates();
    }, []);

    const getFilteredTemplates = () => {
        if (selectedTab === 'recent') {
            return [...recentTemplates, ...randomTemplates];
        }
        return randomTemplates.filter(
            (template) => template.type === selectedTab,
        );
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="size-32 animate-spin rounded-full border-y-2 border-neutral-900"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white px-8 py-20">
            <div className="mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <h1 className="mb-4 text-4xl font-bold text-neutral-900">
                        템플릿 대시보드
                    </h1>
                    <p className="text-lg text-neutral-600">
                        다양한 템플릿을 둘러보고 프로젝트에 활용해보세요
                    </p>
                </motion.div>

                <Tab.Group
                    onChange={(index) => setSelectedTab(TABS[index].key)}
                >
                    <Tab.List className="mb-8 flex space-x-2 rounded-xl bg-neutral-100 p-2">
                        {TABS.map((tab) => (
                            <Tab
                                key={tab.key}
                                className={({ selected }) =>
                                    `w-full rounded-lg py-3 text-sm font-medium transition-all duration-200 ${
                                        selected
                                            ? 'bg-white text-neutral-900 shadow'
                                            : 'text-neutral-600 hover:bg-white/[0.12] hover:text-neutral-900'
                                    }`
                                }
                            >
                                {tab.label}
                            </Tab>
                        ))}
                    </Tab.List>

                    <Tab.Panels>
                        {TABS.map((tab) => (
                            <Tab.Panel key={tab.key}>
                                <motion.section
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="rounded-2xl bg-white p-8 shadow-lg"
                                >
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                        {getFilteredTemplates().map(
                                            (template) => (
                                                <TemplateCard
                                                    key={`${template.type}-${template.id}`}
                                                    template={template}
                                                />
                                            ),
                                        )}
                                        {getFilteredTemplates().length ===
                                            0 && (
                                            <div className="col-span-full py-12 text-center text-neutral-500">
                                                해당하는 템플릿이 없습니다
                                            </div>
                                        )}
                                    </div>
                                </motion.section>
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    );
};

export default TemplateDashboardPage;
