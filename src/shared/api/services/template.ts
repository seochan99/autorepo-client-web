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

    uploadTemplate: async (data: {
        repoUrl: string;
        type: string;
        content: string;
    }) => {
        const accessToken = localStorage.getItem('accessToken');

        const normalizedContent = data.content
            .replace(/\r\n/g, '\n') // Windows style
            .replace(/\r/g, '\n') // Old Mac style
            .replace(/\n/g, '\\n'); // Escape newlines

        const response = await instance.post(
            '/api/template/upload',
            {
                repoUrl: data.repoUrl,
                type: data.type,
                content: normalizedContent,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
        return response;
    },

    getDashboard: () => {
        return instance.get<DashboardResponse>('/api/template/dash-board');
    },

    getTemplateDetail: (id: string, type: string) => {
        return instance.get(`/api/template/${type}/${id}`);
    },

    shareTemplate: async (data: {
        repoUrl: string;
        type: string;
        title: string;
        content: string;
    }) => {
        const accessToken = localStorage.getItem('accessToken');
        const response = await instance.post(
            '/api/template/share',
            {
                repoUrl: data.repoUrl,
                type: data.type,
                title: data.title,
                content: data.content
                    .replace(/\\n/g, '\n')
                    .replace(/\r\n/g, '\n')
                    .replace(/\r/g, '\n'),
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
        return response;
    },
};
