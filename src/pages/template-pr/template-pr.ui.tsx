'use client';

import RepositorySelector from '@shared/components/repository-selector';
import { ReactElement } from 'react';

const TemplatePrPage = (): ReactElement => {
    const handleGithubImport = () => {
        console.log('Fetching PR repository from GitHub...');
    };

    const handleManualCreation = () => {
        console.log('Creating PR project manually...');
    };

    return (
        <div className="mx-auto h-lvh w-4/5">
            <RepositorySelector
                title="PR 레포지토리 선택"
                description="PR을 생성하고 싶은 레포지토리의 URL을 입력하거나, 깃허브 계정에서 선택해주세요!"
                onGithubImport={handleGithubImport}
                onManualCreation={handleManualCreation}
            />
        </div>
    );
};

export default TemplatePrPage;
