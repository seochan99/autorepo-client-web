import SelectGithubRepoPage from '@/pages/select-github-repo/select-github-repo.ui';

type Params = Promise<{
    type: 'read-me' | 'template-issue' | 'label';
}>;

export default async function Page({ params }: { params: Params }) {
    const { type } = await params;
    return <SelectGithubRepoPage type={type} />;
}

export function generateStaticParams() {
    return [{ type: 'read-me' }, { type: 'template-issue' }, { type: 'label' }];
}
