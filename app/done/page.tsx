'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const DonePage = dynamic(() => import('@/pages/done/done.ui'), {
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
            <DonePage />
        </Suspense>
    );
}
