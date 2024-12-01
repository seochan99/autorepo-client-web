'use client';
import { IconGithub } from 'public/svgs';
import { ReactElement, useState } from 'react';

interface RepositorySelectorProps {
    title: string;
    description: string;
    onGithubImport: (repoUrl: string) => void;
    onManualCreation: (repoUrl: string) => void;
}

const RepositorySelector = ({
    title,
    description,
    onGithubImport,
    onManualCreation,
}: RepositorySelectorProps): ReactElement => {
    const [repoUrl, setRepoUrl] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRepoUrl(event.target.value);
    };

    return (
        <div className="mx-auto h-lvh w-4/5 border border-gray-300 p-8">
            <h1 className="mb-4 mt-10 text-3xl font-semibold text-neutral-800">
                {title}
            </h1>
            <p className="mb-6 text-lg text-neutral-600">{description}</p>
            <div className="mx-auto w-1/2">
                <input
                    type="text"
                    value={repoUrl}
                    onChange={handleInputChange}
                    placeholder="Github 레포지토리의 URL을 입력해주세요"
                    className="mb-4 w-full rounded border border-neutral-300 p-4"
                />
                <p className="my-4 text-center">또는</p>
                <div className="mx-auto w-3/5">
                    <button
                        onClick={() => onGithubImport(repoUrl)}
                        className="mb-4 flex w-full items-center justify-center rounded-lg bg-neutral-950 p-4 text-white hover:bg-neutral-900"
                    >
                        <IconGithub className="mr-2" />
                        GitHub에서 프로젝트 불러오기
                    </button>
                    <p className="my-4 text-center">또는</p>
                    <button
                        onClick={() => onManualCreation(repoUrl)}
                        className="w-full rounded-lg bg-neutral-950 p-4 text-white hover:bg-neutral-900"
                    >
                        프로젝트 정보 없이 직접 생성하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RepositorySelector;
