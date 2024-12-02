import { axiosInstance } from '../axios-instance';

interface GenerateReadmeRequest {
    title: string;
    description: string;
    stack: {
        name: string;
        color: string;
        icon: string;
    }[];
    teamMembers: {
        name: string;
        position: string;
    }[];
    installation: string;
}

interface GenerateReadmeResponse {
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
