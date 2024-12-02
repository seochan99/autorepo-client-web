import { instance } from '../instance';

interface Label {
    labelName: string;
    color: string;
    description: string;
}

interface LabelUploadRequest {
    repoUrl: string;
    labelGenerateType: 'EMOJI' | 'TEXT' | 'CUSTOM' | 'CSV';
    labels: Label[];
}

export const labelService = {
    uploadLabels: (data: LabelUploadRequest) =>
        instance.post('/api/label/upload', data),
};
