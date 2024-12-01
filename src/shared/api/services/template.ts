import {
    DashboardResponse,
    TemplateResponse,
    TemplateType,
} from '@/entities/template/model/types';

import { instance } from '../instance';

export const templateService = {
    getTemplates: (type: TemplateType, repoUrl: string) =>
        instance.get<TemplateResponse>(`/api/template/${type}`, {
            params: { repoUrl },
        }),

    uploadTemplate: (data: {
        repoUrl: string;
        type: string;
        content: string;
    }) => instance.post('/api/template/upload', data),

    getDashboard: () => {
        return instance.get<DashboardResponse>('/api/template/dash-board');
    },

    getTemplateDetail: (id: string, type: string) => {
        return instance.get(`/api/template/${type}/${id}`);
    },
};
