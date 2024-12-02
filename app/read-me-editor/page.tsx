'use client';

import { Suspense } from 'react';

import ReadMeEditorPage from '@/pages/read-me-editor/read-me-editor.ui';

export default function Page() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center">
                    <div className="size-32 animate-spin rounded-full border-y-2 border-neutral-900"></div>
                </div>
            }
        >
            <ReadMeEditorPage />
        </Suspense>
    );
}
