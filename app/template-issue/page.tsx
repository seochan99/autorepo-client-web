'use client';

import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

const TemplateIssuePage = dynamic(
    () => import('@/pages/template-issue/template-issue.ui'),
    {
        ssr: false,
    },
);

export default function Page() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center">
                    <div className="size-32 animate-spin rounded-full border-y-2 border-neutral-900"></div>
                </div>
            }
        >
            <TemplateIssuePage />
        </Suspense>
    );
}
