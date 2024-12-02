import { Repository } from '@/entities/repository/model/types';

import { instance } from '../instance';

export const repositoryService = {
    fetchRepositories: async () => {
        const response = await instance.get<Repository[]>('/api/repo/fetch');
        return response;
    },
};
