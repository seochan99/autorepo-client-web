import { axiosInstance } from '../axios-instance';

interface GenerateReadmeRequest {
    title: string;
    description: string;
    stack: string[];
    teamMembers: string[];
    installation: string;
}

interface GenerateReadmeResponse {
    title: string;
    content: string;
    imageUrl: string;
}

interface UploadReadmeRequest {
    repoUrl: string;
    content: string;
}

export const readmeService = {
    generateReadme: async (data: GenerateReadmeRequest) => {
        const response = await axiosInstance.post<GenerateReadmeResponse>(
            '/api/readme/generate',
            data,
        );
        return response;
    },
    uploadReadme: async (data: UploadReadmeRequest) => {
        const response = await axiosInstance.put('/api/readme/upload', data);
        return response;
    },
};
