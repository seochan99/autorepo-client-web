'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ReactElement, useEffect, useState } from 'react';

import { Repository } from '@/entities/repository/model/types';
import { repositoryService } from '@/shared/api/services/repository';

interface SelectGithubRepoPageProps {
    type: 'read-me' | 'template-issue' | 'label';
}

// error 객체 타입 정의
type ApiError = {
    message: string;
    response?: {
        data: unknown;
        status: number;
        headers: unknown;
    };
    config?: {
        headers: unknown;
    };
};

const SelectGithubRepoPage = ({
    type,
}: SelectGithubRepoPageProps): ReactElement => {
    const router = useRouter();
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchRepositories = async () => {
            try {
                if (!localStorage.getItem('accessToken')) {
                    router.push('/login');
                    return;
                }

                const response = await repositoryService.fetchRepositories();
                if (response.data?.data) {
                    setRepositories(response.data.data);
                }
            } catch (error: unknown) {
                const apiError = error as ApiError;
                console.error('Failed to fetch repositories:', {
                    message: apiError.message,
                    response: apiError.response?.data,
                    status: apiError.response?.status,
                    headers: apiError.response?.headers,
                });

                if (
                    apiError.response?.status === 401 ||
                    apiError.message === 'No access token found'
                ) {
                    router.push('/login');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchRepositories();
    }, [router]);

    const handleRepoSelect = (repoUrl: string) => {
        const encodedUrl = encodeURIComponent(repoUrl);
        switch (type) {
            case 'read-me':
                router.push(`/read-me?repoUrl=${encodedUrl}`);
                break;
            case 'template-issue':
                router.push(`/template-issue?repoUrl=${encodedUrl}`);
                break;
            case 'label':
                router.push(`/label?repoUrl=${encodedUrl}`);
                break;
        }
    };

    const handleCreateWithoutRepo = () => {
        switch (type) {
            case 'read-me':
                router.push('/read-me');
                break;
            case 'template-issue':
                router.push('/template-issue');
                break;
            case 'label':
                router.push('/label');
                break;
        }
    };

    const getTitle = () => {
        switch (type) {
            case 'read-me':
                return 'ReadMe 레포지토리 선택';
            case 'template-issue':
                return '템플릿 레포지토리 선택';
            case 'label':
                return '라벨 레포지토리 선택';
        }
    };

    const filteredRepos = repositories.filter((repo) =>
        repo.repoName.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white p-8">
            <div className="mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 text-center"
                >
                    <h1 className="mb-4 text-3xl font-bold text-neutral-900">
                        {getTitle()}
                    </h1>
                    <p className="text-lg text-neutral-600">
                        레포지토리를 선택하거나 레포지토리 없이 생성할 수
                        있습니다
                    </p>
                </motion.div>

                {/* 레포 없이 생성하기 버튼 */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCreateWithoutRepo}
                    className="mb-8 w-full rounded-lg bg-neutral-900 p-4 text-center font-medium text-white transition-colors hover:bg-neutral-800"
                >
                    레포지토리 없이 생성하기
                </motion.button>

                {/* 검색 입력창 */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="레포지토리 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 p-4 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                    />
                </div>

                {/* 레포지토리 목록 */}
                {isLoading ? (
                    <div className="flex justify-center">
                        <div className="size-32 animate-spin rounded-full border-y-2 border-neutral-900"></div>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filteredRepos.map((repo) => (
                            <motion.button
                                key={repo.repoUrl}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => handleRepoSelect(repo.repoUrl)}
                                className="flex items-center justify-between rounded-lg bg-white p-6 text-left shadow-sm transition-all hover:shadow-md"
                            >
                                <div>
                                    <h3 className="text-lg font-medium text-neutral-900">
                                        {repo.repoName}
                                    </h3>
                                    <p className="text-sm text-neutral-500">
                                        {repo.repoUrl}
                                    </p>
                                </div>
                                <svg
                                    className="size-6 text-neutral-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </motion.button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectGithubRepoPage;
