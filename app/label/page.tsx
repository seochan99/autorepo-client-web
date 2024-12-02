'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const LabelPage = dynamic(() => import('@/pages/label/label.ui'), {
    ssr: false,
});

export default function Page() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center">
                    <div className="size-32 animate-spin rounded-full border-y-2 border-neutral-900"></div>
                </div>
            }
        >
            <LabelPage />
        </Suspense>
    );
}
