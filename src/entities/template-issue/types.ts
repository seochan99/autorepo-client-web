export interface Template {
    templateId: number;
    title: string;
    content: string;
}

export interface TemplateResponse {
    status: number;
    message: string;
    data: Template[];
}

export type TemplateType = 'ISSUE' | 'PR';
