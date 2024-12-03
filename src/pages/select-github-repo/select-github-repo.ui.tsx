'use client';

import { Tab } from '@headlessui/react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { ReactElement, useEffect, useState } from 'react';

import { Repository } from '@/entities/repository/model/types';
import { repositoryService } from '@/shared/api/services/repository';

// Lottie 동적 import
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import loadingAnimation from '../../../public/animations/github-animation.json';

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
    const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [repoInput, setRepoInput] = useState('');

    const fetchRepositories = async () => {
        setIsLoading(true);
        setError(null);
        try {
            if (!localStorage.getItem('accessToken')) {
                router.push('/login');
                return;
            }

            const response = await repositoryService.fetchRepositories();
            if (response.data) {
                setRepositories(response.data);
            }
        } catch (error: unknown) {
            const apiError = error as ApiError;

            if (apiError.message.includes('Network Error')) {
                setError('네트워크 에러! 잠시 AutoRepoCat이 잠자러 갔어요..');
            } else {
                setError(
                    '앗! AutoRepoCat이 레포지토리를 찾는 중에 문제가 생겼어요..',
                );
            }

            if (apiError.response?.status === 401) {
                router.push('/login');
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRepositories();
    }, [router]);

    const handleRepoSelect = (repoUrl: string) => {
        setSelectedRepo(repoUrl);
        const repoPath = repoUrl.replace('https://github.com/', '');
        const encodedUrl = encodeURIComponent(repoPath);
        switch (type) {
            case 'read-me':
                router.push(`/read-me?selectedRepo=${encodedUrl}`);
                break;
            case 'template-issue':
                router.push(`/template-issue?selectedRepo=${encodedUrl}`);
                break;
            case 'label':
                router.push(`/label?selectedRepo=${encodedUrl}`);
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

    const handleRepoUrlSubmit = () => {
        // GitHub URL 형식 검증 (@ 제거)
        const githubUrlPattern = /^https?:\/\/github\.com\/[\w-]+\/[\w.-]+\/?$/;
        const cleanUrl = repoInput.trim().replace(/^@/, ''); // @ 제거

        if (!githubUrlPattern.test(cleanUrl)) {
            setError('올바른 GitHub 레포지토리 URL을 입력해주세요.');
            return;
        }

        // github.com/ 이후의 경로만 추출
        const repoPath = cleanUrl.replace(/^https?:\/\/github\.com\//, '');
        const encodedUrl = encodeURIComponent(repoPath);

        // 선택된 타입에 따라 라우팅
        switch (type) {
            case 'read-me':
                router.push(`/read-me?selectedRepo=${encodedUrl}`);
                break;
            case 'template-issue':
                router.push(`/template-issue?selectedRepo=${encodedUrl}`);
                break;
            case 'label':
                router.push(`/label?selectedRepo=${encodedUrl}`);
                break;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white p-8">
            <div className="mx-auto mt-10 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <h1 className="mb-4 bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-4xl font-bold text-transparent">
                        {getTitle()}
                    </h1>
                    <p className="text-lg text-neutral-600">
                        아래 방법 중 하나를 선택하여 시작하세요
                    </p>
                </motion.div>

                <Tab.Group>
                    <Tab.List className="mb-8 flex rounded-xl bg-neutral-100 p-2">
                        <Tab
                            className={({ selected }) =>
                                `flex-1 rounded-lg px-6 py-3 text-sm font-medium transition-all
                                ${
                                    selected
                                        ? 'bg-white text-neutral-900 shadow-sm'
                                        : 'text-neutral-600 hover:bg-white/[0.12] hover:text-neutral-900'
                                }`
                            }
                        >
                            URL로 시작하기
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                `flex-1 rounded-lg px-6 py-3 text-sm font-medium transition-all
                                ${
                                    selected
                                        ? 'bg-white text-neutral-900 shadow-sm'
                                        : 'text-neutral-600 hover:bg-white/[0.12] hover:text-neutral-900'
                                }`
                            }
                        >
                            레포지토리 선택하기
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                `flex-1 rounded-lg px-6 py-3 text-sm font-medium transition-all
                                ${
                                    selected
                                        ? 'bg-white text-neutral-900 shadow-sm'
                                        : 'text-neutral-600 hover:bg-white/[0.12] hover:text-neutral-900'
                                }`
                            }
                        >
                            레포지토리 없이 시작
                        </Tab>
                    </Tab.List>

                    <Tab.Panels className="rounded-2xl bg-white p-8 shadow-lg">
                        {/* URL 입력 패널 */}
                        <Tab.Panel>
                            <div className="space-y-6">
                                <div>
                                    <h2 className="mb-2 text-xl font-semibold text-neutral-900">
                                        GitHub URL 입력
                                    </h2>
                                    <p className="text-sm text-neutral-600">
                                        GitHub 레포지토리 URL을 직접 입력하여
                                        시작합니다
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        placeholder="https://github.com/username/repository"
                                        value={repoInput}
                                        onChange={(e) =>
                                            setRepoInput(e.target.value)
                                        }
                                        className="flex-1 rounded-xl border border-neutral-200 bg-neutral-50 p-4 transition-all focus:border-neutral-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-neutral-900/5"
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleRepoUrlSubmit}
                                        className="flex items-center gap-2 rounded-xl bg-neutral-900 px-6 py-4 font-medium text-white shadow-sm transition-all hover:bg-neutral-800"
                                    >
                                        시작하기
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
                                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                                            />
                                        </svg>
                                    </motion.button>
                                </div>
                                {error && (
                                    <p className="text-sm text-red-500">
                                        {error}
                                    </p>
                                )}
                            </div>
                        </Tab.Panel>

                        {/* 레포지토리 선택 패널 */}
                        <Tab.Panel>
                            <div className="space-y-6">
                                <div>
                                    <h2 className="mb-2 text-xl font-semibold text-neutral-900">
                                        내 GitHub 레포지토리
                                    </h2>
                                    <p className="text-sm text-neutral-600">
                                        연결된 GitHub 계정의 레포지토리 목록에서
                                        선택합니다
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative flex-1">
                                            <svg
                                                className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-neutral-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                />
                                            </svg>
                                            <input
                                                type="text"
                                                placeholder="레포지토리 검색..."
                                                value={searchTerm}
                                                onChange={(e) =>
                                                    setSearchTerm(
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full rounded-xl border border-gray-200 py-4 pl-12 pr-4 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                                            />
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={fetchRepositories}
                                            disabled={isLoading}
                                            className="flex items-center gap-2 rounded-xl bg-neutral-900 px-6 py-4 font-medium text-white transition-all hover:bg-neutral-800 disabled:bg-neutral-400"
                                        >
                                            <svg
                                                className={`size-5 ${isLoading ? 'animate-spin' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                />
                                            </svg>
                                            새로고침
                                        </motion.button>
                                    </div>

                                    {/* 레포지토리 목록 */}
                                    {error ? (
                                        <div className="flex flex-col items-center justify-center py-12">
                                            <div className="w-48">
                                                <Lottie
                                                    animationData={
                                                        loadingAnimation
                                                    }
                                                    loop={true}
                                                />
                                            </div>
                                            <div className="mt-4 text-center">
                                                <h3 className="mb-2 text-lg font-medium text-neutral-900">
                                                    <span className="mb-2 block">
                                                        {error}
                                                    </span>
                                                    <motion.button
                                                        whileHover={{
                                                            scale: 1.05,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.95,
                                                        }}
                                                        onClick={
                                                            fetchRepositories
                                                        }
                                                        className="text-base font-normal text-neutral-600 hover:text-neutral-900"
                                                    >
                                                        다시 시도해보실까요?
                                                    </motion.button>
                                                </h3>
                                            </div>
                                        </div>
                                    ) : isLoading ? (
                                        <div className="flex flex-col items-center justify-center py-12">
                                            <div className="w-48">
                                                <Lottie
                                                    animationData={
                                                        loadingAnimation
                                                    }
                                                    loop={true}
                                                />
                                            </div>
                                            <div className="mt-4 text-center">
                                                <h3 className="mb-2 text-lg font-medium text-neutral-900">
                                                    AutoRepoCat이 열심히
                                                    레포지토리를 찾고 있어요!
                                                </h3>
                                                <p className="text-neutral-500">
                                                    깃허브 숲에서 레포지토리를
                                                    수집하는 중...
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="grid gap-4">
                                            {filteredRepos.map((repo) => (
                                                <motion.button
                                                    key={repo.repoUrl}
                                                    whileHover={{ scale: 1.01 }}
                                                    onClick={() =>
                                                        handleRepoSelect(
                                                            repo.repoUrl,
                                                        )
                                                    }
                                                    className={`group flex items-center justify-between rounded-xl p-6 text-left transition-all ${
                                                        selectedRepo ===
                                                        repo.repoUrl
                                                            ? 'bg-neutral-900 text-white shadow-lg'
                                                            : 'bg-neutral-50 hover:bg-neutral-100'
                                                    }`}
                                                >
                                                    <div>
                                                        <h3 className="text-lg font-medium">
                                                            {repo.repoName}
                                                        </h3>
                                                        <p
                                                            className={`text-sm ${
                                                                selectedRepo ===
                                                                repo.repoUrl
                                                                    ? 'text-neutral-300'
                                                                    : 'text-neutral-500'
                                                            }`}
                                                        >
                                                            {repo.repoUrl}
                                                        </p>
                                                    </div>
                                                    <svg
                                                        className={`size-6 transition-transform group-hover:translate-x-1 ${
                                                            selectedRepo ===
                                                            repo.repoUrl
                                                                ? 'text-white'
                                                                : 'text-neutral-400'
                                                        }`}
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
                        </Tab.Panel>

                        {/* 레포 없이 시작 패널 */}
                        <Tab.Panel>
                            <div className="space-y-6">
                                <div>
                                    <h2 className="mb-2 text-xl font-semibold text-neutral-900">
                                        레포지토리 없이 시작하기
                                    </h2>
                                    <p className="text-sm text-neutral-600">
                                        GitHub 레포지토리 연결 없이 바로
                                        시작합니다
                                    </p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleCreateWithoutRepo}
                                    className="w-full rounded-xl bg-neutral-900 p-4 font-medium text-white transition-all hover:bg-neutral-800"
                                >
                                    시작하기
                                </motion.button>
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    );
};

export default SelectGithubRepoPage;
