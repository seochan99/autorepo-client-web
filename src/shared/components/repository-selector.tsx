'use client';
import { IconGithub } from 'public/svgs';
import { ReactElement, useState } from 'react';

interface RepositorySelectorProps {
    title: string;
    description: string;
    onGithubImport: () => void;
    onManualCreation: () => void;
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
        <div className="mx-auto h-lvh w-4/5 p-8 border border-gray-300">
            <h1 className="text-neutral-800 text-h1 font-semibold mb-4 mt-10">
                {title}
            </h1>
            <p className="text-neutral-600 text-sub1 mb-6">{description}</p>
            <div className="w-1/2 mx-auto">
                <input
                    type="text"
                    value={repoUrl}
                    onChange={handleInputChange}
                    placeholder="Github 레포지토리의 URL을 입력해주세요"
                    className="w-full p-4 border border-neutral-300 rounded mb-4"
                />
                <p className="text-center my-4">또는</p>
                <div className="w-3/5 mx-auto">
                    <button
                        onClick={onGithubImport}
                        className="w-full flex items-center justify-center p-4 bg-neutral-950 text-white rounded-lg mb-4 hover:bg-neutral-900"
                    >
                        <IconGithub className="mr-2" />
                        GitHub에서 프로젝트 불러오기
                    </button>
                    <p className="text-center my-4">또는</p>
                    <button
                        onClick={onManualCreation}
                        className="w-full p-4 bg-neutral-950 text-white rounded-lg hover:bg-neutral-900"
                    >
                        프로젝트 정보 없이 직접 생성하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RepositorySelector;
