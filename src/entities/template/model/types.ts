export interface Template {
    id: number;
    type: 'ISSUE' | 'PR' | 'README';
    title: string;
    imageUrl: string | null;
    modifiedAt?: string;
}

export interface ApiTemplate {
    templateId: number;
    title: string;
    content: string;
}

export interface TemplateResponse {
    status: number;
    message: string;
    data: ApiTemplate[];
}

export interface DashboardResponse {
    status: number;
    message: string;
    data: {
        randomTemplates: Template[];
        recentTemplates: Template[];
    };
}

export type TemplateType = 'ISSUE' | 'PR' | 'README';
