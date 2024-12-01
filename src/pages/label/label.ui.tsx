'use client';
import { ReactElement } from 'react';
import Link from 'next/link';

// Import images
import label1 from 'public/images/label1.png';
import label2 from 'public/images/label2.png';
import label3 from 'public/images/label3.png';
import label4 from 'public/images/label4.png';

const LabelPage = (): ReactElement => {
    const sections = [
        {
            title: '이모지 라벨로 시작하기',
            description: '주로 사용하는 이모지 라벨로 시작해볼 수 있어요!',
            route: '/label/emoji',
            query: { type: 'emoji' },
            image: label1,
        },
        {
            title: '텍스트 라벨로 시작하기',
            description: '이모지는 필요없다! 텍스트로만 시작해봐요!',
            route: '/label/text',
            query: { type: 'text' },
            image: label2,
        },
        {
            title: '처음부터 시작하기',
            description: '처음부터 만들어나갈 수 있어요!',
            route: '/label/custom',
            query: { type: 'custom' },
            image: label3,
        },
        {
            title: 'CSV로 시작하기',
            description:
                'name, description, color 로 이뤄진 csv를 첨부해서 빠르게 시작해봐요!',
            route: '/label/csv',
            query: { type: 'csv' },
            image: label4,
        },
    ];

    return (
        <div className="mx-auto h-lvh w-4/5 mt-20 mb-20">
            <p className="text-h1 text-neutral-800 text-center">
                라벨 프리셋 정하기
            </p>
            <p className="text-neutral-600 text-center mb-12">
                어떻게 시작할까요?
            </p>

            <div className="grid grid-cols-2 gap-10">
                {sections.map((section) => (
                    <Link
                        key={section.title}
                        href={{
                            pathname: section.route,
                            query: section.query,
                        }}
                        className="border rounded-lg p-6 hover:shadow-lg transition duration-300 border-gray-300 "
                    >
                        <img
                            src={section.image.src}
                            alt={section.title}
                            className="mb-4 w-full h-auto object-cover rounded-md"
                        />
                        <h2 className="text-h5 font-semibold text-neutral-700 mb-2">
                            {section.title}
                        </h2>
                        <p className="text-neutral-500">
                            {section.description}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default LabelPage;
