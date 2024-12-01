export interface Repository {
    repoName: string;
    repoUrl: string;
    userId: number;
}

export interface RepositoryResponse {
    status: number;
    message: string;
    data: Repository[];
}
