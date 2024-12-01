'use client';

import { Tab } from '@headlessui/react';
import { ReactElement, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

const TemplateIssuePage = (): ReactElement => {
    const [selectedTab, setSelectedTab] = useState('issue');
    const [selectedTemplate, setSelectedTemplate] = useState(0);

    const [issueTemplates, setIssueTemplates] = useState([
        {
            name: '버그 리포트',
            content: `# 🐛 버그 리포트

버그에 대한 명확하고 간결한 설명을 작성해주세요.

## 재현 방법

버그를 재현하는 단계:

1. '...'\`을(를) 클릭합니다.
2. '...'\`로 스크롤합니다.
3. '...'\` 버튼을 클릭합니다.
4. 오류를 확인합니다.

## 예상되는 동작

예상했던 동작에 대한 설명을 작성해주세요.

## 스크린샷

해당되는 경우 스크린샷을 추가하여 문제를 설명해주세요.

## 환경 정보

- OS: [e.g. Windows 10]
- 브라우저: [e.g. Chrome 86]
- 버전: [e.g. 1.0.0]
`,
        },
        {
            name: '기능 요청',
            content: `# ✨ 기능 요청

원하는 기능에 대한 명확하고 간결한 설명을 작성해주세요.

## 배경

이 기능이 왜 필요한지, 어떤 문제를 해결하는지에 대한 배경을 설명해주세요.

## 제안된 해결 방법

생각하고 계신 해결 방법이나 접근 방식을 설명해주세요.

## 고려된 대안

다른 대안이나 아이디어가 있다면 공유해주세요.
`,
        },
    ]);

    const [prTemplates, setPrTemplates] = useState([
        {
            name: '풀 리퀘스트 템플릿',
            content: `# 🔀 Pull Request

## 설명

변경 사항에 대한 자세한 설명을 작성해주세요.

## 체크리스트

- [ ] 코드가 정상적으로 동작합니다.
- [ ] 모든 테스트를 통과했습니다.
- [ ] 문서를 작성하거나 업데이트했습니다.

## 기타

추가적인 정보나 스크린샷이 있다면 추가해주세요.
`,
        },
    ]);

    const templates = selectedTab === 'issue' ? issueTemplates : prTemplates;

    const handleTabChange = (tabIndex: number) => {
        const tab = tabIndex === 0 ? 'issue' : 'pr';
        setSelectedTab(tab);
        setSelectedTemplate(0);
    };

    const updateTemplateContent = (content: string) => {
        if (selectedTab === 'issue') {
            const newTemplates = [...issueTemplates];
            newTemplates[selectedTemplate].content = content;
            setIssueTemplates(newTemplates);
        } else {
            const newTemplates = [...prTemplates];
            newTemplates[selectedTemplate].content = content;
            setPrTemplates(newTemplates);
        }
    };

    return (
        <div className="flex h-screen">
            {/* 좌측 사이드바 */}
            <div className="w-1/4 border-r border-gray-200 p-4">
                <Tab.Group
                    selectedIndex={selectedTab === 'issue' ? 0 : 1}
                    onChange={handleTabChange}
                >
                    <Tab.List className="flex space-x-1 rounded-xl bg-gray-200 p-1">
                        <Tab
                            className={({ selected }) =>
                                `w-1/2 rounded-lg py-2.5 text-sm font-medium leading-5 ${
                                    selected
                                        ? 'bg-white shadow'
                                        : 'text-gray-500 hover:bg-white/[0.12]'
                                }`
                            }
                        >
                            Issue 템플릿
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                `w-1/2 rounded-lg py-2.5 text-sm font-medium leading-5 ${
                                    selected
                                        ? 'bg-white shadow'
                                        : 'text-gray-500 hover:bg-white/[0.12]'
                                }`
                            }
                        >
                            PR 템플릿
                        </Tab>
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                        <Tab.Panel className="space-y-2">
                            {issueTemplates.map((template, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedTemplate(index)}
                                    className={`w-full rounded-md p-2 text-left ${
                                        selectedTemplate === index
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                                >
                                    {template.name}
                                </button>
                            ))}
                        </Tab.Panel>
                        <Tab.Panel className="space-y-2">
                            {prTemplates.map((template, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedTemplate(index)}
                                    className={`w-full rounded-md p-2 text-left ${
                                        selectedTemplate === index
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                                >
                                    {template.name}
                                </button>
                            ))}
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
            {/* 우측 본문 */}
            <div className="w-3/4 p-6">
                <h1 className="mb-4 text-2xl font-bold">
                    템플릿을 더 빠르고 쉽게 생성해보세요
                </h1>
                <p className="mb-6 text-gray-600">
                    템플릿 생성부터 깃허브 업로드까지 한 번에 해결!
                </p>
                <div className="mb-6 rounded-md border bg-gray-50 p-4">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                    >
                        {templates[selectedTemplate]?.content}
                    </ReactMarkdown>
                </div>
                <textarea
                    className="h-64 w-full rounded-md border border-gray-300 p-2"
                    value={templates[selectedTemplate]?.content}
                    onChange={(e) => updateTemplateContent(e.target.value)}
                ></textarea>
            </div>
        </div>
    );
};

export default TemplateIssuePage;
